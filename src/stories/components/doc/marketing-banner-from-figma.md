## MarketingBanner

Patrón promocional para destacar campañas/oportunidades estratégicas dentro
de la app. Figma: `pattern_app_marketing_banner`. Vive en
`src/components/Banner/` junto con `FeedbackBanner` (ver
`feedback-banner-from-figma.md`) — ambos instancian `Card`
(`elevation="flat"`, estática) + `BannerLayout` (el shell interno compartido,
`_building_blocks_layout_banner` en Figma; no se exporta).

Solo un banner promocional visible por viewport como promoción principal; no
competir con otros banners del mismo peso visual. No usar para estados de
error/sistema (para eso, `FeedbackBanner`) ni para navegación principal.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `accent` | `mint` · `orchid` | `mint` | fondo teñido. `mint` = campaña principal, `orchid` = secundaria |
| `eyebrow` | `ReactNode` | — | texto pequeño opcional sobre el headline (nombre de campaña, vigencia…) |
| `headline` | `ReactNode` | — | mensaje principal, requerido |
| `supporting` | `ReactNode` | — | texto secundario opcional (hasta 3 líneas) |
| `affordance` | `{ label, icon?, onClick? }` | — | CTA única, requerida |
| `trailing` | `ReactNode` | — | ilustración a la derecha, opcional |

Spread de `HTMLAttributes<HTMLDivElement>` (`className`, `onClick`…) — pasan a
la `Card` subyacente.

## Anatomía / tokens

```
.marketing-banner[data-accent]  = <Card elevation="flat">, bg teñido por accent
  <BannerLayout                 shell interno compartido — ver BannerLayout.css
    eyebrow / headline / supporting     tokens fijos, ver BannerLayout
    bottomRow={<CtaAffordance scheme="neutral" size="sm" />}
    trailing={ilustración}
  />
```

| `accent` | fondo (`bg/`) |
|---|---|
| `mint` | `accentPrimaryMuted` |
| `orchid` | `accentSecondaryMuted` |

`headline`/`supporting`/`eyebrow` no cambian de token por `accent` (siempre
`text/primary` / `text/secondary` / `text/tertiary`) — solo el fondo cambia.
Sin `leading` — a diferencia de `FeedbackBanner`, este patrón no lleva icono
de estado; el slot visual es `trailing` (ilustración), no un icono a la
izquierda.

**El CTA (`_building_blocks_app_banner_cta_affordance`) tiene su propia
matriz `scheme: brand|neutral` × `size: sm|md`, pero la instancia real de
`pattern_app_marketing_banner` fija `scheme="neutral" size="sm"` — confirmado
en las dos instancias concretas de Figma (`mint` y `orchid`): ambas usan el
chip `bg/neutralSoft` sin importar el accent, no una escala derivada del
`accent`.** Por eso `MarketingBanner` no expone `scheme`/`size` del CTA como
props — son fijos, igual que `FeedbackBanner` fija su propia config de
`BannerLayout`. El icono del chip default de Figma es el logo de kubo — un
placeholder del mock, no un default real; `affordance.icon` es opcional y sin
valor por defecto en código.

## Building blocks

- **`CtaAffordance`** (`src/components/Banner/CtaAffordance.tsx`) — building
  block interno, no se exporta. Implementa el chip completo (`scheme` ×
  `size`) aunque `MarketingBanner` solo instancie una combinación — igual que
  el resto de `_building_blocks_*` en este DS, se construye la matriz real de
  Figma aunque el consumidor actual solo use una porción.
- **`BannerLayout`** — ver `feedback-banner-from-figma.md`, sección
  "Alcance".

## Accesibilidad

Headline con jerarquía semántica clara; CTA con texto accionable (no solo
"ver más" genérico); contraste AA sobre el fondo teñido; la ilustración
(`trailing`) no debe ser el único portador de información crítica.

## Guías de uso

- Para campaña activa/acción estratégica prioritaria; no para contenido
  transaccional puro.
- No mezclar con `FeedbackBanner` en el mismo bloque de contenido sin
  jerarquía visual clara entre ambos.
- El banner puede vivir dentro de un carousel o alternarse dinámicamente por
  campaña — eso lo resuelve el consumidor, `MarketingBanner` no tiene lógica
  de rotación propia.

> Referencia: [Calipso 2.0 — pattern_app_marketing_banner](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4893-51921)
