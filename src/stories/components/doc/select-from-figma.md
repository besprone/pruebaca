## Select

Patrón de selección de un valor entre una lista finita de opciones. Dos
superficies según contexto — Figma: `pattern_select_bottom_sheet` (mobile/app)
+ `pattern_select_web` (tablet/desktop). Ambos son **puro ensamblaje**: no
introducen tokens ni estilos propios, reutilizan componentes ya construidos
(`TextField`, `BottomSheet`, `List`/`ListItem`, `Dropdown`).

No es un input real: en ninguna de las dos superficies se puede escribir
directo ni se abre el teclado — el campo solo dispara el panel de opciones
(bottom sheet o dropdown).

## `SelectBottomSheet` (mobile/app)

```tsx
<SelectBottomSheet
  label="País"
  helperText="Selecciona tu país de residencia"
  options={[{ value: 'mx', label: 'México' }, { value: 'us', label: 'Estados Unidos' }]}
  value={value}
  onChange={setValue}
/>
```

| Prop | Valores | |
|---|---|---|
| `label` / `helperText` / `error` / `disabled` | — | pasan directo a `TextField` |
| `options` | `{ value, label, disabled? }[]` | — |
| `value` / `onChange` | `string` / `(value) => void` | controlado — no hay modo no controlado |
| `sheetLabel` | `ReactNode` | título del `BottomSheet`; si se omite usa `label` |
| `placeholder` | `string` | texto cuando no hay valor (def. "Selecciona una opción") |

Composición: `TextField` (`readOnly`, `trailingIcon={<ChevronDown/>}`,
`showTrailing`) + `BottomSheet` (`showHandle`, sin `footer`) conteniendo un
`List type="segmented"` de `ListItem interactive` (`role="option"`,
`trailing={<Checkmark/>}` solo en la opción seleccionada). Elegir una opción
actualiza el valor y cierra el sheet automáticamente (el PDF deja abierta la
alternativa de "confirmar con action" — se optó por el auto-cierre, más
simple y ya cubre el caso de uso principal).

## `SelectWeb` (tablet/desktop)

```tsx
<SelectWeb
  label="País"
  options={[{ value: 'mx', label: 'México' }, { value: 'us', label: 'Estados Unidos' }]}
  value={value}
  onChange={setValue}
  searchable
/>
```

| Prop | Valores | |
|---|---|---|
| `label` / `helperText` / `error` / `disabled` | — | pasan directo a `TextField` |
| `options` | `DropdownOption[]` (mismo tipo de `Dropdown`) | — |
| `value` / `onChange` | `string` / `(value) => void` | controlado |
| `searchable` | `boolean` | pasa directo a `Dropdown` (campo de búsqueda arriba) |
| `placeholder` | `string` | — |

Composición: `TextField` (`readOnly`, `trailingIcon`, chevron que rota 180°
en `open`) + un panel `Dropdown` posicionado debajo — **mismo motor de
posicionamiento que `Tooltip`** (portal a `document.body` + `position:fixed`,
sin dependencias): mide el trigger con `getBoundingClientRect`, ancla el panel
`offset:4px` debajo, ancho igual al trigger, clamp horizontal al viewport,
reposiciona en scroll/resize. `Dropdown` (`components_dropdown`) documenta
explícitamente que el trigger/portal/posicionamiento/animación/click-fuera
son responsabilidad de quien lo monta — `SelectWeb` es exactamente ese
"quien lo monta".

`state: error` bloquea la apertura (el propio PDF: "dropdown no se
despliega"); `SelectBottomSheet` no tiene esta regla en su PDF y se dejó
abrible incluso en error (solo `disabled` bloquea ahí).

## Dos bugs reales encontrados y corregidos (no de fidelidad con Figma — de
## lógica de composición)

> **1. El click que abre el panel NO puede vivir en `onFocus`.** Primer
> intento: abrir en `onFocus` del input, razonando que el contenedor de
> `TextField` ya redirige cualquier click (label, chevron) a `.focus()`, así
> que `onFocus` cubriría toda el área sin zonas muertas. Bug real: `BottomSheet`
> restaura el foco al trigger al cerrarse — si el trigger abre "on focus",
> ese foco restaurado reabre el sheet inmediatamente, en loop (el sheet nunca
> se veía cerrar). Fix: el click vive en un `<div>` que envuelve el
> `TextField`, no en `onFocus`.

> **2. Ese `<div onClick>` tampoco puede envolver el panel que abre.** Segundo
> intento (ya sin `onFocus`): el `onClick` vivía en el `<div>` que envolvía
> TANTO el `TextField` como el `BottomSheet`/`Dropdown` hijos. Bug real:
> elegir una opción (dentro del panel) hace bubble del evento click hasta ese
> mismo `onClick`, que vuelve a abrir el panel justo después de que la
> selección lo cierra — mismo síntoma (nunca se cierra), causa distinta:
>   - En `SelectBottomSheet`, `BottomSheet` **no usa portal** — renderiza
>     inline en el árbol de React, así que el bubble es DOM normal.
>   - En `SelectWeb`, el panel SÍ está en un `createPortal(..., document.body)`
>     — pero React sigue burbujeando los eventos de un portal por el **árbol
>     de React** (el componente que llama `createPortal`), no por el árbol
>     del DOM. Aunque el panel viva en otro lugar del DOM, un `onClick` en el
>     componente que lo porta sigue recibiendo esos clicks.
>
> Fix en ambos: el `onClick` que abre vive en un `<div>` que envuelve **solo**
> el `TextField` (`.select-bottom-sheet__trigger` / `.select-web__trigger`),
> nunca en un ancestro compartido con el panel de opciones.

## `TextField`: nuevo prop `trailingIcon` + `placeholder` ya no bloqueado

Este patrón necesitó dos extensiones a `TextField` (base para 13+
consumidores existentes, ambas 100% retrocompatibles):

- `trailingIcon?: ReactNode` — reemplaza el trailing por defecto
  (botón de limpiar / warning de error) con un ícono estático propio (el
  chevron). Tiene prioridad sobre `error`/`onClear` cuando se pasa.
  **Bug encontrado de paso:** `.text-field__trailing-icon` tenía el color
  rojo (`icon/dangerStrong`) puesto directamente en la clase base, no en un
  modificador — funcionaba porque antes solo se usaba para el ícono de
  warning. Al reusar la misma clase para el chevron, salía rojo también.
  Fix: el color rojo se movió a `.text-field__trailing-icon--danger`
  (aplicado solo en el caso de warning), la clase base quedó neutral
  (`icon/secondary`).
- `placeholder` ya no está en el `Omit` de `TextFieldProps` — antes
  `TextField` lo hardcodeaba a `" "` (un espacio, truco para que
  `:placeholder-shown` detecte "vacío" sin mostrar texto visible). Ahora
  acepta un placeholder real (con default `" "` si no se pasa) — el
  mecanismo de floating-label solo depende de si el valor está vacío, no del
  contenido del placeholder, así que esto no cambia nada para los
  consumidores existentes.

## Relación con otros componentes

- `TextField`: trigger visual en ambas superficies (no editable).
- `BottomSheet` + `List`/`ListItem`: superficie de opciones en mobile/app.
- `Dropdown`: panel de opciones en tablet/desktop — `SelectWeb` es el
  "contenedor" que Dropdown esperaba desde que se construyó (ver su propio
  doc: "normalmente se instancia dentro de un Select/combobox").
- No se creó un componente `Select` único con detección de viewport interna
  — cada superficie es un componente aparte, consistente con cómo este
  sistema ya separa `BottomSheet`/`Dialog`/`SideDrawer` en vez de un solo
  "Modal" con prop de superficie. El consumidor elige cuál renderizar según
  su propio breakpoint.

> Referencia: [Calipso 2.0 — pattern_select_bottom_sheet](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2553-41208) · [pattern_select_web](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4182-10414)
