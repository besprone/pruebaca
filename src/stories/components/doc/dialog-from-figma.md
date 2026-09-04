## Dialog

Contenedor modal centrado. Presenta contenido crítico, confirmaciones,
formularios o información contextual. Bloquea la interacción con el
contenido subyacente hasta que se resuelva o se cierre. Figma:
`components_dialog`.

**No** usar para mensajes informativos simples (usar toast o banner) ni más
de un diálogo simultáneo.

## API

```tsx
const [open, setOpen] = useState(true);
const [mounted, setMounted] = useState(true);

{mounted && (
  <Dialog
    open={open}
    onClose={() => setOpen(false)}
    onExited={() => setMounted(false)}
    label="Confirma tu transferencia"
    supporting="Vas a transferir $2,500 MXN a Juan Pérez"
    footer={<><Button emphasis="secondary" size="sm">Cancelar</Button><Button size="sm">Confirmar</Button></>}
  >
    <List>…</List>
  </Dialog>
)}
```

| Prop | Valores | |
|---|---|---|
| `open` | `boolean` | controlado. Al pasar a `false` reproduce la salida y luego llama `onExited` |
| `onClose` | `() => void` | backdrop · Escape · botón de cerrar |
| `onExited` | `() => void` | fin de la animación de salida — el consumidor desmonta ahí |
| `type` | `default` (def.) · `centered` · `iframe` · `slotOnly` | `default` = Label/Supporting en el header, izquierda · `centered` = bloque centrado (+ `slotHeading`) sobre el content slot, sin título en el header · `iframe` = header minimal (cerrar izquierda, acciones derecha) para contenido embebido · `slotOnly` = solo content slot, sin header ni footer |
| `size` | `md` (def.) · `lg` | solo aplica con `fullHeight`: altura máxima 600 (`md`) · 800 (`lg`) |
| `fullHeight` | `boolean` (def. `false`) | `true` → altura máxima según `size` y el content slot hace scroll · `false` → altura según contenido |
| `showClose` | `boolean` (def. `true`) | botón de cerrar (`IconButton` ghost `lg`) |
| `headerAction` | `ReactNode` | acción extra en el header — junto al cerrar (`default`/`centered`) o a la derecha (`iframe`: compartir / buscar) |
| `slotHeading` | `ReactNode` | `centered` — icono / ilustración sobre el label |
| `label` / `supporting` | `ReactNode` | título + descripción breve |
| `footer` | `ReactNode` | 1–2 `Button`, alineados a la derecha (sin stretch) · centrados en `type="centered"` |
| `microcopy` | `ReactNode` | texto legal / aclaratorio sobre los botones (`text/tertiary`, centrado) |
| `aria-label` | `string` | nombre del diálogo si no hay `label` visible |

`children` = **content slot**. `forwardRef<HTMLDivElement>`.

## Estructura

```
.dialog-overlay                    fixed · flex center · z 200
  .dialog-overlay__backdrop        rgba(28,27,32,.4) · fade con --dialog-progress
  .dialog [role=dialog aria-modal] scale + fade con --dialog-progress
    .dialog__header                 cerrar (+ headerAction) · label/supporting (type=default)
    .dialog__container              (type=centered) slotHeading+label/supporting + content, centrados
    .dialog__content                children · overflow-y auto
    .dialog__footer                 microcopy + .dialog__actions (Button ·N, justify-end)
```

## Componentes que instancia

`IconButton` (cerrar / `headerAction`), `Button` (footer, los pasa el
consumidor). `slotHeading` y `content` (children) son slots.

## Comportamiento

- Aparece centrado sobre un overlay que bloquea la interacción de fondo.
- Cierra con: botón de cerrar, click en el backdrop, o `Escape`. **No** tiene
  swipe-to-dismiss (a diferencia de `BottomSheet` — es un patrón de escritorio,
  sin handle).
- **Foco**: al abrir se mueve al primer interactivo (o al diálogo); trap de
  `Tab` dentro; se restaura al cerrar. `role="dialog"` + `aria-modal` +
  `aria-labelledby` (el `label`, si es visible). Backdrop `aria-hidden`.
- **Scroll lock** del `body` mientras está abierto.
- `fullHeight: true` → el content slot crece y hace scroll; el diálogo se topa
  en `min(600|800px, 90dvh)` según `size`.
- Ancho fijo **560px** en todos los tipos y tamaños (`size` no afecta el ancho,
  solo la altura máxima en `fullHeight`).

## Motion

Progreso 0 (cerrado) → 1 (abierto) con `motion/spring`
(`src/lib/spring` — stiffness 100, damping 15, mass 1), aplicado como
`opacity` + `scale(0.96 → 1)` sobre el diálogo y `opacity` sobre el backdrop
(variable CSS `--dialog-progress`, compartida por ambos).
`prefers-reduced-motion` → sin animación (salta al estado final, `onExited`
inmediato).

## Tokens

| Elemento | Token |
|---|---|
| Ancho | `layout/web/screen/dialogWidth` (560 — no está aún en el pipeline, literal) |
| Alto máx. (`fullHeight`) | `layout/web/screen/dialogHeightMd` (600) · `dialogHeightLg` (800) — literal |
| Fondo | `semantic/color/bg/canvas` |
| Sombra | `Elevation/elevation-3` |
| Radio | `containers/radius-300` (24, las 4 esquinas) |
| Label | `text/primary` · Display/sm-se (28/36/600) |
| Supporting | `text/secondary` · Body/lg (16/24/500) |
| Microcopy | `text/tertiary` · Body/md (14/20), centrado |
| `padding` header (`default`) | `pt` `internalLayout/space-150` (12) · `pb` `componentSpacing/space-200` (16) · `px` `internalLayout/space-150` (12) |
| `padding` header (otros tipos) | `py` `internalLayout/space-100` (8) · `px` `internalLayout/space-150` (12) |
| content slot (`default`) | `padding-inline` `componentSpacing/space-300` (24) |
| content slot (`centered`) | hereda el `padding-inline` 24 del `.dialog__container` |
| content slot (`iframe`/`slotOnly`) | edge-to-edge (0) · `iframe` sin `fullHeight` → alto fijo 160 |
| footer | `padding-block` `componentSpacing/space-300` (24) · `padding-inline` 24 · `gap` 16 · acciones `gap` 8, `justify-end` (sin stretch — a diferencia de `BottomSheet`); `center` en `type="centered"` — desviación deliberada de Figma (que mantiene `justify-end` en todos los tipos) por balance visual con el contenido centrado |

## Diferencias con `BottomSheet`

Ambos comparten el patrón overlay/modal (`open`/`onClose`/`onExited`, foco,
scroll lock, Escape), pero:

- `Dialog` está **centrado** (no anclado abajo), ancho fijo 560, radio en las
  4 esquinas, **sin** handle ni swipe-to-dismiss.
- Tipografía más grande (Display/sm · Body/lg en label/supporting, tanto en
  header como en `centered`) — `BottomSheet` usa Headline/sm · Body/md.
  Es un patrón pensado para escritorio/tablet.
- El footer **no** estira los botones (`justify-end`, ancho natural) — el de
  `BottomSheet` sí (`flex: 1` cada uno).
- Tipos adicionales `iframe` (contenido embebido) y `slotOnly` (solo content
  slot, sin header/footer).

## Variantes (del PDF)

| # | qué | props |
|---|---|---|
| Default | confirmaciones, formularios cortos | `label` + `supporting` + `footer` |
| Centered | estados informativos, confirmaciones de éxito | `type="centered"` + `slotHeading` + `label` + `supporting` |
| Iframe | contenido embebido (web views) | `type="iframe"` + `headerAction` (compartir / buscar) |
| Slot only | contenido 100% custom, sin header ni footer | `type="slotOnly"` |
| Full height | flujos largos, listas extensas | `fullHeight` + `size="lg"` |

> Reglas de uso (PDF): usar para acciones críticas que requieren confirmación
> o atención inmediata. Si el flujo tiene más de 2 pasos dentro del diálogo,
> considerar un patrón de flujo completo (fullscreen). `microcopy` solo
> cuando hay contexto legal o regulatorio obligatorio.

> Referencia: [Calipso 2.0 — components_dialog](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4111-8713)
