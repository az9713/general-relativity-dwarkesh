# Source and Board Map

Machine-validated registries live in `source/`:

| Artifact | Role |
|----------|------|
| `transcript.normalized.txt` | UTF-8/LF working transcript |
| `timestamp_fragments.json` | 744 caption fragments |
| `argument_units.json` | 46 teaching argument units |
| `claims.json` | 55 provenance-tagged claims |
| `board_reconstructions.json` | 18 board reconstructions |
| `lesson1_vertical_slice.md` | Lesson 1 implementation brief |
| `source_registry.json` | Derivation graph + raw hash |

Regenerate / validate:

```bash
node scripts/prepare_source.js
node scripts/build_source_maps.js
node scripts/validate_source.js
```

`transcript.txt` is immutable. Board records are reconstructions with confidence labels, not verified copies of Brown’s board.
