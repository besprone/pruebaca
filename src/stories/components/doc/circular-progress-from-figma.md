## CircularProgress

Indicador de progreso circular. Figma: `components_circular_progress`.
**No es interactivo.** Hermano de `LinearProgress` (misma API `value` /
`indeterminate`); agrupados en Storybook bajo `Components/Progress/*`.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `value` | `0`–100 (se recorta) | `0` | progreso. Ignorado si `indeterminate` |
| `indeterminate` | `boolean` | `false` | avance desconocido: anillo que gira |
| `size` | `xs` (16) · `sm` (20) · `md` (24) | `sm` | diámetro en px |
| `aria-label` | `string` | `"Cargando"` | contexto para lectores de pantalla |

> `<svg role="progressbar">` con `aria-valuemin/max/now` (`now` ausente si
> `indeterminate`). Spread de `SVGAttributes`.

La spec de Figma cubría sólo el modo **indeterminate**; `value` (determinate) es
extensión del DS, espejo de `LinearProgress` y documentada como consistente con
ese hermano.

## Anatomía

`viewBox="0 0 24 24"`, dos `<circle>` cx=cy=12 r=10.5 stroke-width=3.

```
.circular-progress          <svg> — gira sólo si data-indeterminate
  .circular-progress__track  anillo base — stroke bg/subtle
  .circular-progress__arc    arco activo — stroke bg/brand, stroke-linecap round,
                             pathLength=100 (dasharray/offset en unidades 0–100)
```

- **determinate:** arco rotado −90° (arranca a las 12), `stroke-dashoffset = 100 − value`, transición `linear-200`.
- **indeterminate:** el `<svg>` rota 360° + el arco varía su `stroke-dasharray` en bucle (ciclo 4 × `linear-200` = 800ms).

## Tokens

| Rol | Token |
|---|---|
| Track | `semantic/color/bg/subtle` |
| Arco | `semantic/color/bg/brand` |
| Grosor | `stroke-width: 3` (fijo) |
| Motion | `linear-200` |

## Comportamiento

- El valor lo controla producto/desarrollo (sin lógica interna).
- `prefers-reduced-motion: reduce` → la animación indeterminate se pausa; el
  arco determinate no transiciona.
- Usado como spinner de carga en `Button` / `IconButton` (`isLoading` →
  `<CircularProgress indeterminate />`).

## Reglas de uso

- Usar cuando el sistema procesa una acción continua, en contexto claro.
- No sustituye a un loader cuando la acción es instantánea.
- No usar como decoración. No sobrescribir color ni grosor por instancia.

> Referencia: [Calipso 2.0 — components_circular_progress](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0)
