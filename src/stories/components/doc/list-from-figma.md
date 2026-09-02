## List

Contenedor vertical que agrupa filas (`ListItem`) para navegación, selección o
exposición estructurada de información. Figma: `components_lists` +
`_building_blocks_list_item`.

## Uso

```tsx
<List type="segmented" size="sm" aria-label="Cuentas">
  <ListItem
    leading={<Wallet />}
    label="Cuenta de ahorro"
    supporting="$12,480.00"
    trailing={<ChevronRight />}
    interactive
  />
  {/* … */}
</List>
```

`ListItem` es un **building block interno**: se importa por ruta
(`components/List/ListItem`) desde `List` o desde componentes que lo envuelvan
(Select, Dropdown, hojas de filtro…). No se exporta desde el índice.

## El radio lo pone el padre

El `ListItem` **no tiene `border-radius`**. Cuando `List` es `type="segmented"`
con `radius` (default), el contenedor recorta (`overflow: clip`) las esquinas
de los items a `containers/radius-200` (16px). Por eso un `ListItem` suelto se
ve redondeado dentro de un `List` y con esquinas rectas fuera de él.

## `List`

| Prop | Valores | Default | |
|---|---|---|---|
| `type` | `segmented` · `standard` | `segmented` | `segmented` = tarjeta con divisores de 2px; `standard` = filas planas, sin divisores |
| `radius` | `boolean` | `true` | redondea el grupo (solo `segmented`) |
| `size` | `sm` · `md` | `sm` | `sm` → items `layout="stacked"`; `md` → `layout="horizontal"` |
| `children` | `ReactNode` | — | `ListItem`s |
| `role` | `string` | `list` | sobreescribible (`listbox`, `menu`, `presentation`…) |

`size` publica el `layout` a los items vía contexto; cada `ListItem` puede
sobreescribirlo con su prop `layout`.

**segmented** aplica `background: bg/subtle` y `gap: 2px`: los 2px revelan el
`bg/subtle` entre items `bg/surface` = el divisor. **standard** usa `gap: 0`.

## `ListItem`

| Prop | Valores | |
|---|---|---|
| `label` | `ReactNode` | texto principal (Body/lg · text/primary) |
| `supporting` | `ReactNode` | texto secundario (Body/md stacked · Body/lg horizontal · text/secondary) |
| `leading` | `ReactNode` | slot izquierdo — icono ~20px (`icon/secondary`) |
| `trailing` | `ReactNode` | slot derecho — icono/acción ~24px (`icon/brand`): chevron, checkbox, radio, checkmark… |
| `selected` | `boolean` | fondo `bg/brandSoft` |
| `disabled` | `boolean` | atenúa texto/iconos + bloquea interacción |
| `state` | `hovered` · `pressed` | fuerza el overlay (resaltado programático; si no, `:hover`/`:active` naturales) |
| `layout` | `stacked` · `horizontal` | sobreescribe el heredado de `List` |
| `interactive` | `boolean` | renderiza `<button>` en vez de `<div role="listitem">` |

Resto de props → al elemento (`onClick`, `role`, `aria-*`, `href` vía wrapper…).
El estado semántico (`role="option"`+`aria-selected`, `role="radio"`+`aria-checked`,
checkbox para multi-selección) lo pone el componente que lo instancia.

## Anatomía / dimensiones

```
.list-item                 min-h 56 · bg/surface (brandSoft si selected) · overflow: clip · SIN radio
  .list-item__state          capa de overlay (::after) — hover/pressed/disabled
    .list-item__container      padding 16/12 · gap 12 · flex row · items-center
      .list-item__leading        icono 20px
      .list-item__content        stacked: columna (label + supporting, sin gap → 24+20=44)
                                 horizontal: fila, gap 16 (label y supporting comparten ancho)
      .list-item__trailing       icono 24px
```

- stacked con `supporting` ≈ 68px de alto; sin `supporting` ≈ 56px.
- horizontal ≈ 56px (contenido centrado verticalmente).

## Tokens

| Elemento | Token |
|---|---|
| Fila bg | `semantic/color/bg/surface` |
| Fila seleccionada | `semantic/color/bg/brandSoft` |
| Divisor (segmented) | `semantic/color/bg/subtle` (gap 2px) |
| Radio del grupo | `containers/radius-200` (16px) |
| Overlay hover / pressed / disabled | `semantic/color/state/{hover,pressed,disabled}` |
| Label | `semantic/color/text/primary` · Body/lg (16/24/500) |
| Supporting | `semantic/color/text/secondary` · Body/md (14/20) stacked · Body/lg (16/24) horizontal |
| Texto deshabilitado | `semantic/color/text/disabled` |
| Icono leading / trailing | `semantic/color/icon/secondary` · `semantic/color/icon/brand` |
| Icono deshabilitado | `semantic/color/icon/disabled` |
| Padding fila | `componentSpacing/space-200` (16) · `internalLayout/space-150` (12) |
| Gap leading↔content↔trailing | `internalLayout/space-150` (12) |

## Motion

`motion/spring` en Figma para el cambio de `selected` y el overlay de pressed.
Al ser un cambio de color (no de posición) se aproxima con
`transition: background-color` sobre el token `linear-200` (200ms) en `.list-item`
y en `.list-item__state::after`. `prefers-reduced-motion: reduce` → sin transición.

## Accesibilidad

- El contenedor no describe el contenido: cada `ListItem` interactivo debe ser
  un elemento enfocable (`interactive` → `<button>`, o el consumidor pone `role`).
- Área táctil ≥ 44px (fila de 56–68px).
- El estado seleccionado no depende solo del color (`bg/brandSoft` + `aria-*`
  del consumidor + normalmente un control trailing).
- `disabled` → `aria-disabled` / `disabled`, sin foco ni interacción.

## Guías de uso

- `segmented` para settings, menús, catálogos, pasos — agrupación visual clara.
- `standard` cuando cada item es contenido complejo e independiente.
- No mezclar navegación (chevron) y selección (radio/checkbox) en la misma lista.
- `label` siempre presente; `supporting` solo si aporta valor.
- No usar para < ~3 items.

> Referencia: [Calipso 2.0 — components_lists](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2654-34738) ·
> [_building_blocks_list_item](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2508-11189)
