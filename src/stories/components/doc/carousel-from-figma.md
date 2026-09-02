## Carousel

Contenido secuencial **desplazable horizontalmente**. Figma: `components_carousel`.
Encapsula el layout y controla la página activa. Usar cuando el contenido no cabe
en una sola vista; **no** con un solo ítem ni cuando se necesita comparación
simultánea.

## El slot = `children`

No replica los building blocks de Figma (`blocks`, `# slots * block`,
`pagination_dots_group`, `pagination_dot`) — son andamiaje de diseño. En React:

- `children` = los slides; cada hijo es un slot con cualquier composición del DS.
- Las **páginas** se derivan agrupando los hijos de `itemsPerView` en `itemsPerView`.
- Los **dots** se derivan del nº de páginas.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `itemsPerView` | `1` · `2` · `3` | `1` | slots visibles por página (Figma: `configuration` / `# slots * block`) |
| `pagination` | `boolean` | `true` | muestra los dots |
| `controls` | `boolean` | `false` | flechas prev/next (afordancia de desktop; en touch se usa swipe) |
| `loop` | `boolean` | `false` | flechas/teclado ciclan en los extremos (el swipe **no** cicla) |
| `aria-label` | `string` | — | **requerido**, nombra la región |
| `onPageChange` | `(page: number) => void` | — | página activa (0-based) al cambiar |
| `children` | `ReactNode` | — | los slides |

Spread de `HTMLAttributes<HTMLDivElement>`.

## Anatomía / tokens

```
.carousel            column · relative · gap `space-150` (12)
  .carousel__viewport  overflow-x scroll + scroll-snap x mandatory · scrollbar oculta
    .carousel__track   flex row · gap `space-200` (16)
      .carousel__page  flex 0 0 100% · scroll-snap-align:start · flex row · gap 16
        .carousel__slot  flex 1 → reparte el ancho entre los slots de la página
  .carousel__arrow     IconButton ghost `sm` absoluto en las esquinas (solo `controls`)
  .carousel__dots      fila de indicadores (aria-hidden) — NO interactivos
    .carousel__dot     `size/6` círculo · <span> · sin foco ni click
```

| dot | fill |
|---|---|
| activo | `semantic/color/icon/brand` |
| inactivo | `semantic/color/icon/tertiary` |

Los dots **solo indican** (como en Figma: `_building_blocks_carousel_pagination_dot`
= 6px, fill por `active`, nada más). `size/6` es token nuevo de iconography.

## Navegación

| Entrada | Cómo |
|---|---|
| **Swipe táctil** | `scroll-snap-type: x mandatory` + `scroll-snap-align: start` por página → momentum físico nativo (equivalente web del `motion/spring` del prototipo) |
| **Arrastre con mouse** | pointer events en el viewport, **solo `pointerType === 'mouse'`**: `pointerdown` fija `scrollLeft` inicial y desactiva el snap; `pointermove` mueve el scroll 1:1; `pointerup` reactiva el snap y hace `scrollTo` suave a la página más cercana. Umbral de 5px: por debajo es un click (los interactivos del slot siguen funcionando); si hubo arrastre se anula ese click. `cursor: grab / grabbing` (solo mouse) |
| **Teclado** | viewport enfocado (`tabIndex={0}`) → **←/→** salto de página |
| **Flechas** (`controls`) | `scrollTo` suave; `disabled` en los extremos (salvo `loop`) |

### `loop` — infinito sin costura

Técnica estándar de la industria (Swiper/Embla/Slick), **sin dependencias**:

- Se clona **una página en cada extremo**: DOM = `[clon-último] · páginas reales · [clon-primero]`. Los clones van `inert` + `aria-hidden` (teclado y lector de pantalla los saltan).
- El scroll arranca sobre la **primera página real** (`useLayoutEffect`, antes del paint).
- Swipe / arrastre / flecha / tecla pasan del último slot **hacia el clon** (misma dirección, animado). Al asentar (evento **`scrollend`**, o `setTimeout(120ms)` de fallback para Safari < 18.2) se hace un `scrollTo({ behavior: 'instant' })` a la página real equivalente — invisible porque los pixeles son idénticos y el scroll ya paró.
- Mientras se está sobre un clon, `active` (dots + región live) ya muestra el índice real, así que no hay parpadeo tras el salto.
- No está en la spec de Figma — extensión del DS. Los slides de un carrusel `loop` deben ser **sin estado** (se clonan).

La **página activa** se calcula del `scrollLeft` (página más cercana al borde
izquierdo) → actualiza el dot + `onPageChange` (índice real). `scrollTo` usa
`instant` con `prefers-reduced-motion`. El contenido fuera del viewport se
recorta; no se alteran los tokens internos de los slots ni el layout vertical.

## Accesibilidad

- `.carousel__viewport` = `role="group"` + `aria-roledescription="carrusel"` +
  `aria-label`, `tabIndex={0}`; navegable con **←/→** (salto de página).
- Cada página: `role="group"` + `aria-roledescription="diapositiva"` +
  `aria-label="N de M"`; `aria-hidden` en las no activas.
- Los **dots** van `aria-hidden` (decorativos). La posición se anuncia con una
  región `aria-live="polite"` visualmente oculta ("Página N de M").
- El estado activo no depende solo del color (región live + `aria-hidden` por página).

## Guías de uso

- `size` (sm/md/lg/xl) y el preset `Resumen de saldos` de Figma no se modelan:
  el carrusel llena su contenedor y el consumidor lo dimensiona; `Resumen de
  saldos` es un patrón de app, no el primitivo.

> Referencia: [Calipso 2.0 — components_carousel](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2654-31698)
