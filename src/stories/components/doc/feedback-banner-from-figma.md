## FeedbackBanner

Patrón de comunicación de estado dentro del dashboard. Figma:
`pattern_app_feedback_banner`. Vive en `src/components/Banner/` junto con
`MarketingBanner` (ver `marketing-banner-from-figma.md`) — ambos instancian
`Card` (`elevation="flat"`, estática) + `BannerLayout` (el shell interno
compartido, `_building_blocks_layout_banner` en Figma; no se exporta). Acá
solo se define el fondo/icono teñidos por `type` y las acciones.

No reemplaza a `SystemFeedback` (pantalla/sección completa) ni a
`MarketingBanner` (contenido y tono distintos, no intercambiables) — no usar
para contenido promocional, y no apilar varios banners del mismo peso visual
sin jerarquía clara.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `type` | `info` · `success` · `error` · `warning` | `info` | fondo teñido, icono y rol ARIA |
| `headline` | `ReactNode` | — | mensaje principal, requerido |
| `supporting` | `ReactNode` | — | texto secundario opcional |
| `actions` | `ReactNode` | — | 1–2 `<Button emphasis="ghost" size="xs">`, opcional |

Spread de `HTMLAttributes<HTMLDivElement>` (`className`, `onClick`…) — pasan a
la `Card` subyacente.

## Anatomía / tokens

```
.feedback-banner[data-type]     = <Card elevation="flat">, bg teñido por type
  <BannerLayout                 shell interno compartido — ver BannerLayout.css
    leading={.feedback-banner__icon}    20px · color icon/<type>
    headline / supporting               tokens fijos, ver BannerLayout
    bottomRow={.feedback-banner__actions}  <ButtonActions surface="dialog">
  />
```

El gap headline↔supporting (2px, aislado del gap 8 texto↔acciones) y el resto
del layout viven en `BannerLayout` — ver su propio archivo para el detalle
(incluida la razón por la que headline+supporting necesitan su propio wrapper
con `gap`, no un `margin` suelto). Acá solo lo específico de `FeedbackBanner`:
el icono (`leading`) y las acciones (`bottomRow`).

`.feedback-banner__actions` también absorbe el `--button-block-inset` del
`Button` (el padding vertical de área táctil fuera de la píldora — ver
`Button.css` / PR #97) con `margin-block: calc(var(--button-block-inset,0px) * -1)`
en `.feedback-banner__actions .button`. `ButtonActions[data-surface="screen"]`
ya hace esto para sus propios consumidores, pero `surface="dialog"` no —
sin este absorbedor local, el `xs` de las acciones (inset 8px) deja 24px
entre la píldora visible y el borde inferior de la card en vez de los 16px
del padding.

| `type` | fondo (`bg/`) | icono | rol ARIA |
|---|---|---|---|
| `info` | `infoMuted` | `Information` (círculo · "i") · `icon/info` | `status` |
| `success` | `successMuted` | `CheckmarkOutline` (círculo · check) · `icon/success` | `status` |
| `error` | `dangerMuted` | `Warning` (círculo · "!") · `icon/danger` | `alert` |
| `warning` | `warningMuted` | `WarningAlt` (triángulo · "!") · `icon/warning` | `alert` |

Ojo con los nombres de Carbon: `Warning` es el círculo, `WarningAlt` es el
triángulo — contraintuitivo (uno esperaría que el "alt" fuera la variante,
no el símbolo base), confirmado renderizando ambos lado a lado contra la
referencia de Figma, no asumido por el nombre. Coincide con los nombres de
los assets exportados por Figma (`ic_warning` para `error`, `ic_warning_alt`
para `warning`).

`headline`/`supporting` no cambian de token por `type` (siempre `text/primary`
/ `text/secondary`) — solo el fondo, el icono y el rol cambian.

**Acciones — color condicional, no derivable de un único token:** en Figma,
las acciones (`Button emphasis="ghost" size="xs"`) usan el verde de marca
estándar (`text/brand`, el default de `Button`) en `info`/`success`, pero se
recolorean a `text/neutral` específicamente en `error`/`warning` — confirmado
visualmente instancia por instancia, no es una regla que se pueda derivar de
un token semántico único. `FeedbackBanner.css` reproduce esa asimetría con un
override scoped por `[data-type='error'|'warning']` sobre
`.button[data-emphasis='ghost'] { --_text-color: text/neutral }`.

## Alcance

`_building_blocks_app_banner_cta_affordance` (el chip CTA único de
`MarketingBanner`) no aplica acá — las acciones de `FeedbackBanner` son el
slot genérico `actions` (`ButtonActions`, 1–2 botones ghost), no ese building
block.

`BannerLayout` (el shell compartido) solo expone los slots que
`FeedbackBanner`/`MarketingBanner` usan hoy (`leading`/`eyebrow`/`bottomRow`/
`trailing`) — no todos los flags de `_building_blocks_layout_banner` en
Figma (`indicator`, `actions` como slot separado de `bottomRow`). Ver
`BannerLayout.tsx` si un tercer patrón necesita algo distinto.

## Accesibilidad

`role` se deriva de `type`: `error`/`warning` → `alert` (interrumpe,
`aria-live="assertive"` implícito); `info`/`success` → `status` (informa,
`aria-live="polite"` implícito). El icono es `aria-hidden` — el estado se
comunica por texto (headline/supporting), no solo por color/icono.

> Referencia: [Calipso 2.0 — pattern_app_feedback_banner](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2442-14494)
