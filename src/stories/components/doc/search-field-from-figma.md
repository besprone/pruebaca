## Search field

Campo de búsqueda compacto para app bars y superficies densas. Permite capturar
texto de búsqueda sin label persistente. Se apoya en placeholder y en el valor
ingresado como estado principal. Se usa como activador de búsqueda local (filtrar
listas) o búsqueda remota.

## Propiedades

- **variant** (`type` en Figma): `appbar` | `inContainer`
  - `appbar` — sin ícono leading; el app bar ya da el contexto de búsqueda.
  - `inContainer` — con lupa leading, para superficies densas.
- **text configuration** (derivado del valor): `placeholder` (vacío) | `input text` (con valor).
- **state**: `enabled` · `hovered` · `pressed` · `focused` · `disabled`.
- **placeholder text**: string. Ej: "Buscar inversiones".
- **onClear**: handler del botón de limpiar (×); visible solo con valor.

> Figma expone 20 variantes = 2 `type` × 2 text configuration × 5 state.
> (La doc previa mencionaba 8; faltaban `hovered` y el eje `type`.)

## Tokens usados

**Container**
- Background: `semantic/color/bg/subtle`
- Radius: `containers/radius-200` (16px)
- Border (solo focus): `semantic/color/border/focus`

**Texto** (Typography/Body/lg — 16/24/500)
- Input text: `semantic/color/text/primary`
- Placeholder: `semantic/color/text/secondary`
- Disabled: `semantic/color/text/disabled`

**Ícono leading** (solo `inContainer`, 20px = `size/20`)
- Enabled: `semantic/color/icon/secondary`
- Disabled: `semantic/color/icon/disabled`

**State layer** (overlays globales — no valores propios)
- Hover: `semantic/color/state/hover`
- Pressed: `semantic/color/state/pressed`
- Focus: `semantic/color/state/focus`
- Disabled: `semantic/color/state/disabled`

**Layout**
- Padding-x del state: `internalLayout/space-150` (12px)
- Gap icono/input/clear: `internalLayout/space-100` (8px)
- Alto mínimo: 48px

## Comportamiento

- Al comenzar a escribir, `placeholder` → `input text`.
- `enabled`: listo para interacción.
- `focused`: borde `border/focus` + overlay `state/focus`.
- `pressed` / `hovered`: overlay del token correspondiente.
- `disabled`: no editable, overlay `state/disabled`, texto e ícono desaturados.
- Botón de limpiar (×): aparece con `input text`, se oculta con el campo vacío
  (`:placeholder-shown ~ .search-field__clear`).
- En app bar suele convivir con: back (←) para cerrar/regresar (lo aporta el app
  bar, no el campo).

## Estructura interna

```
.search-field                 [data-variant] [data-disabled]
  .search-field__container      bg-subtle · radius-200 · borde focus · overflow hidden
    .search-field__state        overlay de estado · fila flex (48px min)
      .search-field__icon       lupa leading — solo inContainer
      input.search-field__input transparente · Body/lg
      .search-field__clear      IconButton ghost md (×)
```

Sin: label superior, helper text, resultados. La lista de resultados que aparece
en Figma bajo `inContainer / input text` es un componente aparte (menú/listbox),
fuera del alcance de este componente.

## Reglas de uso

- Úsalo dentro de app bar o áreas donde el label no cabe o estorba.
- Placeholder = acción + objeto ("Buscar inversiones", "Buscar movimientos").
  Evita placeholders genéricos ("Buscar…") si el contexto no es obvio.
- No lo uses para inputs de formulario (ahí va `components/TextField` con
  label/helper/validación).

## Accesibilidad

- No depender del placeholder como único label: exponer `aria-label` fijo
  ("Buscar inversiones").
- Foco visible (borde + overlay).
- Área táctil mínima cómoda (~48px de alto).
- Estados `disabled` con contraste suficiente (texto + background).

> Referencia: [Calipso 2.0 — component_search_field](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2753-17992)
