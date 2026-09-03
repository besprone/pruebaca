## NavigationRail

Navegación lateral vertical para **tablet/desktop**. Panel fijo con header
(logo + toggle), secciones navegables con section label, avatar item opcional y
footer con logout. Figma: `components_navigation_rail` +
`_building_blocks_rail_navitem`.

**No usar en mobile** — para eso `NavigationBar`.

## Uso

```tsx
const [tab, setTab] = useState('inversiones');
const [expanded, setExpanded] = useState(true);

<NavigationRail
  aria-label="Navegación principal"
  logo={<KuboLogo />}
  value={tab}
  onChange={setTab}
  expanded={expanded}
  onExpandedChange={setExpanded}
  sections={[
    { label: 'General', items: [
      { value: 'inicio',      label: 'Inicio',      supporting: 'Resumen',      icon: <Dashboard />, badge: '3' },
      { value: 'inversiones', label: 'Inversiones', supporting: 'kubo.plazofijo', icon: <ChartLine /> },
    ]},
  ]}
  avatar={{ value: 'perfil', label: 'Marco Antonio', supporting: 'marco@kubo.mx', avatarProps: { type: 'img', src: photo } }}
  avatarLabel="Cuenta"
  footer={{ label: 'Cerrar sesión', onClick: logout }}
/>
```

## `NavigationRail`

| Prop | Valores | |
|---|---|---|
| `sections` | `RailSection[]` | máx. 3 · `{ label?, items: RailNavItemDef[] }` |
| `value` / `defaultValue` / `onChange` | | navitem seleccionado (uno a la vez en todo el rail) |
| `logo` | `ReactNode` | marca — visible solo en `expanded` |
| `avatar` | `RailNavItemDef` | navitem de avatar al final del contenido, antes del footer |
| `avatarLabel` | `string` | encabezado sobre el avatar (solo `expanded`) |
| `footer` | `{ label, icon?, onClick }` | acción de logout |
| `mode` | `rail` (default) · `overlay` | `rail` = panel fijo con toggle · `overlay` = panel deslizante con backdrop y X |
| `expanded` / `defaultExpanded` / `onExpandedChange` | `boolean` | 260px (con labels) ↔ 96px (solo iconos). `rail` mode |
| `onClose` | `() => void` | `overlay` mode — X / backdrop / Escape |
| `size` | `lg` (default) · `md` | `lg` = items con supporting · `md` = sin supporting |
| `compact` | `boolean` | items de menor alto (sin supporting) |

`RailNavItemDef`: `{ value, label, supporting?, icon?, avatarProps?, badge?, disabled?, expandable?, expanded?, onSelect? }`.

## `RailNavItem` (building block)

`<button>` con dos disposiciones:

- **`orientation="horizontal"`** (rail expandido): fila `leading` (icono 20px /
  `<Avatar sm>`) + `<ItemContent size="md">` (label 14/20/**600** · supporting
  12/17) + `badge` a la derecha. 48px (32 en `compact`). `selected` → fondo
  `bg/brandSoft` + icono `icon/brand`.
- **`orientation="vertical"`** (rail colapsado): icono 24px en un pill
  `controls/radius-100` (fondo `bg/brandSoft` si `selected`) + label opcional
  (`showContent`) apilado y centrado. El badge se ancla en la esquina superior
  derecha del icono.

`state` (`hovered` | `pressed`) fuerza el overlay. `disabled` → `state/disabled`
+ texto/iconos `disabled`. `expandable`/`expanded` → chevron que rota
(provisional, pendiente del diseño de submenús).

## Comportamiento

- El toggle del header alterna `expanded` ↔ colapsado. En colapsado: 96px, solo
  iconos, section labels y footer label ocultos.
- `mode="overlay"`: `position: fixed` sobre el contenido, backdrop
  `rgba(28,27,32,.4)`, X en el header; cierra con X, click en el backdrop o
  `Escape` (`onClose`). Siempre expandido.
- **Roving tabindex** sobre los navitems; `↑` / `↓` mueven el foco, `Home` /
  `End`; se navega con click / `Enter`.

## Tokens

| Elemento | Token |
|---|---|
| Panel bg / borde | `semantic/color/bg/surface` · `semantic/color/border/default` (1px interior) |
| Section label | `semantic/color/text/secondary` (Body/md) |
| Navitem seleccionado | `semantic/color/bg/brandSoft` |
| Icono / label seleccionado | `semantic/color/icon/brand` · (label queda `text/primary`, según Figma) |
| Icono / label reposo | `semantic/color/icon/secondary` · `semantic/color/text/primary` + `semantic/color/text/secondary` |
| Overlays | `semantic/color/state/{hover,pressed,disabled}` · foco `border/focus` |
| Badge | `semantic/color/bg/danger` · `semantic/color/text/onDanger` (Body/xs) |
| Footer / logout | `<Button emphasis="ghost">` · `text/brand` |
| Ancho | 260px (expanded) · 96px (colapsado) |

> El PDF dice `selected → text label: text/brand`, pero el código de Figma usa
> `text/primary` para el label. Se sigue el código de Figma (icono sí va a
> `icon/brand`).

## Reglas de uso

- Navegación principal en layouts tablet/desktop. **No en mobile.**
- Máx. 3 secciones con sus labels. Avatar al final del contenido, nunca dentro
  de una sección. El logout siempre en el footer.

> Referencia: [Calipso 2.0 — components_navigation_rail](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4294-52814) ·
> [_building_blocks_rail_navitem](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4299-4048)
