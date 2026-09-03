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
| `size` | `sm` (def.) · `md` · `lg` | escala la ramp de tipografía (ver abajo) y la altura |
| `layout` | `inline` (def.) · `stacked` | `inline` = leading · texto · trailing en una fila; el texto se corta con ellipsis (estado **colapsado**) · `stacked` = fila de acciones + el texto a lo ancho debajo; el supporting hace **wrap** (estado **expandido**) |
| `elevation` | `flat` (def.) · `raised` | `flat` = **sin fondo** (transparente; la barra está en el top, nada se scrollea debajo) · `raised` (on-scroll) = fondo `bg/surface` opaco + sombra `elevation-2`. El consumidor lo alterna al hacer scroll |
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

## Ramp de tipografía y alturas (pixel-perfect vs Figma)

| layout × size | headline | supporting | gap texto | alto (frame Figma) |
|---|---|---|---|---|
| `inline` `sm` | Headline/xs-se (22/30) | Body/sm (12/17) | 0 | **64** |
| `inline` `md`/`lg` | Display/sm-se (28/36) | Body/lg (16/24) | 8 | **84** |
| `stacked` `sm` | Headline/sm-se (24/32) | Body/md (14/20) | 4 | **132** (fila 48 + texto 56) |
| `stacked` `md`/`lg` | Display/sm-se (28/36) | Body/lg (16/24) | 8 | **144** (fila 48 + texto 68) |

Las alturas de `stacked` son con supporting de **1 línea**; si hace wrap, la barra
crece (estado expandido de onboarding).

## Tokens

| Elemento | Token |
|---|---|
| Fondo | `flat` → transparente · `raised` → `semantic/color/bg/surface` |
| Headline weight | 600 (`--typography-headline-xs-semiemphasized-weight` — el pipeline no exporta `display-sm-semiemphasized`) |
| Headline / supporting color | `text/primary` · `text/secondary` |
| `raised` (on-scroll) | `bg/surface` + `Elevation/elevation-2` (`0 3 8 rgba(28,27,32,.12)`) |
| Padding-block | `internalLayout/space-100` (8; `stacked sm` pb 12) |
| Padding-inline | `sm` `space-50` (4) · `md`/`lg` `space-150` (12) — la caja del IconButton (48) sobresale sobre su glifo (12 interno), así el **glifo** queda a **16** (sm) / **24** (md·lg) del borde, simétrico L/R. Elementos sin overhang (`Brand` leading, `Avatar`/`AvatarAction` trailing) llevan `margin` de 12 para alinear al mismo grid. `trailing` gap 0 (las cajas se tocan). |
| Gap fila (inline) | `sm` `space-50` (4) · `md`/`lg` `componentSpacing/space-200` (16) |
| Gap fila↔texto (stacked) | `sm` `space-100` (8) · `md`/`lg` `space-150` (12) |
| Fila de acciones | `min-block-size: 48px` (= IconButton `size="lg"`) |

> Los `padding-inline` de Figma varían por `configuration` (0/4/12/40/130) — son
> márgenes de página; el consumidor los ajusta con `className`/`style`.

## Comportamiento colapsada ↔ expandida (de los PDFs)

Del prototipo de scroll: la barra **colapsa** al bajar (pasa de `stacked` grande a
`inline` `sm`, aparece `raised`) y **se expande** solo al volver al top. Si el
usuario sube pero **no** llega al top, se mantiene colapsada + `raised`.

Esa lógica vive en el **consumidor** (no en el componente — no puede conocer el
contenedor de scroll): alterna `layout`/`size`/`elevation` según el scroll. Ver
las stories `Colapsada ↔ expandida` (comparación estática) y `En contexto (scroll)`
(la transición completa).

Del PDF `flat → on-scroll`: mismo patrón para `elevation` solo — `flat` en el top,
`raised` al bajar, vuelve a `flat` al llegar al top (si no está en el top y sube,
se mantiene `raised`).

## Reglas de uso

- No poner la acción primaria del flujo en el App bar (esa va en el cuerpo).
- Máximo 3 acciones en `trailing`.
- No usar como barra de progreso ni contenedor de contenido.

> Referencia: [Calipso 2.0 — patterns_app_bar](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2195-4438)
