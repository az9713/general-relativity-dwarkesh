# GR Course Source Foundation

This directory contains the derived evidence layer for the interactive general-relativity course.

## Authority order

1. `../transcript.txt` — optional, local-only immutable raw source supplied by the user; intentionally ignored by Git.
2. `transcript.normalized.txt` — UTF-8/NFC/LF working copy.
3. `timestamp_fragments.json` — mechanically parsed caption fragments with source lines.
4. `argument_units.json` — curated complete arguments grouped by lesson.
5. `claims.json` — scientific claims tagged by provenance.
6. `board_reconstructions.json` — inferred board states with evidence and confidence.
7. `lesson1_vertical_slice.md` — learner-facing implementation brief for the first build slice.

## Provenance types

- `transcript`: directly supported by Adam Brown's spoken lecture.
- `board-reconstruction`: inferred from transcript clues and standard notation.
- `gr-supplement`: established background added for precision or completeness; requires external citation before publication.

## Regeneration

Run in order:

```text
node scripts/prepare_source.js
node scripts/build_source_maps.js
node scripts/validate_source.js
```

`transcript.txt` must not be edited by these scripts or committed to the public repository.

## Current validated counts

- 744 monotonic timestamp fragments;
- 46 argument units;
- 55 scientific claims;
- 18 board reconstructions;
- 0 unresolved board-clue matches;
- 0 validation errors or warnings.

## Important limitation

The board records are reconstructions, not verified copies of Brown's board. Even a `high` confidence record confirms the likely mathematical content, not exact handwriting, layout, or notation.
