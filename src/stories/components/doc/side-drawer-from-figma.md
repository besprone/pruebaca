## SideDrawer

Superficie modal que se ancla a la orilla lateral de la pantalla y se
desliza hacia adentro. Se usa para filtros, navegación secundaria o
contenido complementario que no debe interrumpir el flujo principal. A
diferencia de `Dialog` (centrado), el drawer mantiene visible el contenido
detrás mediante un overlay. Figma: `components_side_drawer`.

**No** usar para: decisiones/confirmaciones puntuales (usar `Dialog`,
centrado); una sola acción rápida (usar un popover); interrumpir al usuario
de forma crítica (usar `Dialog`).

## API

```tsx
const [open, setOpen] = useState(true);
const [mounted, setMounted] = useState(true);

{mounted && (
  <SideDrawer
    open={open}
    onClose={() => setOpen(false)}
    onExited={() => setMounted(false)}
    label="Filtrar movimientos"
    supporting="Ajusta el rango y el tipo de movimiento"
    footer={<><Button emphasis="secondary" size="sm">Limpiar</Button><Button size="sm">Aplicar</Button></>}
  >
    <List>…</List>
  </SideDrawer>
)}
```

| Prop | Valores | |
|---|---|---|
| `open` | `boolean` | controlado. Al pasar a `false` reproduce la salida y luego llama `onExited` |
| `onClose` | `() => void` | overlay · Escape · botón de cerrar |
| `onExited` | `() => void` | fin de la animación de salida — el consumidor desmonta ahí |
| `anchor` | `right` (def.) · `left` | orilla a la que se ancla |
| `size` | `lg` (def., único construido) | 360px. Figma prevé `sm`/`md` para tablet/mobile, aún no documentados — el tipo queda abierto a extenderse sin breaking change |
| `showClose` | `boolean` (def. `true`) | botón de cerrar (`IconButton` ghost `lg`) |
| `headerAction` | `ReactNode` | acción extra en el header, junto al cerrar |
| `label` / `supporting` | `ReactNode` | título + descripción breve |
| `footer` | `ReactNode` | 1–2 `Button`, reparten el ancho completo (`flex: 1` cada uno) |
| `microcopy` | `ReactNode` | texto legal / aclaratorio sobre los botones (`text/tertiary`, centrado) |
| `aria-label` | `string` | nombre del drawer si no hay `label` visible |

`children` = **content slot**, siempre flexible (el drawer ocupa el alto
completo del viewport — no hay variante de altura adaptativa).
`forwardRef<HTMLDivElement>`.

## Estructura

```
.side-drawer-overlay                fixed · flex (justify según anchor) · z 200
  .side-drawer-overlay__backdrop    bg/overlay · fade con --drawer-progress
  .side-drawer [role=dialog aria-modal]  360×100dvh · SIN radio · translateX según anchor
    .side-drawer__header             cerrar (+ headerAction) · label/supporting
    .side-drawer__content            children · flex:1 · overflow-y auto
    .side-drawer__footer             microcopy + .side-drawer__actions (Button ·N, flex:1 c/u)
```

## Componentes que instancia

`IconButton` (cerrar / `headerAction`), `Button` (footer, los pasa el
consumidor). El `content` (children) es un slot.

## Comportamiento

- Se ancla a la orilla derecha (default) o izquierda (`anchor="left"`) y
  ocupa el alto completo del viewport.
- El contenido detrás se atenúa con el overlay (`semantic/color/bg/overlay`)
  pero permanece visible.
- El header y el footer quedan fijos; solo el content slot hace scroll.
- Cierra con: botón de cerrar, click en el overlay, o `Escape`. **No** tiene
  swipe-to-dismiss (a diferencia de `BottomSheet`).
- **Foco**: al abrir se mueve al primer interactivo (o al drawer); trap de
  `Tab` dentro; se restaura al cerrar. `role="dialog"` + `aria-modal` +
  `aria-labelledby` (el `label`, si es visible). Overlay `aria-hidden`.
- **Scroll lock** del `body` mientras está abierto.

## Motion

Progreso 0 (cerrado) → 1 (abierto) con `motion/spring`
(`src/lib/spring` — stiffness 100, damping 15, mass 1), aplicado como
`translateX` sobre el drawer (signo según `anchor`) y `opacity` sobre el
overlay, ambos vía la variable CSS `--drawer-progress`.
`prefers-reduced-motion` → sin animación (salta al estado final, `onExited`
inmediato).

## Tokens

| Elemento | Token |
|---|---|
| Ancho | `layout/web/screen/webSideDrawer` (360 — no está aún en el pipeline, literal) |
| Alto | `100dvh` (viewport completo — Figma: "adaptativo, ocupa el alto completo") |
| Fondo | `semantic/color/bg/canvas` |
| Overlay | `semantic/color/bg/overlay` (`#00000066`) — **distinto** del `rgba(28,27,32,.4)` que usan `Dialog`/`BottomSheet` (ver nota abajo) |
| Sombra | `Elevation/elevation-3` |
| Radio | ninguno (`radius-0` — a diferencia de `Dialog`/`BottomSheet`, que sí redondean) |
| Label | `text/primary` · Display/sm-se (28/36/600) |
| Supporting | `text/secondary` · Body/lg (16/24/500) |
| Microcopy | `text/tertiary` · Body/md (14/20), centrado |
| `padding` header | `pt` `internalLayout/space-150` (12) · `pb` `componentSpacing/space-200` (16) · `px` `internalLayout/space-150` (12) — idéntico al header de `Dialog` |
| content slot | `padding-inline` `componentSpacing/space-300` (24) · siempre `flex:1` |
| footer | `padding-block` `componentSpacing/space-300` (24) · `padding-inline` 24 · `gap` 16 · acciones `gap` 8, `flex: 1` cada botón — desviación deliberada de Figma (que muestra ancho natural también acá), por el mismo motivo que la centrada de `Dialog`: en un panel angosto (360px) un ancho natural deja demasiado espacio muerto |

> **Nota de tokens:** el PDF documenta el overlay como
> `semantic/color/bg/overlay`, y el token existe en el pipeline
> (`#00000066`) pero **no** se usó al construir `Dialog`/`BottomSheet`
> (ambos quedaron con un `rgba(28,27,32,.4)` literal). Aquí sí se usa el
> token — vale la pena unificar `Dialog`/`BottomSheet` a este token en un
> follow-up.

## Relación con otros patrones (del PDF)

Familia de superficies modales:
- `components_dialog` → centrado, para decisiones/confirmaciones.
- `components_side_drawer` → lateral, para filtros/contenido complementario (este).
- `components_bottom_sheet` → desde abajo (móvil).

## Plataforma

Por ahora solo se usa en web, con la variante `size="lg"` (360px). Las
variantes `sm`/`md` se aplicarán más adelante cuando se aborden tablet/mobile
web — el tipo `SideDrawerSize` queda abierto a extenderse sin romper la API.

> Referencia: [Calipso 2.0 — components_side_drawer](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4699-3112)
