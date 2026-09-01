## Badge

Elemento informativo compacto que comunica **estado, categoría o énfasis
contextual**. Figma: `components_badge`.

**No es interactivo.** No reemplaza botones ni chips seleccionables, no contiene
acciones y **no debe ser el único indicador de un estado crítico**.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `semantic` | `success` · `neutral` · `info` · `warning` · `error` · `accentPrimary` · `accentSecondary` | `neutral` | intención visual / significado |
| `variant` | `soft` · `outline` · `filled` | `soft` | tratamiento de superficie |
| `size` | `xxs` · `xs` · `md` | `xs` | escala (ignorado para `type="circle"`) |
| `type` | `text` · `circle` | `text` | con label / solo punto de color |
| `label` | `ReactNode` | — | texto (solo `type="text"`) |
| `leading` | `ReactNode` | — | ícono antes del label (12px en xxs/xs, 16px en md) |
| `showLeading` | `boolean` | `leading != null` | muestra el slot leading |

> El `<span>` acepta `HTMLAttributes` (`id`, `aria-label`, `className`…).
> `type="circle"` **requiere** `aria-label` (no lleva texto).

## Anatomía

```
.badge                 inline-flex · pill (radius-round) · border 1px · overflow hidden
  .badge__leading      slot de ícono, size por --_icon (12 / 16)
  .badge__label        Typography/Body/xs (xxs·xs) · Body/sm (md), weight 500, nowrap + ellipsis
```

`type="circle"` → 6×6px, sin padding ni contenido, solo `--_bg` + `--_bc`.

## Tokens

Cada `semantic` define 5 custom props privadas; `variant` las combina. El ícono
hereda color por `currentColor` (en Figma `icon/X` == `text/X` para estos roles).

| semantic | `soft` bg | border | text · icon | `filled` bg | `filled` text · icon |
|---|---|---|---|---|---|
| success | `bg/successMuted` | `border/success` | `text/success` | `bg/success` | `text/onSuccess` |
| info | `bg/infoMuted` | `border/info` | `text/info` | `bg/info` | `text/onInfo` |
| warning | `bg/warningMuted` | `border/warning` | `text/warning` | `bg/warning` † | `text/warning` † |
| error | `bg/dangerMuted` | `border/dangerSoft` | `text/dangerStrong` | `bg/danger` | `text/onDanger` |
| neutral | `bg/subtle` | `border/strong` | `text/secondary` | `bg/neutral` † | `text/onNeutral` † |
| accentPrimary | `bg/accentPrimaryMuted` | `border/accentPrimary` | `text/accentPrimary` | `bg/accentPrimary` | `text/onAccentPrimary` |
| accentSecondary | `bg/accentSecondaryMuted` | `border/accentSecondary` | `text/accentSecondary` | `bg/accentSecondary` | `text/onAccentSecondary` |

- **`outline`** = `bg/surface` + `border/{semantic}` + `text/{semantic}` (mismo ink que `soft`).
- **†** Figma solo trae `filled` para success/info/error/accentPrimary/accentSecondary.
  El DS lo extiende a `warning` (texto oscuro sobre ámbar, contraste AA) y `neutral`
  (`bg/neutral` + `text/onNeutral`) para mantener la API rectangular.

**Layout:** `gap` `space-50` (4). Padding: xxs `4 / 0`, xs·md `6 / 2` (`space-75` / `space-25`).
Radius `circular-items/radius-round`. Íconos `size/12` (xxs·xs) y `size/16` (md).

## `semantic`: acentos vs estado

`accentPrimary` (kubo: **mint**) y `accentSecondary` (kubo: **orchid**) — nombres de
variante en Figma: `accentMint` / `accentOrchid`; los tokens ya son
`accentPrimary` / `accentSecondary` (cambian con la marca).

Se usan para **énfasis estratégico**: promociones, recomendaciones del sistema,
contenido destacado, beneficios especiales, marketing contextual.

- `accentPrimary` → promociones primarias
- `accentSecondary` → promociones secundarias

**No** para estados críticos, validaciones, errores ni información obligatoria —
eso es `error` / `warning` / `success` / `info`.

## Estilos

- **soft** — fondo tenue. Uso frecuente en listados.
- **outline** — enfoque discreto. Contextos densos.
- **filled** — mayor peso visual. Uso controlado para destacar; no en exceso en una misma pantalla.

## Reglas de uso

- No interactivo. No usar como botón ni como chip seleccionable.
- No combinar múltiples `semantic` en un mismo badge.
- No mezclar `accentPrimary` / `accentSecondary` sin un significado consistente en el producto.
- No usar como decoración sin significado.
- No usar cuando se requiere interacción (`Button` / `FilterChip`), selección
  (`Checkbox` / `Radio`) o mensaje largo (alert / banner).

> Referencia: [Calipso 2.0 — components_badge](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2387-16911)
