## Objetivo del sistema de radius

Definir redondeo consistente para App/Web, evitando decisiones arbitrarias y facilitando reutilización de componentes.

## Principios

- El radius se consume por tokens, no por valores manuales.
- Componentes equivalentes usan el mismo token.
- El radius no cambia por breakpoint.
- Radius define contención visual, no jerarquía.

## Escala actual

- `radius-0` = 0
- `small items/radius-50` = 4
- `controls/radius-100` = 8
- `controls/radius-125` = 10
- `controls/radius-150` = 12
- `containers/radius-200` = 16
- `containers/radius-300` = 24
- `circular items/radius-round` = 9999

## Uso por intención

- `small items/*`: badges/chips/labels.
- `controls/*`: controles interactivos.
- `containers/*`: contenedores/campos/superficies.
- `circular items/*`: elementos que deben permanecer circulares.

## Buenas prácticas

✅ Usar siempre tokens de radius.  
✅ Mantener el mismo radius en componentes del mismo nivel.  
✅ Usar `radius-round` solo en elementos realmente circulares.

❌ No usar valores arbitrarios.  
❌ No mezclar radios sin intención en un mismo componente.  
❌ No usar radius para indicar estado.

## Alcance

Incluye: border radius y shape de contenedores/componentes.  
No incluye: sombras, estados, tamaños de componente.

> Referencia: [kubo.radius](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2099-3).
