## Card

Contenedor estructural para agrupar contenido dentro de un layout. Figma:
`components_card`. Define **superficie, radio, elevación e interacción**. **No
define estilos internos del contenido — eso lo delega al slot.**

Se usa para estructurar información, agrupar módulos y generar separación visual.
No usar como sustituto de botón ni de acción primaria.

## El slot = `children`

No hay building blocks. El slot de Figma (`_building_blocks_slot_component`) es
`children`: le pasas cualquier composición del sistema de diseño (texto, iconos,
`Badge`, `Button`, imágenes…). La Card:

- renderiza el contenido **a ras** (padding 0) y lo **recorta al radio** de 16px
  (`overflow: clip` → una imagen dentro sale con esquinas redondeadas gratis);
- **no** mete padding ni altera tokens del contenido;
- **no** modifica el layout al cambiar de estado.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `interactive` | `boolean` | `false` | `true` → clickable: hover/pressed/focus, `role="button"`, teclado (Enter/Espacio) |
| `selected` | `boolean` | `false` | elegida (solo con `interactive`). Añade `data-selected`; la semántica ARIA la pone el consumidor |
| `elevation` | `flat` · `raised` | `flat` | `flat` = elevation-0, `raised` = elevation-2 |
| `badge` | `ReactNode` | — | se monta **sobre el borde superior**, centrado (ej. `<Badge>`) |
| `children` | `ReactNode` | — | el slot |

Spread de `HTMLAttributes<HTMLDivElement>` (`onClick`, `aria-*`, `className`…).

## Anatomía / tokens

```
.card             position: relative · SIN clip (badge + focus ring salen)
  .card__badge    absolute · top:-10 · centrado
  .card__surface  bg + radius `containers/radius-200` (16) + overflow:clip + elevación
    {slot}
    ::after       capa de estado — se compone encima, nunca reemplaza el fondo
    .card__check  checkmark 20px (arriba-derecha, inset 6) · `icon/brand`
```

| estado (solo `interactive`) | tokens |
|---|---|
| default | `bg/surface` |
| hovered | `::after` = `state/hover` — **solo con cursor** (`@media (hover: hover)`), no en touch |
| pressed | `::after` = `state/pressed` |
| focused | `::after` = `state/focus` + `outline` 2px `state/focusRing` (offset 2) |
| selected | `bg/brandSoft` + `inset 0 0 0 2px border/brand` + check `icon/brand` |

`raised` = `elevation-2` (`0 3px 8px rgba(28,27,32,.12)`). Sin motion propio (el
cambio a pressed depende del sistema global de interacción).

## Interactividad

Con `interactive` se renderiza como `<div role="button" tabIndex={0}>` +
`onKeyDown` (Enter / Espacio → click). Se eligió `div[role=button]` sobre
`<button>` para permitir **elementos interactivos dentro del slot** (un link, un
`Button`). Si anidas interactivos, define tú a dónde va el foco/click; el patrón
"card clickable con acción interna" es responsabilidad del consumidor.

Para grupos single-select (elegir un plazo, una opción), pasa `role="radio"` +
`aria-checked` y envuelve en un `role="radiogroup"` (ver story *Grupo
seleccionable*).

## Guías de uso

- `surface` es el fondo estándar. `brandMuted` para diferenciación visual
  secundaria sin jerarquía de acción (vía `className`/estilo del consumidor).
- No reducir el contraste del contenido interno.
- Respetar el área mínima interactiva cuando `interactive`.

> Referencia: [Calipso 2.0 — components_card](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2197-8223)
