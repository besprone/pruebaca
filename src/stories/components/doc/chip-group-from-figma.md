## Chip group

Grupo de `FilterChip` en una sola fila horizontal, **single-select**: siempre hay
exactamente 1 chip seleccionado. Control rápido de navegación / filtro.

Figma: `components_chip_group` (componente público). No agrega tokens propios.

## Propiedades

| Prop | Default | |
|---|---|---|
| `options` | — | `{ value, label, leading?, disabled? }[]` |
| `value` / `defaultValue` / `onChange` | — | valor seleccionado (string) |
| `disabled` | `false` | deshabilita todo el grupo |
| `aria-label` | — | etiqueta accesible del grupo |

Si no se pasa `defaultValue`, arranca en el primer `option` habilitado.

## Comportamiento

- **Single-select obligatorio**: siempre exactamente 1 chip seleccionado.
- Al tap en otro chip: el nuevo pasa a `selected`, el anterior se deselecciona.
- **No permite toggle-off** — tap en el chip ya seleccionado no hace nada.
- **No wrap**: una sola fila. Si no cabe, hace **scroll horizontal**
  (scrollbar oculta).
- **Teclado**: `role="radiogroup"`; los chips son `role="radio"` con
  `aria-checked`. Flechas `←`/`→` (y `↑`/`↓`) mueven la selección entre chips
  habilitados (con wrap). Tabindex rovering — solo el chip seleccionado es
  tabbable.

## Estructura

```
.chip-group  role=radiogroup · flex · gap space-100 · nowrap · overflow-x auto
  FilterChip  role=radio · aria-checked · selected · (n instancias)
```

## Cuándo usarlo

Pocas categorías, el usuario alterna seguido, el cambio debe ser rápido y visible,
la selección controla una vista/sección o filtro simple.

**Evitar** cuando: se requiere multi-select (usar `FilterChip` sueltos o
checklist), hay muchas opciones (list en bottom sheet), o hay que explicar las
opciones (list con supporting text).

## Accesibilidad

- `selected` vs `unselected` con contraste suficiente (superficie, no solo color).
- Lector de pantalla: anuncia cada chip como filtro/categoría, su estado
  (seleccionado / no seleccionado) y, opcionalmente, su posición.

> Referencia: [Calipso 2.0 — components_chip_group](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2509-25023)
