## FeedbackBanner

Patrón de comunicación de estado dentro del dashboard. Figma:
`pattern_app_feedback_banner`. Instancia `Card` (`elevation="flat"`, estática)
con el fondo teñido según `type`, y compone icono + headline + supporting +
acciones dentro.

No reemplaza a `SystemFeedback` (pantalla/sección completa) ni al patrón de
banner promocional (`pattern_app_marketing_banner`) — no usar para contenido
promocional, y no apilar varios banners del mismo peso visual sin jerarquía
clara.

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
  .feedback-banner__row         icono + cuerpo · gap 16 · padding 16
    .feedback-banner__icon      20px · color icon/<type>
    .feedback-banner__body      columna · gap 8 (bloque de texto ↔ acciones)
      .feedback-banner__headline    Body/md-emphasized (700) · text/primary
      .feedback-banner__supporting  Body/sm (500) · text/secondary · gap 2 con headline
      .feedback-banner__actions     <ButtonActions surface="dialog"> — fila derecha, gap 8
```

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

## Alcance — qué NO construye este componente

- **`_building_blocks_layout_banner`** (el shell genérico compartido con
  `pattern_app_marketing_banner`, con `orientation`/`size` y flags
  `eyebrow`/`indicator`/`trailing`/`affordance`) — la config fija del feedback
  banner (`Show headline/leading/actions: true`, el resto `false`) se
  implementó directo, sin construir el shell genérico completo. Si se
  necesita `pattern_app_marketing_banner` más adelante, evaluar extraer un
  shell compartido en ese momento en vez de generalizar de antemano.
- **`_building_blocks_app_banner_cta_affordance`** (el botón CTA único
  `brand`/`neutral` de la marketing banner) — el feedback banner no lo usa;
  sus acciones son el slot genérico `actions` (`ButtonActions`), no ese
  building block.

## Accesibilidad

`role` se deriva de `type`: `error`/`warning` → `alert` (interrumpe,
`aria-live="assertive"` implícito); `info`/`success` → `status` (informa,
`aria-live="polite"` implícito). El icono es `aria-hidden` — el estado se
comunica por texto (headline/supporting), no solo por color/icono.

> Referencia: [Calipso 2.0 — pattern_app_feedback_banner](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2442-14494)
