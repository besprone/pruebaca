## Dropdown

Panel flotante de selección: despliega una lista de opciones sobre el contenido
para elegir uno o más valores. Figma: `components_dropdown` — solo se modela
**`step=1`** (el panel abierto); `step=0` (el trigger) vive en el componente que
lo instancia.

## Sub-componente

Normalmente el Dropdown se **instancia dentro de otro** — un `Select` web, un
combobox, un buscador. Se separa para mantener la atomicidad. Este panel **no**
gestiona:

- el trigger / campo que lo abre,
- el portal ni el posicionamiento respecto al viewport (si no hay espacio abajo,
  reposicionar arriba),
- la animación de apertura/cierre (en Figma hay steps de animación; son
  prácticos para el diseño, no se modelan aquí),
- el click-fuera para cerrar.

Todo eso lo pone el componente contenedor (se conectará al definir el Select web).

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `options` | `DropdownOption[]` | — | `{ value, label, icon?, searchText?, disabled? }` |
| `value` | `string` · `string[]` | — | selección |
| `multiple` | `boolean` | `false` | marca cada opción elegida; no "cierra" al elegir |
| `onSelect` | `(value: string) => void` | — | opción elegida |
| `searchable` | `boolean` | `false` | `type: search + list` — campo de búsqueda que filtra por texto |
| `searchPlaceholder` | `string` | `"Buscar"` | |
| `maxHeight` | `number` | `320` | alto máx. de la lista (px); más allá → scroll |
| `emptyMessage` | `ReactNode` | `"Sin resultados"` | filtro sin coincidencias |
| `aria-label` | `string` | — | **requerido**, nombra la lista |

Spread de `HTMLAttributes<HTMLDivElement>`.

## Anatomía / tokens

```
.dropdown           panel — bg/canvas · border/default · elevation-3 · radius 24 · padding 4
  .dropdown__search   (searchable) — bg/subtle · radius 16 · h 48 · ícono icon/brand · Body/lg
  .dropdown__list     role=listbox · overflow-y auto · scrollbar nativa oculta · radius 16
    .dropdown__option  [ícono 20] label [check] · Body/lg · text/secondary
    .dropdown__scrollbar  indicador propio (4px, bg/brand) — no interactivo
```

| Elemento | Token |
|---|---|
| Panel bg / borde / sombra | `bg/canvas` · `border/default` · `elevation-3` |
| Opción (texto) | `text/secondary` · `Body/lg` (16/24/500) |
| Opción resaltada (hover / teclado) | fondo `bg/subtle` |
| Opción seleccionada | texto `text/primary` + check `icon/brand` |
| Opción deshabilitada | `text/disabled` |
| Scrollbar (indicador) | `bg/brand` |
| Search: ícono / placeholder | `icon/brand` · `text/secondary` |

## Comportamiento

- **Teclado** (foco en el panel): `↑/↓` mueven el resaltado (saltan deshabilitadas
  y hacen `scrollIntoView`), `Home/End` a los extremos, `Enter` selecciona,
  `Escape` burbujea (lo cierra el contenedor). `role="listbox"` +
  `aria-activedescendant`; con `searchable` el foco real está en el input y `↑/↓`
  siguen moviendo el resaltado.
- **`scroll`**: cuando el contenido excede `maxHeight`, la lista scrollea y se
  muestra el **indicador propio** (`bg/brand`, 4px, a la derecha). La scrollbar
  nativa se oculta; el indicador **no** es interactivo (refleja la posición).
  Geometría del thumb = `clientHeight/scrollHeight` (mín. 24px), actualizada en
  `scroll` + `ResizeObserver`.
- Seleccionar llama a `onSelect(value)`; el contenedor actualiza `value` y (en
  single-select) cierra el panel.

## Reglas de uso

- Usar cuando las opciones no caben como radio/checkbox group visible.
- `searchable` cuando hay muchas opciones y buscar por texto ayuda.
- **No** usar para menos de ~5 opciones (preferir radio group o segmented control).

> Referencia: [Calipso 2.0 — components_dropdown](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4182-35533)
