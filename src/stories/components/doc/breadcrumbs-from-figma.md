## Breadcrumbs

Indicador de ubicación jerárquica: la ruta de páginas desde el origen hasta la
página actual. Los items intermedios son navegables (instancias de `Link`); el
item final (`current`) es texto plano no interactivo. Figma:
`components_breadcrumbs`.

## Anatomía

- **Links** — instancias de `Link` (`components_link`), navegables.
- **Separador `/`** — decorativo (`aria-hidden`), `text/secondary`.
- **Current label** — texto plano de la página actual, `text/primary` peso 600,
  siempre el último. No usa `Link`.

## API

```tsx
<Breadcrumbs
  size="md"
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Inversiones', href: '/inversiones' },
  ]}
  current="kubo.plazofijo"
/>
```

| Prop | Valores | |
|---|---|---|
| `items` | `BreadcrumbItem[]` | links navegables (1–3 recomendado). **No** incluye la página actual |
| `current` | `ReactNode` | nombre exacto de la página actual — texto plano, no interactivo, siempre el último |
| `size` | `md` (def.) · `lg` | solo cambia el `padding-inline` (24 ↔ 40). Tipografía idéntica |
| `aria-label` | `string` | nombre del `<nav>`. Default `Ruta de navegación` |

`BreadcrumbItem` = `{ label, href?, key?, ...attrs de <a> }` — `label` + el resto
se hace spread sobre el `Link` interno (`href`, `onClick`, `target`…).

`forwardRef<HTMLElement>` (el `<nav>`). Estructura: `<nav><ol><li>` — patrón a11y
estándar; el último `<li>` lleva `aria-current="page"`.

## Dimensiones (Figma)

- `gap` entre elementos: **4px** (`internalLayout/space-50`) — plano: link↔`/`↔link↔…↔current.
- `padding-block`: **8px** (`internalLayout/space-100`).
- `padding-inline`: `md` **24px** (`componentSpacing/space-300`) · `lg` **40px** (`sectionSpacing/space-500`).
- Ancho/alto adaptables.

## Tokens

| Elemento | Token |
|---|---|
| Fondo | `semantic/color/bg/surface` |
| Links | hereda todos los de `Link` (`text/link{Default,Hover,Pressed}`, subrayado) |
| Separador `/` | `semantic/color/text/secondary` (Body/lg 16/24/500) |
| Current label | `semantic/color/text/primary` · Body/lg-semiemphasized (16/24/**600**) |

## Comportamiento

- Los links intermedios navegan a su vista al click/tap.
- El `current` nunca es interactivo. El `/` es decorativo.
- Overflow (ruta muy larga): el spec sugiere truncar los items intermedios con
  "…". **No implementado** — Figma no trae variante de truncado; se retoma si
  aparece el diseño.

## Reglas de uso

- Web/desktop, para jerarquías de navegación profundas. **No en mobile** (basta
  el back).
- Mínimo 1 link + `current` (2 niveles). Máximo 3 links + `current` (4 niveles).
- El `current` siempre refleja el nombre exacto de la página actual.

> Referencia: [Calipso 2.0 — components_breadcrumbs](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4409-25499)
