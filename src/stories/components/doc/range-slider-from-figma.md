## Range slider

Permite seleccionar un **valor único** o un **rango continuo** dentro de un
intervalo, mediante handles arrastrables sobre un track. El tramo activo se
representa en el track.

### Arquitectura — atómico por dentro, un componente por fuera

Figma marca los building blocks (`_` prefijo) como internos. En código:

- **`src/components/RangeSlider/index.ts` exporta solo `RangeSlider` + tipos.**
- `SliderHandle` y `SliderHandleIndicator` viven en el folder como componentes
  reales (`.tsx` + `.css`) pero **no se exportan** — se importan por ruta solo en
  las stories, para documentarlos (mismo patrón que `Calendar`).

| Building block | Figma | Rol |
|---|---|---|
| `SliderHandle` | `_building_blocks_slider_handle` | knob arrastrable — `area` (hit target 48px) + `knob` visual (20px) + capa `state` (pressed) |
| `SliderHandleIndicator` | `_building_blocks_slider_handle_indicator` | burbuja con el valor actual durante la interacción |

## Propiedades (`RangeSlider`)

Unión discriminada por `type`:

| Prop | Default | |
|---|---|---|
| `type` | `standard` | `standard` = 1 handle, valor único · `centered` = 2 handles, rango |
| `min` / `max` / `step` | `0` / `100` / `1` | intervalo y paso; el movimiento hace snap al `step` |
| `value` / `defaultValue` / `onChange` | — | `number` en `standard`, `[number, number]` en `centered` |
| `showIndicator` | `true` | `true` = durante drag/focus · `'always'` · `false` |
| `formatValue` | `String` | formatea el valor para la burbuja y el `aria-valuetext` |
| `disabled` | `false` | aplica a todo el componente |

En `centered` los handles **no se cruzan** (cada uno queda acotado por el otro).

## Comportamiento

- **Drag**: pointer down en un handle o en el track → mueve el handle (el más
  cercano si el down fue en el track). `state` (halo `state/pressed`) mientras se
  arrastra.
- **Teclado** (handle enfocado, `role="slider"`): `←`/`→` (y `↑`/`↓`) = ±`step`;
  `PageUp`/`PageDown` = ±`step`×10; `Home`/`End` = extremo (acotado por el otro
  handle en `centered`).
- **Track activo**: `standard` de `min` al handle · `centered` entre los dos
  handles.
- **Indicador**: aparece sobre el handle activo según `showIndicator`.

## Tokens

| Rol | Token |
|---|---|
| Track base | `semantic/color/bg/brandSoft` · alto 4px · `circular-items/radius-round` |
| Track activo | `semantic/color/bg/brand` |
| Knob | `semantic/color/bg/brand` + borde `semantic/color/border/inverse` (2px) + `Elevation/elevation-1` · 20px |
| Hit target | 48px (`sectionSpacing/space-600`) |
| Capa state (pressed) | `semantic/color/state/pressed` (halo) |
| Indicador | `semantic/color/bg/surface` + `Elevation/elevation-1` · `text/primary` · `Body/md-semiemphasized` · padding `internalLayout/space-100` · min-width 40 · `radius-round` |
| Disabled | track activo y knob → `semantic/color/bg/disabled` |

## Accesibilidad

- Hit target 48×48 por handle (44×44 mínimo).
- Cada handle es `role="slider"` con `aria-valuemin`/`max`/`now`/`valuetext`;
  en `centered` los límites de cada handle se ajustan al otro y llevan
  `aria-label` "Valor mínimo" / "Valor máximo". Contenedor `role="group"`.
- Navegación por teclado (flechas) — el estado activo no depende solo del color
  (el halo y el movimiento del knob lo comunican).

## Cuándo NO usarlo

Precisión numérica exacta obligatoria (input numérico), pocas opciones discretas
(segmented control / radios), valor binario (switch), valores no secuenciales
(dropdown).

> Referencia: [Calipso 2.0 — components_range_slider](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2542-32775)
> · [slider_handle](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2540-32101)
> · [slider_handle_indicator](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2542-32756)
