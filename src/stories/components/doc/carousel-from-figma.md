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
  .carousel__dots      grupo de botones-punto
    .carousel__dot     `size/6` círculo · hit area ampliada (::after inset -9)
```

| dot | fill |
|---|---|
| activo | `semantic/color/icon/brand` |
| inactivo | `semantic/color/icon/tertiary` |

`size/6` es token nuevo de iconography (añadido con este componente).

## Comportamiento / motion

- **Swipe** nativo vía `scroll-snap-type: x mandatory` + `scroll-snap-align: start`
  por página → momentum físico, sin overshoot excesivo (equivalente web del
  `motion/spring` del prototipo de Figma).
- La **página activa** se calcula del `scrollLeft` (la página más cercana al borde
  izquierdo del viewport) y actualiza el dot + `onPageChange`.
- **Dots** y **flechas** hacen `scrollTo({ behavior: 'smooth' })` (o `auto` con
  `prefers-reduced-motion`).
- El contenido fuera del viewport se recorta; no se alteran los tokens internos
  de los slots ni el layout vertical.

## Accesibilidad

- `.carousel__viewport` = `role="group"` + `aria-roledescription="carrusel"` +
  `aria-label`, `tabIndex={0}`: navegable con **↑/↓ del scroll** y **←/→**
  (salto de página).
- Cada página: `role="group"` + `aria-roledescription="diapositiva"` +
  `aria-label="N de M"`; `aria-hidden` en las no activas.
- **Dots como `<button>`** (`aria-current` en el activo) — afordancia accesible
  además del swipe. Diverge de Figma, donde el dot "no es interactivo de forma
  independiente"; se hace interactivo por accesibilidad.
- El estado activo no depende solo del color (posición del dot + `aria-current`).

## Guías de uso

- `size` (sm/md/lg/xl) y el preset `Resumen de saldos` de Figma no se modelan:
  el carrusel llena su contenedor y el consumidor lo dimensiona; `Resumen de
  saldos` es un patrón de app, no el primitivo.

> Referencia: [Calipso 2.0 — components_carousel](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2654-31698)
