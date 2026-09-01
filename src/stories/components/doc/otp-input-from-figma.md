## OTP input

Patrón para capturar un código de verificación de N dígitos (típicamente 4 o 6).
Se compone de:

- **`OtpDigit`** — building block: un cuadro = un dígito. Figma:
  `_buildingblocks_otp_input`. No se usa aislado.
- **`OtpInput`** — orquestador. Figma: `components_otp_input` / `pattern_otp`.
  Instancia N `OtpDigit` y maneja la lógica.

## OtpDigit — building block

### Propiedades

- **size**: `sm` | `md`
- **state** (fuerza el estado, solo docs): `enabled` · `hovered` · `focused` ·
  `pressed` · `disabled` · `error`
- **text configuration** (derivado del valor): `empty` | `input`
- **error**: aplica borde + texto de error

> Figma: **24 variantes** = 6 state × 2 text configuration × 2 size.
> (La doc previa mencionaba 12; faltaba el eje `size`.)

### Anatomía

```
.otp-digit           shell — bg subtle · borde 2px · radius (por size) · overflow hidden
  .otp-digit__state  overlay de estado · padding · centrado
    .otp-digit__input  input transparente · dígito centrado (Headline)
```

### Tokens

| Rol | Token |
|---|---|
| Fondo | `semantic/color/bg/subtle` |
| Borde focus | `semantic/color/state/focusRing` (2px) |
| Borde error | `semantic/color/border/danger` (2px) |
| Texto dígito | `semantic/color/text/primary` |
| Texto disabled | `semantic/color/text/disabled` |
| Texto error | `semantic/color/text/danger` |
| Overlay hover / focus / pressed / disabled | `semantic/color/state/{hover,focus,pressed,disabled}` |
| Radius md / sm | `containers/radius-200` (16) / `controls/radius-150` (12) |
| Tipografía md / sm | Typography/Headline/sm (24/32) / Headline/xs (22/30) |
| Padding-x md / sm | `internalLayout/space-150` (12) / `space-125` (10) |
| Padding-y | `internalLayout/space-50` (4) |
| Caja md / sm | 48×56 / 36×48 |

### Estados visuales

- **enabled**: fondo neutro suave, sin borde. Listo para recibir input.
- **hovered** (solo web): overlay `state/hover`, sin cursor de texto activo.
- **focused**: borde `state/focusRing` + overlay `state/focus`. Solo un cuadro
  puede estar focused a la vez dentro de la secuencia.
- **pressed**: overlay `state/pressed` momentáneo al click/tap.
- **disabled**: overlay `state/disabled`, dígito atenuado, no interactivo.
- **error**: borde `border/danger`, dígito en `text/danger`. Se aplica a
  **todos** los cuadros cuando el código es incorrecto, no solo a uno.

## OtpInput — orquestador

### API

| Prop | Default | |
|---|---|---|
| `length` | `6` | nº de dígitos |
| `size` | `md` | `sm` \| `md` |
| `value` / `defaultValue` | — | string de dígitos, se rellena de izquierda a derecha |
| `onChange(value)` | — | en cada cambio |
| `onComplete(value)` | — | al llenarse todos los cuadros |
| `error` | `false` | estado error a todos los cuadros |
| `disabled` | `false` | |
| `autoFocus` | `false` | foca el primer cuadro al montar |
| `name` | — | emite un `<input type="hidden">` con el valor concatenado |

### Comportamiento

- **Auto-avance** al ingresar un dígito.
- **Backspace**: borra el cuadro actual; si está vacío, regresa al anterior y lo
  borra.
- **Delete**: borra el cuadro actual sin moverse.
- **Flechas** ← / →: navegación entre cuadros.
- **Paste** de un código completo: distribuye los dígitos desde el cuadro actual.
- **Autofill SMS** (mobile): `autocomplete="one-time-code"` en cada cuadro.
- **Validación**: `onComplete` se dispara al llenar todos los cuadros.
- **Error**: la prop `error` aplica el estado a todos los cuadros a la vez.
- Solo dígitos (`0-9`); cualquier otro carácter se descarta.

### Reglas de uso

✅ Usar siempre `OtpInput` (no `OtpDigit` suelto).
✅ Mantener consistencia de estado entre todos los cuadros.
✅ Aplicar `error` a todos los cuadros cuando la validación falla.
✅ Solo un cuadro en `focused` a la vez.

❌ No usar `OtpDigit` como input independiente fuera de una secuencia OTP.
❌ No mezclar estados entre cuadros (excepto `focused`, que es único).
❌ No modificar ancho/alto por caso individual.
❌ No capturar caracteres no numéricos sin documentar la excepción.

> Referencia: [Calipso 2.0 — _buildingblocks_otp_input](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4468-52598)
