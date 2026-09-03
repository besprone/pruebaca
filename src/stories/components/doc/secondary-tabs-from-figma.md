## SecondaryTabs

Navegación **secundaria** dentro de una sección ya definida por `PrimaryTabs`.
Indica subsecciones relacionadas. Un indicador inferior fino comunica la
subsección activa. Figma: `components_secondary_tabs` +
`_building_blocks_secondary_tab`.

## Uso

```tsx
const [tab, setTab] = useState('plazo');

<SecondaryTabs
  aria-label="Elige un plazo o fecha"
  value={tab}
  onChange={setTab}
  items={[
    { value: 'plazo', label: 'Plazo', icon: <Time /> },
    { value: 'fecha', label: 'Fecha', icon: <Calendar /> },
  ]}
/>
```

`SecondaryTab` es un **building block interno** — se importa por ruta
(`components/Tabs/SecondaryTab`) solo en stories. No se exporta del índice.

## `SecondaryTabs`

| Prop | | |
|---|---|---|
| `items` | `SecondaryTabDef[]` | `{ value, label?, icon?, disabled?, 'aria-label'? }` — máx. 4 |
| `value` / `defaultValue` / `onChange` | | selección controlada o no |
| `aria-label` | `string` | **requerido** — nombra el `role="tablist"` |

Sin `distribution` ni `size`: siempre reparte el ancho equitativo (`flex: 1`),
sin scroll.

## `SecondaryTab` (building block)

`<button role="tab">` de **48px**, más ligero que `PrimaryTab`. `label?`
(Body/md-semiemphasized 14/20/600) + `icon?` (24px), centrados, gap 8.
`selected` recolorea a `brand`. `showIndicator` dibuja la línea de esa tab
(solo para la story del block).

## El indicador — diferencia con PrimaryTabs

| | PrimaryTabs | **SecondaryTabs** |
|---|---|---|
| Ancho | 32px fijo | **100% del ancho de la tab** |
| Grosor | 4px | **2px** |
| Esquinas | redondeadas (`radius-200` arriba) | **rectas** |
| Jerarquía | superior | inferior |

- **Único** para toda la navegación (no vive en cada tab). Color `bg/brand`,
  anclado al borde inferior del contenedor.
- Se **desliza** en X hasta la tab activa; su `width` se iguala al ancho de la
  tab. No cambia de alto.

## Motion

`motion/spring` (`stiffness: 100`, `damping: 15`, `mass: 1`). Mismo integrador
de muelle que `PrimaryTabs` / `NavigationBar` (`src/lib/spring.ts`), aplicado
**solo al eje X** (`transform: translateX`). No se anima en el primer render;
`prefers-reduced-motion: reduce` → salto directo.

## Tokens

| Elemento | Token |
|---|---|
| Contenedor bg / borde | `semantic/color/bg/surface` · `semantic/color/border/default` (1px inferior) |
| Indicador | `semantic/color/bg/brand` · 2px |
| Icono / label activo | `semantic/color/icon/brand` · `semantic/color/text/brand` |
| Icono / label reposo | `semantic/color/icon/secondary` · `semantic/color/text/secondary` |
| Overlay hover / pressed | `semantic/color/state/hover` · `semantic/color/state/pressed` |
| Foco | `semantic/color/state/focusRing` (2px) · `semantic/color/state/focus` |

## Accesibilidad

- `role="tablist"` + `<button role="tab">` con `aria-selected`.
- **Roving tabindex**; `←` / `→` mueven y activan; `Home` / `End`. Área táctil
  ≥ 48px. El indicador no es focusable.

## Guías de uso

- Navegación **interna** dentro de una sección ya definida — categorías,
  filtros persistentes, vistas paralelas.
- **No** como navegación principal de pantalla (usar `PrimaryTabs` /
  `NavigationBar`).
- Máx. 4 tabs visibles sin scroll. No mezclar con primary tabs en el mismo
  nivel visual.

> Referencia: [Calipso 2.0 — components_secondary_tabs](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2490-23501) ·
> [_building_blocks_secondary_tab](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2485-23238)
