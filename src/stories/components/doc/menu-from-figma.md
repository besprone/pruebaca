## Menu

Contenedor vertical que agrupa `MenuItem`s navegables o accionables — opciones
contextuales dentro de sidebars, paneles de cuenta o menús desplegables.
Figma: `components_menu` + `_building_blocks_menu_item`.

## Uso

```tsx
const [sel, setSel] = useState('perfil');

<Menu aria-label="Cuenta">
  <MenuItem leading={<UserAvatar />} label="Mi perfil"      selected={sel === 'perfil'} onClick={() => setSel('perfil')} />
  <MenuItem leading={<Settings />}   label="Configuración"  selected={sel === 'config'} onClick={() => setSel('config')} />
  <MenuItem leading={<Logout />}     label="Cerrar sesión"  onClick={logout} />
</Menu>
```

`MenuItem` es un **building block interno** — se importa por ruta
(`components/Menu/MenuItem`) desde `Menu` o desde un componente que lo envuelva
(p. ej. el panel de `AvatarAction`). No se exporta del índice.

## `Menu` vs `List`

Visualmente parecidos, propósitos distintos:

- **`Menu`** → acciones / navegación contextual. `bg/surface`, gap 2px (aire, no
  divisor), radio 16, sin sombra (`elevation: flat` — montar sobre una
  superficie con elevación). Cada `MenuItem` es 48px (compacto).
- **`List`** → selección / exposición de **datos**. `segmented` con divisores
  `bg/subtle`, `size`/`distribution`, filas de 56–68px.

No usar `Menu` como sustituto de `List` para selección de datos.

## `Menu`

| Prop | | |
|---|---|---|
| `children` | `ReactNode` | `MenuItem`s |
| `aria-label` | `string` | nombra el `role="menu"` |
| `role` | `string` | sobreescribible (`listbox`, `menu`…) |

Solo agrupa: no gestiona `pressed` ni `selected` (viven en cada `MenuItem`);
sólo uno debe estar `selected` a la vez.

## `MenuItem` (building block)

| Prop | Valores | |
|---|---|---|
| `label` | `ReactNode` | Body/md-semiemphasized (14/20/**600**) · text/primary |
| `supporting` | `ReactNode` | Body/sm (12/17) · text/secondary |
| `leading` | `ReactNode` | icono ~20px · `icon/secondary` → `icon/brand` si `selected` |
| `trailing` | `ReactNode` | icono/acción ~24px · idem color |
| `selected` | `boolean` | fondo `bg/brandSoft`, iconos `icon/brand` |
| `disabled` | `boolean` | overlay `state/disabled` + texto/iconos `disabled` |
| `state` | `hovered` · `pressed` | fuerza el overlay (resaltado programático) |
| `expandable` / `expanded` | `boolean` | si `expandable` y no hay `trailing`, dibuja un chevron que rota 180° con `expanded` |

Resto de props → al `<button role="menuitem">`. Es 48px (padding 12/4), más
compacto que `ListItem` (16/12). Compone `ItemContent` (`size="md"`).

## Tokens

| Elemento | Token |
|---|---|
| Menu / item bg | `semantic/color/bg/surface` |
| Item seleccionado | `semantic/color/bg/brandSoft` |
| Radio (menu e item) | `containers/radius-200` (16) |
| Gap entre items | `internalLayout/space-25` (2) |
| Overlay hover / pressed / disabled | `semantic/color/state/{hover,pressed,disabled}` |
| Foco | `semantic/color/border/focus` |
| Label | `semantic/color/text/primary` |
| Supporting | `semantic/color/text/secondary` |
| Texto deshabilitado | `semantic/color/text/disabled` |
| Icono leading / trailing | `semantic/color/icon/secondary` → `semantic/color/icon/brand` (selected) / `semantic/color/icon/disabled` |
| Padding item | `internalLayout/space-150` (12) · `internalLayout/space-50` (4) |
| Gap leading↔content↔trailing | `internalLayout/space-100` (8) |

## Comportamiento

- Columna vertical de items con 2px de separación. El alto se adapta al número
  de items.
- `selected` → `bg/brandSoft` con transición `linear-200`. Overlays hover /
  pressed / disabled sobre `.menu-item__state::after`. `expanded` → el chevron
  rota con `linear-200`. `prefers-reduced-motion` → sin transición.

## Accesibilidad

- `Menu` → `role="menu"` (`aria-label`). Cada `MenuItem` → `<button
  role="menuitem">`; `expandable` añade `aria-expanded`; `selected` añade
  `aria-current`. El foco de teclado (roving, flechas) lo gestiona el
  componente que monta el menú flotante.
- Área táctil ≥ 44px (item de 48px).

## Reglas de uso

- Navegación contextual en paneles, sidebars o menús de cuenta.
- Con `elevation: flat`, montar sobre un contenedor que aporte elevación /
  separación visual.
- No usar como sustituto de `List` para selección de datos.

> Referencia: [Calipso 2.0 — components_menu](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4338-21007) ·
> [_building_blocks_menu_item](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4285-2193)
