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
- **`orientation="vertical"`** (rail colapsado): icono 24px en un pill 40×32
  `controls/radius-100` (fondo `bg/brandSoft` si `selected`) + label opcional
  (`showContent`) apilado y centrado. El badge se ancla en la esquina superior
  derecha del pill (`left 24 / top -4` en Figma).

**Overlay de estado (`hovered` | `pressed` | `disabled`)** — según orientación:

| | horizontal | vertical |
|---|---|---|
| hover / pressed / `state` | cubre toda la fila (radius 16) | **solo el pill del icono** (radius 8) |
| disabled | overlay `state/disabled` en toda la fila | **sin overlay** — solo atenúa icono + texto a `disabled` |

`expandable`/`expanded` → chevron que rota (provisional, pendiente del diseño de
submenús).

**Badge**: `<Badge semantic="error" variant="filled">` sin borde → círculo de
**19×19** (horizontal, `size="xs"`) / **16×16** (vertical, `size="xxs"`). El
`size="xs"` del `Badge` ganó un `min-height: 19px` para que un dígito quede
redondo y no como rectángulo alto.

## Comportamiento

- El toggle del header alterna `expanded` ↔ colapsado. En colapsado: 96px, solo
  iconos, section labels y footer label ocultos.
- El `IconButton` del header (toggle / X) y el del footer colapsado son
  `size="lg"` — caja 48×48, icono 24px, radius 12 (Figma
  `components_buttons_iconbutton` del rail).
- `logo` es un slot (`ReactNode`). En las stories se usa el lockup real
  `kubo.financiero` (Figma `brand_assets_kugo_logo` · type=primary /
  variant=original / size=sm · 131×16) con el wordmark en `currentColor`; en
  producción vendría del componente de marca del DS.
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
| Overlays | `semantic/color/state/{hover,pressed,disabled}` · foco `border/focus` (vertical: overlay solo en el pill; disabled sin overlay) |
| Badge | `semantic/color/bg/danger` · `semantic/color/text/onDanger` (Body/xs) · círculo 19/16 sin borde |
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
