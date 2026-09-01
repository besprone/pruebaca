## Checkbox

Control de selección binaria para marcar/desmarcar una opción. Soporta estado
`indeterminate` para selección parcial (ej. "Seleccionar todo" en listas). Para
formularios, consentimientos y configuraciones.

**No incluye** el label (eso es un patrón: checkbox + label), ni la lógica de
consentimiento/validación, ni el mensaje de error (vive en el patrón de
formulario).

## Propiedades

- **type** (derivado de `checked` / `indeterminate`): `unselected` · `selected` ·
  `indeterminate`
- **state**: `default` · `hovered` · `pressed` · `disabled` (+ `error` solo en
  `unselected`)
- **error**: variante de error (borde/ícono en `icon/danger`)

> Figma: **13 variantes** = 3 type × 4 state + 1 (`unselected/error`).
> `hovered` se agregó para web (11 jun 2026). `focus` aún no está en Figma — se
> incluye un anillo `:focus-visible` como extensión web (accesibilidad de teclado).

## Anatomía

```
.checkbox            target táctil 48×48 · <input type=checkbox> transparente encima
  .checkbox__box     centrado
    .checkbox__content   40×40 · radius controls/radius-150 (12) · state layer
      <svg>          ícono 24×24 (color por currentColor)
```

Iconos (Carbon `@carbon/icons-react`, coinciden con los de Figma):

| type | ícono |
|---|---|
| unselected | `Checkbox` (cuadro con contorno) |
| selected | `CheckboxCheckedFilled` (`ic_checkbox_checked_filled`) |
| indeterminate | `CheckboxIndeterminateFilled` (`ic_checkbox_undeterminate_filled`) |

## Tokens

| Rol | Token |
|---|---|
| Ícono checked / indeterminate | `semantic/color/icon/brand` |
| Ícono unselected | `semantic/color/icon/secondary` |
| Ícono error | `semantic/color/icon/danger` |
| Ícono disabled | `semantic/color/icon/disabled` |
| State layer hover | `semantic/color/state/hover` |
| State layer pressed | `semantic/color/state/pressed` |
| Radius del state layer | `controls/radius-150` (12px) |
| Focus ring (extensión web) | `semantic/color/state/focusRing` |
| Caja | 48×48 target · 40×40 state layer · 24×24 ícono |

## Comportamiento

- **pressed** es transitorio (feedback al presionar); el cambio
  `selected`/`unselected` ocurre al soltar/tap. `pressed` no reemplaza a
  `selected`.
- **disabled**: sin interacción, distinguible del `default` sin depender solo del
  color (el ícono y el contorno también comunican).
- **indeterminate**: se refleja en la propiedad `input.indeterminate` del DOM y
  en `aria-checked="mixed"`. Solo para selección parcial real — no decorativo.
- Controlado (`checked` + `onChange`) o no controlado (`defaultChecked`).

## Accesibilidad

- Target táctil 48×48 (a nivel patrón, 44×44 mínimo recomendado).
- `selected` / `unselected` / `indeterminate` comunicables por lector de pantalla
  (`type="checkbox"` nativo + `aria-checked="mixed"` en indeterminate).
- No depender solo del color: ícono y forma distinguen los estados.
- Requiere `aria-label` (o un label asociado en el patrón checkbox + label).

> Referencia: [Calipso 2.0 — components_checkbox](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2524-28033)
