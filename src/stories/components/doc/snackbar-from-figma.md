## Snackbar

Componente de **feedback temporal no bloqueante**. Comunica confirmaciones,
errores no críticos, advertencias o info contextual **sin interrumpir el flujo
principal**. No reemplaza modales ni banners persistentes. Figma:
`components_snackbar`.

## Composición

```
Snackbar (card: fondo/borde por variant · elevation-3 · radius 8)
  SnackbarLayout    _building_blocks_snackbar_layout  → mensaje + slot acciones
    SnackbarActions _building_blocks_snackbar_actions → [Button ghost] + [IconButton X]
```

`index.ts` exporta **solo `Snackbar`** + tipos. Los building blocks son internos
(patrón atomic-inside / one-export-outside, como `Calendar`); se documentan en la
story *Building blocks* importándolos por ruta. **No usar los blocks fuera de
`Snackbar`.**

## Propiedades (`Snackbar`)

| Prop | Valores | Default | |
|---|---|---|---|
| `variant` | `neutral` · `success` · `warning` · `error` · `info` | `neutral` | intención visual |
| `message` | `ReactNode` | — | texto de soporte, breve |
| `action` | `{ label, onClick }` | — | acción secundaria (nunca primaria) |
| `onClose` | `() => void` | — | si se pasa, muestra el botón de cerrar |
| `closeLabel` | `string` | `"Cerrar"` | aria-label del cierre |
| `role` | `status` · `alert` | auto | `alert` para warning/error, `status` para el resto |

`<div role>` + `aria-live` (`assertive` para `alert`, `polite` para `status`).
Spread de `HTMLAttributes`.

## Variantes → tokens

Solo cambian **fondo + borde** del card. Mensaje siempre `text/primary`; acción
`text/brand`; ícono close `icon/brand` (no cambia por pantalla). Sin ícono leading.

| variant | fondo | borde | rol ARIA |
|---|---|---|---|
| neutral | `bg/surface` | `border/subtle` | status |
| success | `bg/successMuted` | `border/success` | status |
| warning | `bg/warningMuted` | `border/warning` | alert |
| error | `bg/dangerMuted` | `border/dangerSoft` | alert |
| info | `bg/infoMuted` | `border/info` | status |

Elevación `elevation-3` · radius `controls/radius-100` (8px) · borde 1px.
Tipografía mensaje `Body/md-semiemphasized` (14/20/600) · acción `Button/md`.

## Building blocks

**`SnackbarLayout`** (`line text`: 1 · 2 · >2 · `Show actions`): mensaje + acciones.
En una línea van en fila; si el mensaje ocupa varias, las acciones bajan a su
propia fila alineadas a la derecha. Altura adaptable; padding por spacing tokens
(no configurable en instancia). No define color contextual — lo hereda del card.

**`SnackbarActions`** (`type`: `all` · `action` · `close affordance`): fila de
acciones. `action` = `Button` **ghost** `xs` (pill 32px, nunca primario). `close`
= `IconButton` **ghost** `md` (caja 44px, ícono X 20px) — un paso por debajo del
`lg`/24px de Figma para equilibrar la jerarquía visual del row. `all` = ambos,
`gap` 8. Sin fondo propio.

## Comportamiento (fuera del alcance de este componente)

El `Snackbar` aquí es el **card presentacional**. El posicionamiento (portal,
`fixed`, gutter de safe-area de 16px), el auto-cierre por tiempo y la cola de
**uno a la vez** los gestiona quien lo monta.

- Aparece temporalmente; puede autocerrarse o cerrarse manualmente.
- **Duración recomendada: 3–5 s** para `neutral` / `success`.
- **`error` puede permanecer hasta que haya acción** (no auto-dismiss).
- No debe bloquear la interacción principal.

## Accesibilidad

- Se anuncia como `status` o `alert` (según variant / prop `role`).
- No depender solo del color para indicar la variante — el `message` debe ser
  descriptivo.
- Si contiene acción, debe ser focusable / alcanzable por teclado.

## Anti-patrones

- Errores críticos (usar modal/confirmación).
- Varios snackbars apilados a la vez.
- Cambiar colores fuera de tokens.
- Usarlo como banner permanente.

> Referencia: [Calipso 2.0 — components_snackbar](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2572-566)
