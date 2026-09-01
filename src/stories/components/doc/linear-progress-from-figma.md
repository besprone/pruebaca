## LinearProgress

Indicador visual de progreso lineal. Figma: `components_linear_progress_indicator`.
Comunica el avance de una acción o proceso en curso. **No es interactivo.**

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `value` | `0`–100 | `0` | progreso; se recorta al rango. Ignorado si `indeterminate` |
| `indeterminate` | `boolean` | `false` | avance desconocido: barra animada en bucle |
| `aria-label` | `string` | — | contexto para lectores de pantalla |

> El `<div role="progressbar">` acepta `HTMLAttributes` (`id`, `className`, `style`…).
> `style` puede fijar el ancho del track; el **grosor y el color no se
> sobrescriben** por instancia (regla del componente).

En Figma el componente expone sólo la propiedad `value` con estados `0 / 50 / 100`.
`indeterminate` es una extensión del DS (documentada como "futura posible" en la
spec) — consistente con el hermano `CircularIndeterminateProgress`.

## Anatomía

```
.linear-progress         track — bg/subtle · radius controls/radius-100 (8px) ·
                         inline-size 100% · block-size 8px · overflow hidden
  .linear-progress__bar  barra activa — bg/brand · inline-size = value% ·
                         esquinas izquierdas redondeadas (la derecha la recorta
                         el track)
```

Sin capa de estado (no interactivo).

## Tokens

| Rol | Token |
|---|---|
| Track | `semantic/color/bg/subtle` |
| Barra activa | `semantic/color/bg/brand` |
| Radius | `controls/radius-100` (8px) |
| Alto | `8px` (fijo, no modificable en instancia) |
| Transición `value` | `linear-200` |

**Reglas (Figma):** no cambiar `brand` por accent/success/otro, no hex manual,
no `ref` directos, no alterar el grosor, no sombras ni efectos externos. El track
debe mantener contraste suficiente con la barra.

## Comportamiento

- El valor de progreso lo controla producto/desarrollo (no hay lógica interna).
- `value` anima el ancho con la curva de motion `linear-200`.
- `indeterminate` desliza una barra del 40% en bucle; con
  `prefers-reduced-motion: reduce` se detiene y muestra el track lleno.

## Reglas de uso

- Usar cuando el sistema procesa una acción continua, en contexto claro (no
  flotando sin explicación).
- No sustituye a un loader cuando la acción es instantánea.
- No usar como decoración.

> Referencia: [Calipso 2.0 — components_linear_progress_indicator](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4177-5886)
