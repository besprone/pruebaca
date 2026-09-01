## Radio button

Control de selección única dentro de un grupo: el usuario elige **una** opción de
varias mutuamente excluyentes. Comparte estructura con `Checkbox` pero sin
`indeterminate` ni `error`.

**No incluye** el label (patrón aparte: radio + label), ni la lógica del grupo
(eso lo maneja el consumidor con un `name` compartido y `role="radiogroup"` en el
contenedor).

> El spec en PDF de este componente no estuvo accesible al construirlo; el
> componente se derivó de Figma + las convenciones compartidas con `Checkbox`
> (state layer consume tokens globales, target táctil, no depender solo del color,
> `pressed` transitorio).

## Propiedades

- **type** (derivado de `checked`): `unselected` · `selected`
- **state**: `default` · `hovered` · `pressed` · `disabled`
- Props nativas de `<input type="radio">`: `name` (agrupa), `value`, `checked` /
  `defaultChecked`, `onChange`, `disabled`, `aria-label`, …

> Figma: **8 variantes** = 2 type × 4 state. `hovered` es la extensión web (igual
> que `Checkbox`). `focus` no está en Figma — se incluye un `:focus-visible` ring.

## Anatomía

```
.radio             target táctil 48×48 · <input type=radio> transparente encima
  .radio__box      centrado
    .radio__content   40×40 · radius controls/radius-150 (12) · state layer
      .radio__icon    24×24 — off: RadioButton · on: RadioButtonChecked
```

Iconos de `@carbon/icons-react`, coinciden path-por-path con Figma:

| type | ícono |
|---|---|
| unselected | `RadioButton` (`ic_radio_button`) |
| selected | `RadioButtonChecked` (`ic_radio_button_checked`) |

El intercambio de ícono es **puro CSS** (`:has(.radio__input:checked)`) — sin
estado en React. Así funciona igual controlado o no controlado y los hermanos del
grupo se deseleccionan solos al elegir otro.

## Tokens

| Rol | Token |
|---|---|
| Ícono selected | `semantic/color/icon/brand` |
| Ícono unselected | `semantic/color/icon/secondary` |
| Ícono disabled | `semantic/color/icon/disabled` |
| State layer hover / pressed | `semantic/color/state/{hover,pressed}` |
| Radius del state layer | `controls/radius-150` (12px) |
| Focus ring (extensión web) | `semantic/color/state/focusRing` |
| Caja | 48×48 target · 40×40 state layer · 24×24 ícono |

## Comportamiento

- `pressed` es transitorio (feedback al presionar); la selección ocurre al
  soltar/tap.
- `disabled`: sin interacción, distinguible del `default` (ícono y forma también
  comunican, no solo color).
- La selección única la garantiza el `name` compartido del `<input type="radio">`
  nativo.

## Accesibilidad

- Target táctil 48×48 (44×44 mínimo recomendado a nivel patrón).
- `<input type="radio">` nativo → el estado es comunicable por lector de pantalla.
- Contenedor del grupo con `role="radiogroup"` + `aria-label`.
- Requiere `aria-label` en cada radio (o un label asociado en el patrón
  radio + label).

> Referencia: [Calipso 2.0 — components_radiobutton](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2524-28176)
