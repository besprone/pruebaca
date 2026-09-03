## Brand

Logos de marca (kubo · maestro). SVG inline, no interactivo. Figma:
`brand_assets_kugo_logo` (node 2763-2721).

## API

```tsx
<Brand type="primary" brand="kubo" size="sm" />          // lockup kubo.financiero, 16px
<Brand type="secondary" size="md" variant="white" />      // isotipo blanco (fondo oscuro)
<Brand type="imagotype" size="lg" decorative />           // "k." decorativo
```

| Prop | Valores | |
|---|---|---|
| `type` | `primary` (def.) · `secondary` · `imagotype` | lockup completo · isotipo/badge · lettermark `k.` |
| `variant` | `original` (def.) · `one` · `two` · `white` · `gray` | tratamiento de color. **Solo `kubo`** — `maestro` solo tiene `original` |
| `brand` | `kubo` (def.) · `maestro` | |
| `size` | `sm` 16 · `md` 24 (def.) · `lg` 32 | alto en px; el ancho sale del ratio del lockup |
| `title` | `string` | nombre accesible (por defecto el nombre de la marca). `""` → decorativo |
| `decorative` | `boolean` | `aria-hidden`, sin rol |

`forwardRef<HTMLSpanElement>`. Renderiza `<span role="img" aria-label>` con un
`<svg aria-hidden>` dentro.

## Recolor (kubo)

El SVG de kubo trae los paths clasificados en 3 slots; `Brand.css` les asigna
color según `data-brand` + `data-variant`:

| slot (`brand__*`) | qué es |
|---|---|
| `mark` | cuadro verde / fondo del badge |
| `word` | letras (`kubo.financiero` · `k.`) |
| `accent` | punto / cuadro lima |

| variant | mark | word | accent | uso |
|---|---|---|---|---|
| `original` | `#2E9F30` | primary `#323138` · sec/imago `#FFF` | `#D0DD28` | por defecto |
| `one` | primary `#2E9F30` · sec/imago `#FFF` | primary `#FFF` · sec/imago `#2E9F30` | `#D0DD28` | fondos tenues/oscuros o lockup invertido |
| `two` | `#2E9F30` (transparente en sec/imago) | `#2E9F30` | `#D0DD28` (`#2E9F30` en sec/imago) | monocromo verde |
| `white` | `#FFF` | `#FFF` | `#FFF` | fondos oscuros |
| `gray` | `#656566` | `#656566` | `#656566` | monocromo gris |

> Colores verificados en Figma para `primary` (las 5 variantes) y `secondary`
> `original`/`one`. Para `secondary`/`imagotype` en `two`/`white`/`gray` se aplica
> la misma lógica de slots (interpretación sistemática); ajustar si el diseño
> difiere.

## maestro

`maestro` es un asset distinto (manzana + "Crédito Maestro") con arte multicolor
fijo (`#E1251B` rojo · `#FFF100` amarillo · `#2B2A30` tinta). Figma solo trae
`variant="original"`, así que `variant` se ignora. `maestro` **no tiene
`secondary`** → `type="secondary"` cae a `imagotype`.

## Tokens

No hay tokens semánticos de marca todavía (el modelo kubo↔maestro llega después),
así que los hex de marca están literales en `Brand.css`: verde `#2E9F30`
(`ref/green`), lima `#D0DD28` (`ref/accentSecondary` key), tinta `#323138`, gris
`#656566`.

## Reglas de uso

- No es interactivo — envolver en `<a>` / `Link` si debe navegar.
- `white` solo sobre fondos oscuros; `original` sobre claros.
- `primary` para cabeceras/branding; `imagotype` para espacios reducidos
  (favicon, app icon, avatars de marca).

> Referencia: [Calipso 2.0 — brand_assets_kugo_logo](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2763-2721)
