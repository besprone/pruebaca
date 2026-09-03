## AlphabetIndex

Índice alfabético vertical al **borde derecho** de una lista larga
(100+ items) organizada alfabéticamente — contactos, países, ciudades,
directorios. Tap o drag sobre una letra → salto directo a esa sección.
Figma: `components_alphabet_index`.

**No es standalone**: siempre acompaña a una lista con headers de sección, y
nunca debe ser la única forma de navegar (dar también search / scroll normal).

## Uso

```tsx
const [active, setActive] = useState('A');

<AlphabetIndex
  available={lettersWithContent}   // A, B, D, F, … — el resto se atenúa
  activeLetter={active}
  onLetterChange={(letter) => {
    document.querySelector(`[data-section="${letter}"]`)
      ?.scrollIntoView({ block: 'start', behavior: 'auto' });
    setActive(letter);
  }}
/>
```

**El scroll de la lista lo hace quien lo monta** (vía `onLetterChange`). El
componente sólo posee el strip, el gesto (tap + drag-scrub), el feedback y la
accesibilidad. El **posicionamiento** (`absolute`/`fixed` a la derecha,
centrado vertical) también lo pone el contenedor.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `letters` | `readonly string[]` | `ALPHABET_ES` (A–Z con **Ñ** entre N y O) | añade `#` si quieres números |
| `available` | `readonly string[]` | — | letras con contenido; las demás se ven atenuadas y no disparan `onLetterChange` |
| `activeLetter` | `string` | — | letra de la sección visible ahora — la resalta (`bg/brandSoft`) |
| `onLetterChange` | `(letter) => void` | — | al tocar o arrastrar sobre una letra habilitada (**continuo** en drag, dedup por letra) |
| `showOverlay` | `boolean` | `false` | burbuja grande con la letra actual mientras se interactúa (estilo iOS Contactos) |
| `size` | `default` (16px) · `compact` (12px) | `default` | `compact` para pantallas pequeñas o A–Z+# |
| `aria-label` | `string` | `Índice alfabético` | |

## Comportamiento

- **Tap** en una letra → `onLetterChange(letra)`.
- **Drag** vertical sobre el strip (`touch-action: none`, pointer capture) →
  `onLetterChange` en cada letra que cruza el dedo. Feedback continuo: la letra
  bajo el puntero hace `scale(1.1)` + `bg/brandSoft`.
- **Teclado**: `↑` / `↓` recorren y disparan, `Home` / `End`, `Enter` / `Espacio`.
- Letras en `available` inexistentes → `data-disabled` (color `text/disabled`,
  sin respuesta). Alternativa de sistema (no implementada aquí): saltar a la
  letra más cercana con contenido.

## Motion

- Letra `pressed`: `transform: scale(1 → 1.1)` + fade de `bg/brandSoft`, con
  `linear-200`.
- `showOverlay`: fade-in 100ms al aparecer; se oculta 200ms después de soltar.
- `prefers-reduced-motion: reduce` → sin scale ni animación de overlay.

## Tokens

| Elemento | Token |
|---|---|
| Letra | `semantic/color/text/brand` · Body/xs-emphasized (10/15/700) |
| Letra activa / pressed | fondo `semantic/color/bg/brandSoft` |
| Letra sin contenido | `semantic/color/text/disabled` |
| Overlay | `semantic/color/bg/surface` · `Elevation/elevation-2` · Headline/sm-emphasized · `text/brand` |
| Ancho strip | 16px (`default`) · 12px (`compact`) |

Único token que define Figma: `semantic/color/text/brand`.

## Accesibilidad

- Contenedor `role="toolbar"` + `aria-orientation="vertical"`, `aria-label`
  «Índice alfabético». Cada letra es un `<button>` («Ir a la sección A»).
- **Roving tabindex**: sólo la letra activa (o la primera) es `tabIndex=0`.
- Área táctil: el strip es la superficie del gesto; el drag hace innecesaria la
  precisión por letra. El visual es 16px (Figma) — para tap fino, expandir la
  zona de gesto horizontalmente, no el tamaño visual.
- **Nunca la única navegación**: acompañar siempre de search / scroll.

## Reglas de uso

- Sólo con listas verticales organizadas alfabéticamente, con headers de
  sección, y > ~30–50 items.
- Siempre al borde derecho (convención iOS/Android; zona del pulgar; no estorba
  al back/menú de la izquierda).
- No usar en listas cortas, no alfabéticas, o cuando el search es la navegación
  predominante.

> Referencia: [Calipso 2.0 — components_alphabet_index](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3910-13439)
