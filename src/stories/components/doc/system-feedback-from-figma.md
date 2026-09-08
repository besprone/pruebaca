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
  actions={<Button emphasis="primary">Ajustar filtros</Button>}
/>
```

| Prop | Valores | |
|---|---|---|
| `emphasis` | `high` (def.) · `low` | **único switch de layout.** `high` = pantalla/sección completa (banda visual de 160px, label grande, CTA apiladas a lo ancho). `low` = tratamiento compacto en línea (icono de 56px, label `Body/lg`, acciones en fila) |
| `size` | `sm` (def.) · `md` | **solo afecta a `high`.** `sm` se adapta al ancho (móvil, label `Headline/sm`); `md` limita a **480px** centrado (web, label `Display/sm`). En `low` se ignora (siempre compacto) |
| `state` | `empty` (def.) · `success` | tipo semántico — **no cambia el layout.** Se expone como `data-state` para estilos/analítica del consumidor |
| `transaction` | `boolean` (def. `false`) | marca el feedback como transaccional — **no cambia el layout.** Se expone como `data-transaction`; el detalle va en `content` |
| `media` | `ReactNode` | slot visual. `high` → banda a lo ancho de 160px con recorte `object-fit: cover`; `low` → cuadro de 56px. Pasá la imagen ya con el aspect ratio correcto si no querés que recorte |
| `label` | `ReactNode` | mensaje principal, una línea corta. `Body/lg-se` (`low`) · `Headline/sm-se` (`high sm`) · `Display/sm` peso 600 (`high md`) · color `text/primary` |
| `supporting` | `ReactNode` | texto secundario breve. `Body/md` (`low` · `high sm`) · `Body/lg` (`high md`) · color `text/secondary` |
| `content` | `ReactNode` | slot contextual a lo ancho, entre el texto y las acciones. Orientado a `high` |
| `actions` | `ReactNode` | grupo de CTAs. `high` → apiladas a lo ancho (`> *` a `width: 100%`); `low` → fila compacta centrada, gap 8 |
| `sticky` | `boolean` (def. `true`) | **solo `high` + `sm`:** el cuerpo crece y se centra verticalmente, y las acciones quedan al pie (patrón de pantalla completa). El contenedor padre debe tener alto. Ignorado en `md` y en `low` |

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
  .system-feedback__actions                grupo de CTAs
```

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
| `__actions` gap | 16 | `layout/stack/block` |

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

### `low` (compacto en línea)

| | valor | token |
|---|---|---|
| contenedor gap (media↔texto↔acciones) | 16 | `layout/stack/block` |
| padding | 0 | — |
| `media` | 56 × 56 | — |
| `__text` gap | 4 | `internalLayout/space-50` |
| label | 16 / 24 / 600 | `Typography/Body/lg-semiemphasized` |
| supporting | 14 / 20 / 500 | `Typography/Body/md` |
| `__actions` | fila, wrap, centrada, gap 8 | `internalLayout/space-100` |

## `sticky` (pantalla completa)

Solo `high` + `sm`. Con `data-sticky` (default):

```css
.system-feedback[data-sticky]                        { min-block-size: 100%; }
.system-feedback[data-sticky] .system-feedback__body { flex: 1 1 auto; justify-content: center; }
```

El `__body` crece y centra su contenido; `__actions` queda como último
hermano de flujo, pinneado al pie. **El contenedor padre debe tener alto**
(un `100dvh`, un frame de pantalla, etc.). Si el contenido supera el alto
disponible, el consumidor decide si el `__body` scrollea — el patrón no lo
impone. Pasá `sticky={false}` para que el contenido fluya desde arriba
(útil en secciones embebidas, no pantallas).

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
