## BottomSheet

Contenedor modal anclado a la parte inferior de la pantalla. Presenta contenido
contextual, acciones y estados sin abandonar la vista. Figma:
`components_bottom_sheet`.

**No** usar para flujos largos complejos, navegación principal ni sheets
apilados.

## API

```tsx
const [open, setOpen] = useState(true);
const [mounted, setMounted] = useState(true);

{mounted && (
  <BottomSheet
    open={open}
    onClose={() => setOpen(false)}
    onExited={() => setMounted(false)}
    label="Deposita dinero"
    supporting="Elige cómo quieres agregar fondos"
    footer={<><Button emphasis="secondary" size="sm">Cancelar</Button><Button size="sm">Confirmar</Button></>}
  >
    <List>…</List>
  </BottomSheet>
)}
```

| Prop | Valores | |
|---|---|---|
| `open` | `boolean` | controlado. Al pasar a `false` reproduce la salida y luego llama `onExited` |
| `onClose` | `() => void` | backdrop · Escape · botón de cerrar |
| `onExited` | `() => void` | fin de la animación de salida — el consumidor desmonta ahí |
| `type` | `default` (def.) · `centered` | `default` = Label/Supporting en el header, izquierda · `centered` = bloque de texto (+ `slotHeading`) centrado bajo un header sin título (estados informativos, confirmaciones) |
| `fullHeight` | `boolean` (def. `false`) | `true` → altura máx. (**92dvh**) y el content hace scroll · `false` → altura según contenido |
| `showHandle` | `boolean` (def. `true`) | barra de arrastre. `true` comunica swipe · `false` = diálogo |
| `showClose` | `boolean` (def. `true`) | botón de cerrar (`IconButton` ghost `lg`, esquina superior **izquierda**) |
| `swipeToClose` | `boolean` (def. `true`) | cerrar arrastrando hacia abajo desde el handle / header. Solo si hay `showHandle` + `onClose` |
| `label` / `supporting` | `ReactNode` | título + descripción breve |
| `slotHeading` | `ReactNode` | `centered` — icono / ilustración sobre el label |
| `headerAction` | `ReactNode` | acción extra en el header, a la derecha (rara) |
| `footer` | `ReactNode` | 1–2 `Button` (`flex: 1` cada uno) |
| `microcopy` | `ReactNode` | texto legal / aclaratorio sobre los botones (`text/tertiary`, centrado) |
| `aria-label` | `string` | nombre del diálogo si no hay `label` visible |

`children` = **content slot**. `forwardRef<HTMLDivElement>`.

## Estructura

```
.bottom-sheet-overlay              fixed · flex align-end center · z 200
  .bottom-sheet-overlay__backdrop  rgba(28,27,32,.4) · fade con data-state
  .bottom-sheet [role=dialog aria-modal]  translateY(%) por spring
    .bottom-sheet__handle          4×32 · icon/tertiary · radius round
    .bottom-sheet__appbar          <AppBar size="sm"> — layout `stacked` si hay
                                   label/supporting (type=default), `inline` si no
    .bottom-sheet__centered        (type=centered) slotHeading + label/supporting
    .bottom-sheet__content         children · overflow-y auto
    .bottom-sheet__footer          microcopy + .bottom-sheet__actions (Button ·N)
```

## Componentes que instancia

`AppBar` (header), `IconButton` (cerrar), `Button` (footer, los pasa el
consumidor). El `slotHeading` y el `content` son slots.

## Comportamiento

- Aparece desde abajo; el backdrop bloquea la interacción de fondo.
- Cierra con: botón de cerrar, click en el backdrop, `Escape`, o **swipe hacia
  abajo** desde el handle / header (`swipeToClose`, si hay `showHandle`).
- **Swipe**: `touch-action: none` solo en la zona handle + header (el content
  sigue scrolleando). El sheet sigue el dedo (`translateY`), el backdrop se
  atenúa a la par (`--bs-drag`). Al soltar: si el recorrido supera el 35 % del
  alto **o** hay flick hacia abajo → cierra; si no, vuelve a su sitio con el
  muelle. `PointerEvent` + `setPointerCapture` (mouse + touch).
- **Foco**: al abrir se mueve al primer interactivo (o al sheet); trap de `Tab`
  dentro; se restaura al cerrar. `role="dialog"` + `aria-modal` +
  `aria-labelledby` (el `label`). Backdrop `aria-hidden`.
- **Scroll lock** del `body` mientras está abierto.
- `fullHeight: true` → `.bottom-sheet__content` crece y hace scroll; el sheet se
  topa en 92dvh.

## Motion

`translateY(%)` con `motion/spring` (`src/lib/spring` — stiffness 100, damping 15,
mass 1). Entrada 100 → 0, salida 0 → 100 y `onExited`. El handle solo acompaña
al contenedor (no anima aparte). El backdrop hace fade (`linear-200`).
`prefers-reduced-motion` → sin animación (salta al estado final, `onExited`
inmediato).

## Tokens

| Elemento | Token |
|---|---|
| Fondo | `semantic/color/bg/canvas` |
| Sombra | `Elevation/elevation-3` |
| Radio superior | `containers/radius-300` (24) |
| Handle | `semantic/color/icon/tertiary` · `circular-items/radius-round` |
| Label | `text/primary` · Headline/sm-se (24/32/600) |
| Supporting | `text/secondary` · Body/md (14/20) |
| Microcopy | `text/tertiary` · Body/md (14/20), centrado |
| `padding-bottom` sheet | `layout/content/bottomClearance` (24) |
| content slot | `padding-top` `layout/stack/block` (16) · `padding-inline` `layout/container/inline` (16) |
| footer | `padding-top` `componentSpacing/space-300` (24) · `padding-inline` (16) · `gap` (16) · actions `gap` 8 |

## Variantes (del PDF)

| # | qué | props |
|---|---|---|
| Basic sheet | acciones simples, listas cortas | `label` + `supporting` + content |
| Informational (centered) | empty states, confirmaciones | `type="centered"` + `slotHeading` + `label` + `supporting` |
| Full content | formularios, flujos largos | `fullHeight` + content dominante, header mínimo |
| Con footer | contenido rico | `footer` (1–2 Button) + `microcopy` |
| Minimal | componentes embebidos, quick actions | sin `label`/`supporting`, `showClose={false}`, solo content |

> Figma tiene un tercer `type="webview"` (full-height, contenido embebido) — se
> cubre con `type="default"` + `fullHeight` + header mínimo.

> Referencia: [Calipso 2.0 — components_bottom_sheet](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2524-37133)
