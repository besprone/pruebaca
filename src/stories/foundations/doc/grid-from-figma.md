## Objetivo del grid

El sistema de grid en Calipso define como se organizan los layouts en App y Web para mantener consistencia, escalabilidad, ritmo visual y accesibilidad.

## Definicion del sistema

Calipso usa dos niveles:

- Grid del sistema (`mobile/*`, `tablet/*`, `desktop/*`) para columnas, margin y gutter.
- Grid interno de componentes (`internalLayout/*`, `componentSpacing/*`, `sectionSpacing/*`) para spacing dentro de componentes/secciones.

## Grid por dispositivo

- **Mobile**: `mobile/columns` = 4, `mobile/margin` = 16, `mobile/gutter` = 16, breakpoint `0-599px`.
- **Tablet**: `tablet/columns` = 8, `tablet/margin` = 24, `tablet/gutter` = 24, breakpoint `600-1023px`.
- **Desktop**: `desktop/columns` = 12, `desktop/margin` = 40, `desktop/gutter` = 24, breakpoint `1024px+`.

## Contrato de tokens

No existen tokens `grid/*` dedicados. El contrato oficial para grid se compone de:

- `mobile/columns`, `mobile/margin`, `mobile/gutter`
- `tablet/columns`, `tablet/margin`, `tablet/gutter`
- `desktop/columns`, `desktop/margin`, `desktop/gutter`

## Buenas practicas

- Mantener gutters consistentes en todo el layout.
- Usar layout grid en frames/pantallas principales.
- Evitar paddings arbitrarios fuera de tokens.
- Mantener alineacion vertical y de columnas.

## Alcance

Incluye: layouts responsivos, columnas, margenes, gutters y breakpoints.  
No incluye: spacing interno (ya definido en spacing), tamanos de componentes, reglas tipograficas.

> Referencia del frame: [kubo.grid](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2104-5&t=fxj7jPnfPUSCumO3-1).
