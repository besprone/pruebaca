## Calendar

Componente compuesto de selección de fecha, por vista de **día** o de **año**.
Se construye a partir de building blocks internos; no se dibujan días
manualmente, se instancian celdas.

### Arquitectura — atómico por dentro, un componente por fuera

Figma marca los building blocks (`_` prefijo) como internos: *"No deben
utilizarse directamente en pantallas de producto. No forman parte del catálogo
público."* En código:

- **`Calendar`** es lo único que se exporta (más sus tipos), vía
  `src/components/Calendar/index.ts`.
- Los building blocks viven en el mismo folder como componentes reales
  (`.tsx` + `.css`) pero **no se exportan** — solo se importan por ruta en las
  stories para documentarlos.

| Building block | Figma | Rol |
|---|---|---|
| `CalendarMenuButton` | `_building_blocks_menu_button` | alterna vista día ↔ año; el chevron indica el cambio |
| `CalendarDayCell` | `_building_blocks_calendar_cell_day` | una celda de día — 18 variantes (3 type × 3 state × 2 size) |
| `CalendarYearCell` | `_building_blocks_calendar_cell_year` | una celda de año — 6 variantes (2 type × 3 state, solo xs) |

## Propiedades (`Calendar`)

| Prop | Default | |
|---|---|---|
| `value` / `defaultValue` / `onChange(date)` | — | fecha seleccionada; solo una a la vez |
| `defaultMonth` | `value` o hoy | mes visible al montar |
| `minDate` / `maxDate` | — | fuera de rango → celdas `disabled` |
| `size` | `sm` | `sm` (estándar en formularios) · `xs` (modales/flows densos) |
| `surface` | `none` | `none` (plano, embebido) · `card` (contenedor elevado: `bg/surface` + `containers/radius-200` + `Elevation/elevation-2`) |
| `locale` | `es-MX` | nombres de mes/día vía `Intl.DateTimeFormat` |
| `weekStartsOn` | `0` | 0 = domingo (como Figma: D L M M J V S) · 1 = lunes |

No se crean tamaños arbitrarios ni se alteran paddings fuera de layout tokens.

## Comportamiento

- El componente controla internamente qué celdas están `disabled` (fuera de mes,
  fuera de rango). No se alteran celdas desde pantalla.
- La selección vive a nivel de `Calendar`, no de celda suelta.
- **Vista día**: header (`CalendarMenuButton` con "Febrero 2026" + nav ‹ ›) ·
  fila de iniciales · grid 6×7. Hoy = `type=today` (outline brand); elegido =
  `type=selected` (relleno brand); días de otro mes = atenuados (`text/tertiary`)
  pero navegables.
- **Vista año**: `CalendarMenuButton` con el rango (chevron arriba) + grid 3×3.
  Elegir un año vuelve a la vista día en ese año.
- **Teclado**: flechas mueven el foco por el grid (cambia de mes al cruzar el
  borde), `PageUp`/`PageDown` = ±mes, `Enter` / `Espacio` selecciona. Tabindex
  rovering (solo la celda enfocada es tabbable).

## Tokens

| Rol | Token |
|---|---|
| Texto celda default | `semantic/color/text/primary` |
| Texto hoy | `semantic/color/text/brand` |
| Texto seleccionado | `semantic/color/text/onBrand` |
| Texto disabled | `semantic/color/text/disabled` |
| Texto días de otro mes | `semantic/color/text/tertiary` |
| Fondo seleccionado | `semantic/color/bg/brand` |
| Borde hoy | `semantic/color/border/brand` (disabled → `border/disabled`) |
| Overlay pressed / disabled | `semantic/color/state/{pressed,disabled}` |
| Chevron menu button | `semantic/color/icon/secondary` (disabled → `icon/disabled`) |
| Card | `bg/surface` · `containers/radius-200` · `Elevation/elevation-2` · padding `componentSpacing/space-200` |
| Celda día | 48×48 (sm) / 40×40 (xs) · círculo `sectionSpacing/space-500` (40) / 32 · `circular-items/radius-round` |
| Menu button | h40 · px `internalLayout/space-150` · gap `internalLayout/space-100` · `Body/lg-semiemphasized` |
| Nav ‹ › | `IconButton` ghost `sm` (ícono 16, `controls/radius-125`) |

## Accesibilidad

- `role="grid"` en el grid, `role="row"` por semana, `aria-selected` en la celda
  elegida, `aria-current="date"` en hoy, `aria-label` por celda con la fecha
  completa localizada.
- `selected` distinguible por forma (círculo relleno) además de color.
- `disabled` claramente no interactuable (`<button disabled>` nativo).

> Referencia: [Calipso 2.0 — components_calendar](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2498-16106)
> · building blocks: [cell_day](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2497-14709) ·
> [cell_year](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2498-21147) ·
> [menu_button](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2498-15119)
