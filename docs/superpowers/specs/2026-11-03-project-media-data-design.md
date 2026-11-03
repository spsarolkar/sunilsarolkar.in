# Restore project media and improve dataset exploration

Keep the site's approved ivory-and-teal theme, shared navigation and typography.

## Vehicle telemetry restoration

Restore the original YouTube demo (X3aA26rKwIs), architecture image and repository
link in a dedicated page at the existing vehicle-telemetry route. Use a responsive
video with a direct viewing fallback, a readable architecture section and a small
gallery of retained dashboard screenshots. Distinguish the implemented OBD-II /
ELM327 / Raspberry Pi Python dashboard from planned Kafka, Spark and ML work.
Keep the original diagram available at full size. No new hosting or dependency.

User approved the recommended overview + explorer on 3 November 2026.

## Data explorer approaches

Recommended: a compact overview and searchable expression explorer. Show recorded
split counts, expression coverage and a count distribution. Use readable bars by
default, with a corrected bubble view for comparison and exact counts always
available. Search, sort, filter missing rows or inconsistent totals, and paginate
the 167 expressions. Use distinct split colours with labels, visible keyboard
focus and responsive layouts. Display declared total separately from split sum.

Alternative: retain bubbles as the only plot, correcting duplicate drawing,
scales, labels, missing values and adding search plus a data discrepancy notice.
This is smaller, but offers less help comparing counts or finding coverage gaps.

The CSV is a metadata snapshot, distinct from the historical full-dataset summary
of 263 words / 4,292 videos. It records 167 expressions and split counts summing
to 2,041; declared totals sum to 1,986. There are 23 inconsistent totals and 45
missing split rows. Missing means not recorded, never a measured zero. Do not
silently repair the CSV or infer model quality, leakage or signer independence.

Additional analysis needs richer data: clip-duration and pose-completeness
distributions require a full per-clip inventory; signer overlap requires signer
IDs; confusion and performance by expression require held-out predictions. The
single bundled pose demo cannot support population-wide conclusions.

## Verification

Preserve CV, badges, datasets and existing API/map behavior. Test chart arithmetic,
missing-vs-zero handling, mismatch detection, search/filter/sort behavior and
pagination. Check video availability, image paths, build/TypeScript, desktop and
phone rendering, keyboard access and production routes before claiming success.
