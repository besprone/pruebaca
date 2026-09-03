## PrimaryTabs

Navegación horizontal entre secciones **del mismo nivel jerárquico** dentro de
una pantalla. Un indicador (barra inferior) comunica la sección activa y se
desliza al cambiar. Figma: `components_primary_tabs` +
`_building_blocks_primary_tab`.

## Uso

```tsx
const [tab, setTab] = useState('vigentes');

<PrimaryTabs
  aria-label="Inversiones"
  value={tab}
  onChange={setTab}
  items={[
    { value: 'vigentes',    label: 'Vigentes' },
    { value: 'finalizadas', label: 'Finalizadas' },
    { value: 'todas',       label: 'Todas' },
  ]}
/>
```

`PrimaryTab` es un **building block interno** — se importa por ruta
(`components/Tabs/PrimaryTab`) solo en stories. No se exporta del índice.

## `PrimaryTabs`

| Prop | Valores | Default | |
|---|---|---|---|
| `items` | `PrimaryTabDef[]` | — | `{ value, label?, icon?, disabled?, 'aria-label'? }` |
| `value` / `defaultValue` / `onChange` | | | selección controlada o no |
| `distribution` | `equal` · `content` | `equal` | `equal` = tabs de ancho equitativo, sin scroll (2–4 tabs). `content` = ancho por contenido con **scroll horizontal** |
| `size` | `sm` · `md` · `lg` | `md` | presencia del strip — afecta el padding lateral del contenedor (sobre todo en `content`: md 16 · lg 24) |
| `aria-label` | `string` | — | **requerido** — nombra el `role="tablist"` |

## `PrimaryTab` (building block)

`<button role="tab">` de **48px**. `label?` (Body/md-semiemphasized 14/20/600) +
`icon?` (24px), centrados, gap 8, padding-inline 16. `selected` recolorea a
`brand`. `showIndicator` dibuja la barra de esa tab (solo para la story del
block — en `PrimaryTabs` el indicador es **único**).

## El indicador

- Barra `bg/brand` de **32×4 px**, esquinas superiores redondeadas
  (`containers/radius-200`), anclada al borde inferior del contenedor.
- **Más angosta que la tab** y **más gruesa que la de secondary tabs**.
- **Único** para toda la navegación — no vive en cada tab.
- Se **desliza** en X hasta el centro de la tab activa; ni alto ni grosor
  cambian. En `distribution="content"` se mueve dentro del scroll.

## Motion

`motion/spring` (`stiffness: 100`, `damping: 15`, `mass: 1` → ζ≈0.75). Mismo
integrador de muelle que `NavigationBar` (`src/lib/spring.ts`), aplicado **solo
al eje X** (`transform: translateX`). No se anima en el primer render;
`prefers-reduced-motion: reduce` → salto directo. El overlay `pressed` de la
tab usa `linear-200`.

## Tokens

| Elemento | Token |
|---|---|
| Contenedor bg / borde | `semantic/color/bg/surface` · `semantic/color/border/default` (1px inferior) |
| Indicador | `semantic/color/bg/brand` · `size/4` (alto) · `containers/radius-200` |
| Icono / label activo | `semantic/color/icon/brand` · `semantic/color/text/brand` |
| Icono / label reposo | `semantic/color/icon/secondary` · `semantic/color/text/secondary` |
| Overlay hover / pressed | `semantic/color/state/hover` · `semantic/color/state/pressed` |
| Foco | `semantic/color/state/focusRing` (2px) · `semantic/color/state/focus` |
| Label | Body/md-semiemphasized (14/20/600) |
| Gap icono↔label | `internalLayout/space-100` (8) |
| Padding tab (content) | `componentSpacing/space-200` (16) |

## Accesibilidad

- `role="tablist"` (`aria-label`, `aria-orientation="horizontal"`) + `<button
  role="tab">` con `aria-selected`.
- **Roving tabindex**: solo la tab activa es `tabIndex=0`. `←` / `→` mueven y
  activan (activación automática), `Home` / `End` a los extremos.
- El indicador no es focusable. Área táctil ≥ 48px.

## Guías de uso

- Usar cuando las secciones son del mismo nivel dentro de una pantalla.
- **No** para navegación global (usar `NavigationBar`).
- **No** mezclar con secondary tabs. No usar como segmented control.
- `equal` para 2–4 tabs fijas; `content` para listas dinámicas o largas.

> Referencia: [Calipso 2.0 — components_primary_tabs](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2509-27818) ·
> [_building_blocks_primary_tab](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2509-27740)
