## Objetivo

El sistema de spacing define separación y agrupación para App/Web con una escala única y consistente.

## Escala

Tokens de spacing (px):

- `internalLayout/space-0` (0)
- `internalLayout/space-25` (2)
- `internalLayout/space-50` (4)
- `internalLayout/space-75` (6)
- `internalLayout/space-100` (8)
- `internalLayout/space-125` (10)
- `internalLayout/space-150` (12)
- `componentSpacing/space-200` (16)
- `componentSpacing/space-300` (24)
- `sectionSpacing/space-400` (32)
- `sectionSpacing/space-500` (40)
- `sectionSpacing/space-600` (48)

## Uso por intención

- `internalLayout/*`: padding interno y micro-separaciones.
- `componentSpacing/*`: separación entre componentes de un mismo bloque.
- `sectionSpacing/*`: separación entre secciones de alto nivel.

## Buenas prácticas

- Usar solo tokens definidos (no `13px`, `22px`, etc.).
- Mantener consistencia entre pantallas similares.
- Ajustar densidad cambiando token, no con valores libres.

## Alcance

Incluye: margin, padding, gap y separación horizontal/vertical.  
No incluye: ancho/alto de componentes, grid y breakpoints.

> Referencia del frame: [kubo.spacing](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2085-949).
