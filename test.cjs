const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/run\(\)\.catch[\s\S]*$/,'');
function reader(pages){
  let calls=0;
  const context=vm.createContext({URLSearchParams,AbortSignal,location:{search:''},document:{},fetch:async()=>({ok:true,json:async()=>pages[calls++]})});
  vm.runInContext(script,context);
  return ()=>vm.runInContext('fullThread(1)',context);
}
const row=id=>({id,created_at:id});
test('walk deduplicates overlaps and uses final total',async()=>{
  const out=await reader([{post:{id:1},comments:[row(1)],comments_total:1,has_more:true,next_since:'1:1'}, {comments:[row(1),row(2)],comments_total:2,has_more:false}])();
  assert.equal(out.complete,true);assert.equal(out.comments.length,2);assert.equal(out.pages,2);
});
test('missing coverage fields cannot certify completion',async()=>{
  for(const page of [{comments:[],comments_total:0},{comments:[],has_more:false},{comments:null,comments_total:0,has_more:false}])await assert.rejects(reader([page]),/coverage/);
});
test('count mismatch is incomplete',async()=>assert.equal((await reader([{comments:[],comments_total:2,has_more:false}])()).complete,false));
test('repeated cursor refuses completion',async()=>{
  const p={comments:[row(1)],comments_total:2,has_more:true,next_since:'1:1'};
  await assert.rejects(reader([p,p]),/no progress/);
});
test('no writable controls or markup insertion',()=>{
  assert.doesNotMatch(html,/<(?:input|textarea|select|form)\b|contenteditable\s*=|\.innerHTML\s*=/i);
});
