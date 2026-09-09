## ImgSlot

Slot visual de los patrones. Figma: `_building_blocks_img_component`.

Dos modos por `type`:

- **`slot`** (def.) — contenedor reservado para una imagen / ilustración
  **final** que pasa el consumidor por `children`. Sin `children` pinta un
  placeholder gris (con `icon` opcional centrado). Es "área reservada para
  contenido visual dinámico", no una imagen de producto en sí.
- **`feedbackState`** — ilustración **pre-armada**: fondo acuarela teñido +
  halo blanco difuminado + icono central. Por `state` **sólo cambia el color
  de la acuarela y el icono/su color** — la textura de la acuarela es una
  sola, compartida.

## API

```tsx
<ImgSlot type="feedbackState" state="success" size="lg" />
<ImgSlot type="feedbackState" state="error" size="sm" icon={<Brand type="secondary" />} />
<ImgSlot type="slot" size="lg"><img src={hero} alt="…" /></ImgSlot>
```

| Prop | Valores | |
|---|---|---|
| `type` | `slot` (def.) · `feedbackState` | modo |
| `state` | `default` · `success` · `info` · `error` · `warning` · `empty` | sólo `feedbackState`. `default` cae a `empty`. Cambia acuarela + icono por defecto |
| `size` | `xxs` 24 · `xs` 48 · `sm` 56 · `md` 80 (cuadrados) · `lg` (def., banda a lo ancho × 160) | |
| `icon` | `ReactNode` | icono central del `feedbackState` (o del placeholder `slot`). Sin pasarlo, `feedbackState` usa un glifo de estado de `@carbon/icons-react` |
| `children` | `ReactNode` | imagen/ilustración final para `type="slot"`. Ignorado en `feedbackState` |

`forwardRef<HTMLDivElement>`, `data-type` / `data-state` / `data-size`.

## `feedbackState` — color e icono por estado

Una sola textura de acuarela para `success`/`info`/`error`/`warning` (en
Figma son el **mismo PNG**); `empty` usa una textura gris aparte. Se usa
como **`mask`** (su silueta) y se pinta con el token de fondo del estado,
así el color es 100% token. Assets `webp` en tres tamaños —
`watercolor-{sm,md,lg}.webp` (56² · 80² · 228×160) y
`watercolor-empty-{sm,md,lg}.webp` — el CSS elige por `data-size` (`sm`
cubre también `xs`/`xxs`):

| `state` | acuarela (`--_wash`) | icono / acento (`--_accent`) | glifo por defecto |
|---|---|---|---|
| `success` | `bg/successSoft` | `icon/success` (`#1f6f40`) | `CheckmarkFilled` |
| `info` | `bg/infoSoft` | `icon/info` (`#1e5d86`) | `InformationFilled` |
| `error` | `bg/dangerSoft` | `icon/danger` (`#b83a3a`) | `ErrorFilled` |
| `warning` | `bg/warningSoft` | `icon/warning` (`#74480c`) | `WarningAltFilled` |
| `empty` | `bg/neutralSoft` | `icon/disabled` (`#9a9ba1`) | `Image` |

En Figma el icono por defecto es la marca kubo re-teñida en los 5 estados;
acá se usan glifos de estado porque comunican mejor sin depender de la
marca. Para replicar Figma, pasá `icon={<Brand type="secondary" />}`.

Halo: círculo `bg/surface` con `filter: blur()`. `--_focal` (lado del halo
y del icono) y `--_blur` escalan con `size`: `xxs` 16/3 · `xs` 32/6 · `sm`
40/7.7 · `md` 56/11 · `lg` 100/12.8 (los dos últimos, de Figma).

> La `mask` colorea la **silueta** de la acuarela con un color plano (bordes
> suaves de la textura). El original de Figma tiene variación pictórica
> multitono; a la escala de uso (detrás del halo) la silueta teñida lee
> igual y queda 100% tokenizada. Si en algún caso se necesita el detalle
> exacto, el consumidor pasa su propia ilustración por `type="slot"`.

## Uso en `SystemFeedback`

`SystemFeedback.media` acepta cualquier nodo — el uso típico es un
`ImgSlot`: `size="lg"` en `emphasis="high"` (la banda de 160px), `size="sm"`
en `emphasis="low"` (56px). El `state` del `ImgSlot` normalmente espeja el
`state` de `SystemFeedback`, pero son props independientes.

## Accesibilidad

- `feedbackState` es decorativo: `wash` / `halo` / `icon` van `aria-hidden`.
  El significado del estado lo comunica el `label` / `supporting` del patrón
  que lo contiene, no esta ilustración.
- `type="slot"` con `children`: el `alt` / rol accesible es responsabilidad
  del nodo que pasa el consumidor.

> Referencia: [Calipso 2.0 — _building_blocks_img_component](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2614-315097)
