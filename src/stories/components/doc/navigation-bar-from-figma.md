## NavigationBar

Barra de **navegación principal**: organiza 3–5 secciones navegables en fila y
controla cuál está activa. Figma: `components_navigation_bar`. Un solo item
activo a la vez; el estado lo posee la barra.

## Uso

```tsx
const [tab, setTab] = useState('inicio');

<NavigationBar
  aria-label="Navegación principal"
  value={tab}
  onChange={setTab}
  items={[
    { value: 'inicio',    label: 'Inicio',    icon: <Home /> },
    { value: 'inversion', label: 'Inversión', icon: <Analytics /> },
    { value: 'credito',   label: 'Crédito',   icon: <Money /> },
    { value: 'perfil',    label: 'Perfil', type: 'avatar', avatar: <img src={photo} />, 'aria-label': 'Tu perfil' },
  ]}
/>
```

`value` / `defaultValue` / `onChange` siguen el patrón de `ChipGroup`
(controlado u no controlado). El posicionamiento en pantalla —fijar al borde
inferior, safe-area del dispositivo— es responsabilidad del contenedor; ver la
story **En contexto**.

## Propiedades

### `NavigationBar`

| Prop | Valores | Default | |
|---|---|---|---|
| `items` | `NavigationBarItemDef[]` | — | 3–5 items |
| `value` | `string` | — | selección controlada |
| `defaultValue` | `string` | primer item navegable | selección inicial no controlada |
| `onChange` | `(value: string) => void` | — | se llama con el `value` del item navegable activado |
| `border` | `top` · `bottom` | `top` | borde de separación (`top` = nav inferior, `bottom` = nav superior) |
| `aria-label` | `string` | `Navegación principal` | nombre accesible del `<nav>` |

### `NavigationBarItemDef`

| Campo | Valores | |
|---|---|---|
| `value` | `string` | id único / valor de selección |
| `label` | `string` | texto bajo el icono |
| `icon` | `ReactNode` | glifo 24px (`icon`, `emphasis`) |
| `avatar` | `ReactNode` | imagen de perfil (`type: 'avatar'`) |
| `type` | `icon` · `avatar` · `emphasis` | default `icon` |
| `aria-label` | `string` | nombre accesible si el item no tiene `label` |
| `onSelect` | `() => void` | se dispara al activar (después de cambiar selección, si aplica) |
| `disabled` | `boolean` | |

**`type: 'emphasis'`** — acción destacada (círculo `bg/brand` con icono
`onBrand` + label debajo, igual que los demás). **No es navegable**: no cambia
la selección ni recibe indicador; solo dispara su `onSelect`. Patrón de botón
central (escanear, pagar).

## Anatomía

```
.nav-bar                <nav> fila — bg/surface + borde (top | bottom), max-h 71, padding-block 4
  .nav-bar__pill          indicador brandSoft 40×32, radius 8 — se desliza al item activo
  .nav-bar-item ·N        NavigationBarItem (building block), flex: 1 1 0
    .nav-bar-item__icon     contenedor del glifo — padding 4/8, radius 8
    .nav-bar-item__label    Body/sm-semiemphasized (12/17/600), 1 línea, ellipsis
```

El **indicador es un único elemento**, no parte del navitem: así puede
deslizarse entre items. Los navitems solo recolorean icono + label
(`icon/brand` + `text/brand` activos, `icon/secondary` + `text/secondary` en
reposo).

## Tokens

| Elemento | Token |
|---|---|
| Container bg | `semantic/color/bg/surface` |
| Container borde | `semantic/color/border/subtle` (1px) |
| Indicador (pill) | `semantic/color/bg/brandSoft` · `controls/radius-100` |
| Icono / label activo | `semantic/color/icon/brand` · `semantic/color/text/brand` |
| Icono / label reposo | `semantic/color/icon/secondary` · `semantic/color/text/secondary` |
| Emphasis círculo | `semantic/color/bg/brand` · `semantic/color/icon/onBrand` · `circular items/radius-round` |
| Padding icono | `internalLayout/space-50` `internalLayout/space-100` |
| Gap icono↔label | `internalLayout/space-25` |

## Motion

`motion/spring` (`stiffness: 100`, `damping: 15`, `mass: 1` → ζ≈0.75, ligero
overshoot). El indicador se anima con un **integrador de muelle propio** (rAF,
sub-pasos de Euler, sin dependencias) sobre su posición `left`. No se anima en el
primer render. `prefers-reduced-motion: reduce` → salto directo, sin animación.

## Accesibilidad

- `<nav aria-label>` + `<button>` por item; el activo lleva `aria-current="page"`.
- Área táctil ≥ 44×44 (barra de 71px de alto; cada item `flex: 1 1 0`).
- El estado activo no depende solo del color (indicador + `aria-current`).
- Navegación con `Tab` + `Enter`/`Espacio` (semántica nativa de `<nav>`; no se
  capturan flechas).

## Guías de uso

- Navegación principal de la app, persistente.
- **No** para filtros temporales (usar `ChipGroup`) ni para más de 5 items.
- El item `avatar` suele ser el último (perfil / cuenta).

> Referencia: [Calipso 2.0 — components_navigation_bar](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2456-22069) ·
> [_building_blocks_navigation_bar_navitem](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2456-16068)
