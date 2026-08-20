# Language-picker flags

One plain SVG file per locale — **edit or replace any file and rebuild; no
code changes needed**. The picker loads `static/img/flags/<locale>.svg` by
locale code and renders it at 3:2 with 4px rounded corners (the rounding is
applied by CSS at render time, so the files themselves can have square
corners).

| Locale | File | Notes |
|---|---|---|
| zh-Hans | `zh-Hans.svg` | PRC flag (default locale) |
| en | `en.svg` | UK flag |
| ja | `ja.svg` | |
| ru | `ru.svg` | |
| vi | `vi.svg` | |
| de | `de.svg` | |
| zh-Hant | `zh-Hant.svg` | Neutral "文" glyph chip — deliberately no national flag (see below) |
| es | `es.svg` | |
| fr | `fr.svg` | Francophonie (OIF) emblem, not the French tricolore |
| ar | `ar.svg` | Arab League emblem, not a national flag |
| it | `it.svg` | |
| pt | `pt.svg` | |
| fa | `fa.svg` | |
| nl | `nl.svg` | |
| bn | `bn.svg` | |
| id | `id.svg` | |
| hy | `hy.svg` | |
| uk | `uk.svg` | |
| tr | `tr.svg` | |
| ko | `ko.svg` | |

Conventions:

- **3:2 aspect ratio** — use `viewBox="0 0 3 2"` (the coordinate system the
  files use) so the picker's fixed 24×16 / 18×12 boxes scale cleanly.
- **Flat, minimal, material-like** — no gradients, shadows or strokes beyond
  what the existing files use, so all rows look consistent.
- **zh-Hant stays a neutral glyph** — a national flag would be politically
  sensitive and doesn't serve either audience; if you change it, keep it
  neutral (e.g. a different glyph or a community symbol).
- Keep the file name equal to the locale code (`<locale>.svg`); the picker
  maps `locale → /img/flags/<locale>.svg` automatically.
