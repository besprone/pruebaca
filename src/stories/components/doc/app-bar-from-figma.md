## AppBar

Barra de navegación superior. Orienta al usuario (título de la vista) y ofrece la
acción principal (`leading`, normalmente *back*) + acciones secundarias
(`trailing`). Figma: `patterns_app_bar`.

**No** es un contenedor de contenido y **no** reemplaza al tab bar ni a los
menús. El posicionamiento fijo (`sticky`/`fixed`), el safe-area y la elevación
on-scroll son responsabilidad del consumidor.

## API

```tsx
<AppBar
  size="md"
  layout="inline"
  elevation={scrolled ? 'raised' : 'flat'}
  leading={<IconButton emphasis="ghost" size="lg" aria-label="Volver" icon={<ArrowLeft />} />}
  headline="Inversiones"
  supporting="kubo.plazofijo"
  trailing={<IconButton emphasis="ghost" size="lg" aria-label="Buscar" icon={<Search />} />}
/>
```

| Prop | Valores | |
|---|---|---|
| `size` | `sm` (def.) · `md` · `lg` | `sm` 64px / headline `Headline/xs` (22) · `md`/`lg` 84px / headline `Display/sm` (28). `lg` = más padding-inline |
| `layout` | `inline` (def.) · `stacked` | `inline` = leading · texto · trailing en una fila · `stacked` = fila de acciones (leading + trailing) y el texto a lo ancho debajo |
| `elevation` | `flat` (def.) · `raised` | `raised` = sombra `elevation-2` — el consumidor lo activa al hacer scroll |
| `leading` | `ReactNode` | slot izquierdo: `IconButton` (back/menú) o `Brand` |
| `headline` / `supporting` | `ReactNode` | título + texto secundario (ellipsis, una línea) |
| `showHeadline` | `boolean` | fuerza mostrar/ocultar el bloque de texto. Default: `true` si hay `headline`/`supporting` |
| `trailing` | `ReactNode` | slot derecho (`flex:1`, `justify-end`): hasta 3 `IconButton`, un `Button`, un `SearchField`, un `Avatar`/`AvatarAction` |
| `aria-label` | `string` | nombre del `<header>` |

`forwardRef<HTMLElement>` (el `<header>`).

## Estructura

```
<header.app-bar data-size data-layout data-elevation>
  <div.app-bar__row>              (display:contents en inline)
    .app-bar__leading  slot
    .app-bar__text     headline + supporting   (solo layout=inline)
    .app-bar__trailing slot · flex:1 · justify-end · gap 4
  .app-bar__text                  (solo layout=stacked, a lo ancho)
```

## Componentes que instancia

`IconButton` (`size="lg"` — 48/24px, como en Figma), `SearchField`, `Avatar`,
`AvatarAction`, `Button` (via `patterns_buttons_actions`), `Brand` (logo). El
`AppBar` solo aporta el layout, los tokens de texto y la elevación.

## `configuration` de Figma → composición

Las 8 `configuration` del componente Figma son **presets de layout**, no
composiciones distintas. Se reproducen con los slots:

| configuration | cómo |
|---|---|
| `home settings` | `leading={<Brand secondary/>}` + `trailing` con iconos + `Avatar` |
| `home` | `leading` menú + `headline`/`supporting` + `trailing` iconos |
| `navigation` | `leading` back + `headline`/`supporting` + `trailing` |
| `search` | `leading` back + `trailing={<><SearchField flex-1/><IconButton close/></>}` (sin `headline`) |
| `section` | sin `leading`, `headline`/`supporting` + `trailing` con `Button` |
| `dialog` | sin `leading`, `layout="stacked"`, `trailing` + `headline` debajo |
| `resumen de saldos` / `dos columnas` | `headline` = monto, `trailing` con `SearchField` |

## Tokens

| Elemento | Token |
|---|---|
| Fondo | `semantic/color/bg/surface` |
| Headline | `semantic/color/text/primary` · `sm` Headline/xs-se (22/30/**600**) · `md`/`lg` Display/sm-se (28/36/**600**) |
| Supporting | `semantic/color/text/secondary` · `sm` Body/sm (12/17) · `md`/`lg` Body/lg (16/24) |
| Elevación `raised` | `Elevation/elevation-2` (`0 3 8 rgba(28,27,32,.12)`) |
| Padding | block `internalLayout/space-100` (8) · inline `space-150` (12) / `lg` `componentSpacing/space-300` (24) |
| Gap | `sm` `space-50` (4) · `md`/`lg` `componentSpacing/space-200` (16) |

> El pipeline de tipografía no exporta `display-sm-semiemphasized` (weight 600);
> se usa `--typography-headline-xs-semiemphasized-weight` (mismo valor).
> Los `padding-inline` de Figma varían mucho por `configuration` (0/4/12/40/130):
> son márgenes de página → el consumidor los ajusta con `className`/`style`.

## Comportamiento dinámico (del PDF, no implementado aquí)

El App bar colapsa al hacer scroll: headline grande → pequeño, supporting se
oculta, aparece la elevación. Aquí solo se expone `elevation` (el consumidor lo
alterna con el scroll — ver story `En contexto`); el colapso de tamaño
headline/`size` se retoma cuando exista el diseño detallado.

## Reglas de uso

- No poner la acción primaria del flujo en el App bar (esa va en el cuerpo).
- Máximo 3 acciones en `trailing`.
- No usar como barra de progreso ni contenedor de contenido.

> Referencia: [Calipso 2.0 — patterns_app_bar](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2195-4438)
