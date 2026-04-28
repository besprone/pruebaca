## Objetivo

Los gradientes se usan para superficies de **alta prominencia visual** (hero, CTA destacada, feature tour, contexto inverse).

## Importante: gradientes vs variables

En Figma, los gradientes están como **Color Styles** y no como variables nativas (limitación de plataforma).  
En este proyecto los exponemos como CSS variables para mantener consistencia en implementación.

Implementación recomendada en código: los stops del gradiente deben apuntar a `ref/color/*` (no hex hardcodeado), para heredar cambios de paleta automáticamente.

## Catálogo actual

| Token | Stops | Intención |
| --- | --- | --- |
| `semantic/gradient/bg/inverse` | `ref/color/neutral/900 20% → ref/color/neutral/700 100%` | Contexto inverse, fondos oscuros distintivos. |
| `semantic/gradient/bg/primary` | `ref/color/brand/700 20% → ref/color/brand/500 100%` | Prominencia brand principal. |
| `semantic/gradient/bg/accent` | `ref/color/accent/700 20% → ref/color/accent/500 100%` | Acento visual secundario. |

## Naming

`semantic/gradient/bg/{name}`

- `semantic`: capa de consumo
- `gradient`: tipo de token
- `bg`: uso en background
- `{name}`: `inverse`, `primary`, `accent`

## Cuándo usar

- Componentes o patrones que necesitan máxima jerarquía visual.
- Contextos inverse con fondo oscuro distintivo.
- Secciones promocionales / onboarding / feature highlight.

## Cuándo no usar

- Componentes de uso general (botones/inputs estándar).
- Pantallas con sobrecarga visual (muchos gradientes simultáneos).
- Contextos donde un color sólido ya resuelve jerarquía.

## Reglas prácticas

1. Máximo recomendado: **1-2 gradientes visibles por pantalla**.  
2. Mantener dirección **vertical** (top-to-bottom).  
3. Verificar contraste de texto/iconos sobre ambos extremos del gradiente (AA cuando aplique).  
4. En contextos inverse, alinear el contenedor padre al modo inverse para que texto/iconos semantic se resuelvan bien.

> Fuente de referencia: frame [kubo.gradients](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=3987-16467).
