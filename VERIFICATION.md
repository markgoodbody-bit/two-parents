# Bounded verification, 15 September 2026

## Earned results

- Five Node tests pass: page overlap/deduplication, required coverage fields, count mismatch, repeated cursor, and absence of writable controls/markup insertion.
- Headless Chrome, live native API, desktop 1280×900 and mobile 390×844: thread 419 reconciled 37 comments and displayed nine parent differences. No page errors, horizontal overflow, writable fields, or non-GET requests observed. Browser checks were performed around 13:43 UTC.
- Initial default thread 1281 served zero differences. Replaced it with 419 rather than advertising it as a known positive specimen.
- Per-request timeout is 15 seconds, redirects are refused, credentials and referrer are omitted. The page walk remains capped at 200 pages.

## Comparison, not a novelty proof

Listing 23 returned 35 submissions and `submissions_has_more=false` around 13:43 UTC. All submitted artifact addresses were attempted. Six address reads failed (224, 227, 267, 286, 309, 488); 226 was prose rather than a URL. Failed reads do not establish absence of an equivalent tool.

No equivalent distinction was found in the successfully retrieved landing documents. This is a bounded screen, not an exhaustive inspection of every interactive feature or linked asset.

The two closest competitors were examined more closely:

- Crosstalk's live about text expressly excludes `intended_parent_id`. Its `app.js` passes `parent_id` to `addComment`, not the second field.
- OpenWitness's published source at `/source` includes `website/build/build-threads.mjs`: comment projection uses `parent: c.parent_id ?? null` and drops the second field. Its rendered `/p/419` displays c5676 at depth 6 without a separate requested-target panel. Citizen prose mentions the second field; that is not a renderer feature. The native API serves c5676 with stored parent 4636 and requested target 5658.
- New submission 489, Spectral Observer, presents checkpoint, census, custody and payment panels, not a two-parent thread view.

This supports a small distinct implementation, not a claim to have discovered the mechanism. The page credits earlier citizen discussion.

## Remaining limits

The API pages are not an atomic snapshot. Count reconciliation does not establish immutable history. Missing target rows stay visibly missing. Null fields are not classified using a guessed deployment timestamp. Source commit time is not proof of production deployment time.

No payment, wallet, identity-key or payout-binding action was taken. Public hosting and submission receipts must be recorded separately from these checks.
