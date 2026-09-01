## Password Field

Campo especializado para capturar o crear contraseñas. Extiende la estructura de
`TextField` (label flotante, helper, estados base) y agrega:

- **Toggle de visibilidad** (show/hide) — `IconButton` ghost con ícono `View` /
  `ViewOff` (`components_buttons_iconbutton`).
- **Representación protegida del valor** — `PasswordDots`
  (`_building_blocks_password_dots`) cuando `visibility = hidden`.

### Componentes

- **`PasswordField`** — el campo (`components_password_field`).
- **`PasswordDots`** — building block, fila de dots circulares.

## Alcance

Incluye: contenedor, label, placeholder, input visible, valor oculto por dots,
helper, toggle mostrar/ocultar, estados (enabled, focused, error, hovered,
pressed, disabled) y modo de visibilidad (visible, hidden).

No incluye: reglas de negocio de contraseña, checklist de fortaleza, confirmación
entre dos campos, flujo de reset/creación. Para OTP/PIN usar `OtpInput`.

## Propiedades (`PasswordField`)

| Prop | Default | |
|---|---|---|
| `label` | — | requerido, persistente |
| `helperText` | — | guía breve / error accionable |
| `placeholder` | — | opcional; si se define, el label queda flotado |
| `error` | `false` | borde `border/danger`, textos en `text/danger`, trailing → ícono warning |
| `disabled` | `false` | |
| `showToggle` | `true` | muestra el toggle; en `error` se sustituye por el ícono warning |
| `visible` / `defaultVisible` / `onVisibilityChange` | `false` | visibilidad del valor |
| `value` / `defaultValue` / `onChange` | — | props nativas de `<input>` |

> Figma: **36 variantes** = 3 text configuration (`label` / `placeholder` /
> `input`) × 6 state × 2 visibility. `style=filled` y `size=medium` únicos.

## Anatomía

```
.password-field                col + gap helper
  .password-field__container     bg subtle · borde · radius-200 · overflow hidden
    .password-field__state       overlay de estado · fila (field · trailing)
      .password-field__field     label flotante + valor  (input colapsa a h:0 sin flotar)
        label.password-field__label
        .password-field__value   relative
          input.password-field__input   type text|password
          .password-field__dots         PasswordDots (overlay, aria-hidden) si hidden + valor
      .password-field__trailing  IconButton toggle  ·  o ícono warning en error
  .password-field__helper        texto de ayuda / error
```

## Tokens

| Rol | Token |
|---|---|
| Fondo | `semantic/color/bg/subtle` |
| Borde default | `semantic/color/bg/subtle` (invisible) |
| Borde focus | `semantic/color/border/focus` |
| Borde error | `semantic/color/border/danger` |
| Label default / focus / error | `text/secondary` → `text/primary` / `text/danger` |
| Input text | `semantic/color/text/primary` |
| Placeholder | `semantic/color/text/tertiary` |
| Helper default / error | `text/secondary` / `text/danger` |
| Disabled (texto/ícono) | `text/disabled` / `icon/disabled` |
| Ícono toggle | `semantic/color/icon/brand` (vía `IconButton` ghost) |
| Ícono error | `semantic/color/icon/dangerStrong` |
| Overlays hover / focus / pressed / disabled | `semantic/color/state/*` |
| Password dots | `semantic/color/icon/primary` · 8px · `circular-items/radius-round` · gap `internalLayout/space-50` |
| Radius | `containers/radius-200` (16) |
| Padding state | pl `componentSpacing/space-200` (16) · pr/py `internalLayout/space-50` (4) · gap `space-25` (2) |
| Tipografía | Body/lg (16/24) valor · Body/sm (12/17) label flotado + helper |

## Comportamiento

- **Focus**: entra en `focused`, aparece el caret, borde `border/focus`.
- **Visibilidad**: `hidden` → `<input type="password">` (semántica para lectores
  de pantalla) con bullets nativos ocultos (`color: transparent`) y `PasswordDots`
  pintados encima. `visible` → `<input type="text">` con el valor en claro. El
  toggle alterna ambos y devuelve el foco al input.
- **Trailing**: solo para mostrar/ocultar. En `error` se reemplaza por el ícono
  de advertencia (no interactivo).
- **Error**: cuando la contraseña es inválida o falta; convive con `helperText`;
  el mensaje debe indicar qué corregir.
- El toggle no recibe foco por tab (`tabIndex={-1}`) — la acción es visual, el
  valor se sigue capturando en el input.

## Accesibilidad

- Label persistente (no depender del placeholder).
- Error perceptible sin depender solo del color (`aria-invalid` + helper).
- El toggle anuncia su acción: "Mostrar contraseña" / "Ocultar contraseña"
  (`aria-label` + `aria-pressed`).
- Los `PasswordDots` son `aria-hidden` — el lector de pantalla no lee dot por dot;
  la semántica de "protegido" la da `type="password"`.

> Referencia: [Calipso 2.0 — components_password_field](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3409-8439)
