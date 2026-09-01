## Switch

Control binario on/off que **aplica el cambio al instante**, sin confirmación.
Comunica el estado actual de una configuración persistente (notificaciones, modo
oscuro, biometría, ocultar saldo). Figma: `components_switch`.

Siempre debe acompañarse de un **label descriptivo**, con el label a la izquierda
y el switch a la derecha del row.

## Propiedades

| Prop | Default | |
|---|---|---|
| `checked` / `defaultChecked` / `onChange` | — | estado on/off; props nativas de `<input type="checkbox">` |
| `disabled` | `false` | no interactivo, atenuado |
| `aria-label` / `id` | — | requiere label asociado (`htmlFor` o `aria-label`) |

> Figma: **8 variantes** = `selected` (True/False) × `state` (enabled · hovered ·
> pressed · disabled). El `hovered` es la extensión web (capa de estado global).

## Anatomía

```
.switch               52×32 · <input type=checkbox role=switch> encima (hit ≥44px)
  .switch__track       pill 52×32 — color por on/off/disabled
  .switch__thumb        círculo 24px, se desplaza left↔right (transición de motion)
    .switch__state-layer  halo 40px detrás del thumb (hover/pressed)
```

Todo el estado visual se deriva por CSS de `:checked` / `:disabled` / `:hover` /
`:active` — sin estado en React, funciona igual controlado o no controlado.

## Tokens

| Rol | Token |
|---|---|
| Track on | `semantic/color/bg/brand` |
| Track off | `semantic/color/icon/tertiary` |
| Track disabled (on y off) | `semantic/color/bg/disabled` |
| Thumb on | `semantic/color/bg/surface` |
| Thumb off | `semantic/color/bg/canvas` |
| Thumb disabled | `semantic/color/icon/tertiary` |
| Halo hover / pressed | `semantic/color/state/{hover,pressed}` |
| Halo pressed sobre brand | `semantic/color/bg/brandSoft` |
| Radius | pill (`circular-items/radius-round`) |
| Transición | `linear-200` (motion) |

## Comportamiento

- Tap/click cambia el estado **inmediatamente**, con transición del thumb entre
  posiciones. El cambio se aplica al instante en el sistema.
- Si la acción puede fallar (requiere conexión), aplicar *optimistic update* y
  revertir con snackbar de error.

## Diferencia con checkbox

| Switch | Checkbox |
|---|---|
| Aplica el cambio al instante | Requiere acción posterior (guardar/continuar) |
| Estado activo/inactivo de una configuración persistente | Selección dentro de un formulario |

## Accesibilidad

- Hit area ≥ 44×44 (`.switch__input` se extiende ±6px en alto).
- `<input type="checkbox" role="switch">` → el estado se expone como
  `aria-checked`. Label asociado con `htmlFor`/`id` o `aria-label`.
- Tab para enfocar, Space para alternar (nativo).
- Contraste suficiente entre track y thumb en todos los estados.

> Referencia: [Calipso 2.0 — components_switch](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3812-4904)
