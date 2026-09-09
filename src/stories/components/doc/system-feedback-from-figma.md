## SystemFeedback

Patrón de layout para pantallas o secciones de feedback del sistema — empty
states, success states, mensajes informativos. Figma: `pattern_system_feedback`.

Combina, en un **orden vertical fijo**:

1. Slot visual (`media`) — ilustración / imagen / icono
2. Bloque de texto — `label` + `supporting`
3. Slot de contenido opcional (`content`) — lista breve, card, detalle de transacción
4. Grupo de acciones (`actions`) — CTA primario + opcional secundario / link

> Patrón de **solo layout**: no aporta lógica, estados ni tokens de
> color/estado propios. Reutiliza los tokens de tipografía y de spacing de
> layout (`layout/stack/*`, `layout/container/*`, `layout/content/*`). Las CTAs
> son `Button` (u otro control) que pasa el consumidor por el slot.

## API

```tsx
<SystemFeedback
  emphasis="high"
  size="sm"
  state="empty"
  media={<Ilustracion />}
  label="No encontramos resultados"
  supporting="Prueba con otro término o ajusta los filtros."
  actions={<Button emphasis="primary" size="sm">Ajustar filtros</Button>}
/>
```

| Prop | Valores | |
|---|---|---|
| `emphasis` | `high` (def.) · `low` | **único switch de layout.** `high` = pantalla/sección completa (banda visual de 160px, label grande, CTA apiladas a lo ancho). `low` = tratamiento compacto en línea (icono de 56px, label `Body/lg`, acciones en fila) |
| `size` | `sm` (def.) · `md` | **solo afecta a `high`.** `sm` se adapta al ancho (móvil, label `Headline/sm`); `md` limita a **480px** centrado (web, label `Display/sm`). En `low` se ignora (siempre compacto) |
| `state` | `empty` (def.) · `success` | tipo semántico — **no cambia el layout.** Se expone como `data-state` para estilos/analítica del consumidor |
| `transaction` | `boolean` (def. `false`) | marca el feedback como transaccional — **no cambia el layout.** Se expone como `data-transaction`; el detalle va en `content` |
| `media` | `ReactNode` | slot visual. `high` → banda a lo ancho de 160px con recorte `object-fit: cover`; `low` → cuadro de 56px. Acepta cualquier nodo — el uso típico es `<ImgSlot type="feedbackState" state size="lg\|sm" />` (ver nota abajo) |
| `label` | `ReactNode` | mensaje principal, una línea corta. `Body/lg-se` (`low`) · `Headline/sm-se` (`high sm`) · `Display/sm` peso 600 (`high md`) · color `text/primary` |
| `supporting` | `ReactNode` | texto secundario breve. `Body/md` (`low` · `high sm`) · `Body/lg` (`high md`) · color `text/secondary` |
| `content` | `ReactNode` | slot contextual a lo ancho, entre el texto y las acciones. Orientado a `high` |
| `actions` | `ReactNode` | 1–3 `<Button>` (los pasa el consumidor). `SystemFeedback` los envuelve en `<ButtonActions>` — `surface="screen"` (apiladas a lo ancho) en `high`, `surface="feedbackState"` (fila centrada, gap 8) en `low`. **Tamaño de `Button` por `size`:** `low` → `Button size="xs"` · `high sm` → `Button size="sm"` · `high md` → `Button size="md"`. En apilado, el primario va **último** (más cerca del pulgar) |
| `sticky` | `boolean` (def. `true`) | **solo `high` + `sm`:** la botonera queda **siempre al pie**. Si el contenido cabe, el cuerpo lo centra; si no cabe, el cuerpo scrollea por dentro y la botonera **no se mueve**. El contenedor padre debe tener alto. Ignorado en `md` y en `low` |

`forwardRef<HTMLDivElement>`. Cualquier slot ausente (`null`/no pasado) se
omite y el layout se reacomoda sin dejar huecos.

## Estructura

```
<div.system-feedback data-emphasis data-size data-state data-transaction? data-sticky?>
  <div.system-feedback__body>              (high: contenedor flex · low: display:contents)
    .system-feedback__media                banda 160 (high) / cuadro 56 (low)
    .system-feedback__text-group           (high sm: wrapper px16 gap24 · high md + low: display:contents)
      .system-feedback__text               label + supporting · text-align: center
      .system-feedback__content            slot contextual a lo ancho
  ButtonActions.system-feedback__actions   botonera — surface screen (high) / feedbackState (low)
```

La botonera es un `<ButtonActions>` (componente propio, Figma
`patterns_buttons_actions`). `SystemFeedback` sólo elige el `surface` según
`emphasis` y le añade, vía la clase `system-feedback__actions`, el padding
del "stickyCTAContainer" y el `flex-shrink: 0` del modo sticky — la
dirección / gap / ancho de los botones los pone `ButtonActions[data-surface]`.
Ver `button-actions-from-figma.md`.

El truco para una sola estructura DOM en los 3 tratamientos es `display:
contents` en los wrappers que sobran:

- **`low`** — `__body` y `__text-group` se colapsan → `media`, `text` y
  `actions` quedan como hermanos directos al `gap` del contenedor
  (`layout/stack/block` = 16), sin padding, como en Figma.
- **`high` `md`** — `__text-group` se colapsa → `media`, `text` y `content`
  quedan al `gap` del `__body` (`layout/stack/section` = 32).
- **`high` `sm`** — `__text-group` es un wrapper real con su propio inset
  (`px 16`) y `gap` texto↔contenido (`componentSpacing/space-300` = 24),
  reproduciendo el nodo "text and content" de Figma.

## Medidas (validadas contra Figma)

### `high` · `sm` (móvil, adaptable al ancho)

| | valor | token |
|---|---|---|
| `__body` padding | 16 / 16 / 24 | `layout/stack/block` · `layout/container/inline` · `layout/content/bottomClearance` |
| `__body` gap (media↔texto) | 16 | `layout/stack/block` |
| `__text-group` | `px 16` · `gap 24` | `componentSpacing/space-200` · `componentSpacing/space-300` |
| `__text` gap (label↔supporting) | 4 | `internalLayout/space-50` |
| label | 24 / 32 / 600 | `Typography/Headline/sm-semiemphasized` |
| supporting | 14 / 20 / 500 | `Typography/Body/md` |
| `media` | a lo ancho × 160 | — |
| `__actions` padding | 16 / 16 / 24 | igual que `__body` (nodo "stickyCTAContainer") |
| `__actions` layout | column · gap 16 · botones a lo ancho | `ButtonActions surface="screen"` (`componentSpacing/space-200`) |

### `high` · `md` (web, 480px máx.)

| | valor | token |
|---|---|---|
| `max-inline-size` | 480 · `margin-inline: auto` | literal (el pipeline no trae token de ancho de pantalla — mismo caso que AppBar) |
| `__body` padding | 0 / 0 / 24 | solo `layout/content/bottomClearance` abajo |
| `__body` gap (media↔texto↔contenido) | 32 | `layout/stack/section` |
| `__text` gap | 8 | `internalLayout/space-100` |
| label | 28 / 36 / 600 | `Display/sm` + peso 600 de `headline-sm-semiemphasized` (el pipeline no exporta `display-sm-semiemphasized`, mismo workaround que AppBar) |
| supporting | 16 / 24 / 500 | `Typography/Body/lg` |
| `__actions` padding | 16 / 0 / 0 | solo `layout/stack/block` arriba |
| `__actions` layout | column · gap 16 · botones a lo ancho | `ButtonActions surface="screen"` |

### `low` (compacto en línea)

| | valor | token |
|---|---|---|
| contenedor gap (media↔texto↔acciones) | 16 | `layout/stack/block` |
| padding | 0 | — |
| `media` | 56 × 56 | — |
| `__text` gap | 4 | `internalLayout/space-50` |
| label | 16 / 24 / 600 | `Typography/Body/lg-semiemphasized` |
| supporting | 14 / 20 / 500 | `Typography/Body/md` |
| `__actions` layout | fila · wrap · centrada · gap 8 | `ButtonActions surface="feedbackState"` (`internalLayout/space-100`) |

## `sticky` — botonera fija al pie (pantalla completa)

Solo `high` + `sm`. Con `data-sticky` (default):

```css
.system-feedback[data-sticky]                          { block-size: 100%; min-block-size: 0; }
.system-feedback[data-sticky] .system-feedback__body   { flex: 1 1 auto; min-block-size: 0;
                                                          overflow-y: auto; justify-content: safe center; }
.system-feedback[data-sticky] .system-feedback__actions { flex-shrink: 0; }
```

`.system-feedback` llena el alto del padre (`block-size: 100%`) y es un flex
column; `__body` toma el espacio sobrante y **scrollea por dentro**
(`overflow-y: auto` + `min-block-size: 0`, imprescindible para que el
overflow funcione dentro de un flex column); `__actions` (`flex-shrink: 0`)
queda **fija al pie**, nunca se comprime ni scrollea.

- Contenido **cabe** → `justify-content: safe center` lo centra vertical­mente
  en el cuerpo.
- Contenido **no cabe** → `safe` alinea al inicio (sin recortar arriba) y el
  cuerpo scrollea; la botonera no se mueve.

**El contenedor padre debe tener alto** — un `100dvh`, un frame de pantalla,
o un flex parent que estire este nodo. Sin alto definido, `block-size: 100%`
se ignora y el patrón degrada a flujo normal (botonera tras el contenido).
Pasá `sticky={false}` para forzar ese flujo desde arriba (secciones
embebidas, no pantallas). `md` nunca es sticky (tarjeta centrada de 480px,
la botonera fluye tras el contenido).

## `box-sizing`

`.system-feedback` y todos sus `__*` internos fuerzan `box-sizing:
border-box` — sin eso, `__body` / `__text-group` / `__actions` (que tienen
`inline-size: 100%` **y** padding horizontal) se desbordan del contenedor
por 32px. No se aplica `*` para no tocar el contenido que pasa el consumidor
por los slots.

## Comportamiento (de la doc de Figma)

- Composición flexible por slots: si falta `media`, el texto sube; si falta
  `supporting`, el `label` queda como único bloque de texto; `content` se
  inserta entre texto y acciones.
- CTA primario siempre visible cuando el flujo requiere resolución; CTA
  secundario opcional ("Ver detalles", "Intentar de nuevo", "Volver al
  inicio").
- Se adapta al ancho de pantalla sin romper la jerarquía.
- Usar cuando el usuario necesita entender un estado y tener una acción
  clara. Si el estado requiere explicación larga o varios pasos, usar otro
  patrón (wizard, modal). Un único mensaje principal (`label`) + un
  `supporting` breve.
- `success` transaccional → priorizar confirmación + siguiente paso (CTA
  claro) y el detalle en `content`.

## Slot `media` con `ImgSlot`

El slot visual es el componente `ImgSlot` (Figma `_building_blocks_img_component`),
`type="slot"` (placeholder / imagen final) o `type="feedbackState"` (acuarela
teñida + halo + icono, color e icono por `state`). Ver `img-slot-from-figma.md`.

`SystemFeedback` **no lo instancia** — `media` es un slot y acepta cualquier
nodo. El uso típico:

- `emphasis="high"` → `<ImgSlot type="feedbackState" state={…} size="lg" />` (banda de 160px)
- `emphasis="low"` → `<ImgSlot type="feedbackState" state={…} size="sm" />` (56px)

El `state` del `ImgSlot` normalmente espeja el `state` de `SystemFeedback`,
pero son props independientes — el patrón no lo fuerza. Las stories lo usan
así (`SuccessTransaccion` → `success`, `WelcomeBack` → `info`, `EmptyBusqueda`
→ `empty`).

## Accesibilidad

- Contraste de `text/primary` y `text/secondary` contra el fondo asegurado
  por los tokens.
- No depender solo del color para transmitir el estado — si hay
  icono/ilustración que sea complementaria, no el único canal.
- Lectores de pantalla: `label` como encabezado del estado, `supporting`
  como descripción, CTAs con verbos claros (evitar "Aceptar" genérico).
- Imagen ilustrativa: `alt`/descripción accesible, o marcada como decorativa
  (`aria-hidden`) si no aporta información — decisión del consumidor sobre el
  nodo que pasa a `media`.

## Ejemplos (de la doc de Figma)

| caso | `emphasis` | label | supporting | acciones |
|---|---|---|---|---|
| Empty – búsqueda | `low` | "No encontramos resultados" | "Prueba con otro término o ajusta los filtros." | link "Restablecer búsqueda" + "Ajustar filtros" |
| Success – transacción | `high` | "Listo, tu inversión quedó registrada" | "Verás el rendimiento reflejado en tu balance." | "Ver inversión" + secundario "Volver al inicio" |
| Informativo | `high` | "No pudimos cargar la información" | "Revisa tu conexión e inténtalo de nuevo." | "Reintentar" |

> Referencia: [Calipso 2.0 — pattern_system_feedback](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2524-15413)
