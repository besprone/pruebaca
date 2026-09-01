## Filter chip

Chip interactivo compacto que activa/desactiva una opción de filtro. Puede
usarse como selector múltiple o exclusivo **según el patrón que lo contenga** —
el chip **no gestiona la exclusividad por sí solo**. Para single-select usar
`ChipGroup`.

Figma: `components_filter_chip` (componente público, sin prefijo `_`).

## Propiedades

| Prop | Default | |
|---|---|---|
| `selected` | `false` | estado activo del filtro — **persistente** |
| `leading` | — | ícono leading opcional (20px) |
| `disabled` | `false` | |
| `children` | — | label |
| resto | — | props nativas de `<button>` (`onClick`, `aria-*`, …) |

> Figma: **6 variantes** = `selected` (false/true) × `state` (default/pressed/disabled).
> `hover` es extensión web (no está en Figma) — capa de estado global, gated con
> `@media (hover: hover)`.

## Anatomía

```
.filter-chip           <button> — bg + borde + radius-100 + padding 6/12
  ::after              capa de estado (inset -1px, cubre el borde)
  .filter-chip__content  fila flex: leading (opc.) + label
    .filter-chip__label   Typography/Body/md-semiemphasized (14/20/600)
```

## Tokens

| Rol | Token |
|---|---|
| Fondo unselected | `semantic/color/bg/surface` |
| Fondo selected | `semantic/color/bg/brandSoft` (sin borde) |
| Borde unselected | `semantic/color/border/subtle` (1px) |
| Texto | `semantic/color/text/primary` (disabled → `text/disabled`) |
| Capa hover / pressed / disabled | `semantic/color/state/{hover,pressed,disabled}` |
| Radius | `controls/radius-100` (8px) |
| Padding | `internalLayout/space-75` / `space-150` (6 / 12) · gap `space-100` (8) |

## Comportamiento

- `selected` es persistente (no transitorio). Debe distinguirse por **superficie**
  (relleno `brandSoft`) además del color — no depende solo del color.
- `pressed` (`:active`) es transitorio; `disabled` impide interacción.
- Expone `aria-pressed={selected}` por defecto (toggle button). Dentro de
  `ChipGroup` se sustituye por `role="radio"` + `aria-checked`.

## Diferencia vs otros

- **No es button** — no ejecuta una acción primaria.
- **No es checkbox** — no muestra indicador formal de selección.
- **No es radio** — no gestiona exclusividad por sí mismo.

> Referencia: [Calipso 2.0 — components_filter_chip](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2509-26269)
