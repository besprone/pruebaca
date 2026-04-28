## Objetivo

Layout define la estructura base de pantallas para App/Web: organiza posicion y ritmo espacial, sin definir componentes visuales.

## Alcance

Incluye:

- Estructura base de pantalla
- Safe areas
- Contenedor horizontal
- Ritmo vertical
- Agrupacion de secciones
- Tipos estructurales de layout

No incluye:

- Componentes visuales
- Patrones funcionales
- Grid web
- Estilos visuales (color, radius, elevation)

## Contrato de tokens nativos

Layout solo usa tokens semanticos `layout/*` (sin valores arbitrarios en px dentro de pantallas):

- `layout/container/inline`
- `layout/stack/inlineSm`
- `layout/stack/block`
- `layout/stack/section`
- `layout/content/bottomClearance`

## Reglas estructurales clave

- Solo un scroll root por pantalla.
- Elementos persistentes (header, bottom nav, sticky CTA) van fuera del `ScrollView`.
- Respetar safe area superior/inferior sin paddings manuales.
- Compensar contenido inferior con `layout/content/bottomClearance` cuando hay elementos fijos.

## Tipos de layout (referencia)

- `layout.screen.static`
- `layout.screen.scroll`
- `layout.screen.scrollWithStickyCTA`
- `layout.screen.scrollWithBottomNavigation`
- `layout.screen.scrollWithStickyHeader`
- `layout.screen.scrollWithBottomActions`

> Referencia del frame: [Layout App](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=3225-2346&t=fxj7jPnfPUSCumO3-1).
