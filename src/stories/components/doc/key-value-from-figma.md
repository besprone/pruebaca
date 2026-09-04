## KeyValue

Componente compuesto que agrupa múltiples filas de información estructurada
en formato key–value. Se utiliza para presentar datos financieros o
atributos relevantes de forma clara, alineada y jerárquica. Figma:
`components_key_value_group`.

## API

```tsx
<KeyValue divider elevation={0}>
  <KeyValueRow>
    <KeyValueKey>Capital invertido</KeyValueKey>
    <KeyValueValue>$10,000</KeyValueValue>
  </KeyValueRow>
  <KeyValueRow trailing={<Badge semantic="success" variant="soft" size="xs" label="Verificado" />}>
    <KeyValueKey icon={<Information />}>GAT Nominal</KeyValueKey>
    <KeyValueValue>10.49%</KeyValueValue>
  </KeyValueRow>
  <KeyValueRow>
    <KeyValueKey>Sello digital</KeyValueKey>
    <KeyValueValue expandable>1016594|100870541|…|SAT2026KUBO</KeyValueValue>
  </KeyValueRow>
</KeyValue>
```

Composición (no data-driven) — cada fila es un `KeyValueRow` con exactamente
una `KeyValueKey` y una `KeyValueValue`. Se eligió composición (como
`List`/`ListItem`) en vez de un array de datos porque cada building block
tiene su propio set de variantes (emphasis, multiline, color, promo,
expandable…) — un objeto plano por fila hubiera significado una explosión de
props redundantes.

### `KeyValue` (grupo)

| Prop | Valores | |
|---|---|---|
| `divider` | `boolean` (def. `true`) | separa las filas con `space-25` (2px). **No** dibuja líneas — solo agrega espacio. `false` → filas adyacentes (gap 0) |
| `elevation` | `0` (def.) · `2` | sombra del contenedor |

`children` = `KeyValueRow` (múltiples).

### `KeyValueRow`

| Prop | Valores | |
|---|---|---|
| `background` | `surface` (def.) · `canvas` | fondo de la fila |
| `trailing` | `ReactNode` | icono o `Badge` al final de la fila (distinto del `trailing` de `KeyValueValue`) |

`children` = una `KeyValueKey` + una `KeyValueValue`.

### `KeyValueKey`

| Prop | Valores | |
|---|---|---|
| `emphasis` | `boolean` (def. `false`) | `Body/md` (14/20) → `Headline/xs` (22/30) negrita. El color **no** cambia con emphasis (verificado contra Figma — el PDF sugiere que sí, se siguió el código) |
| `multiline` | `boolean` (def. `false`) | `false` → una línea con ellipsis · `true` → wrap |
| `color` | `default` (def.) · `accent` | |
| `icon` | `ReactNode` | icono contextual al inicio (20px) |

`children` = texto de la key.

### `KeyValueValue`

| Prop | Valores | |
|---|---|---|
| `emphasis` | `boolean` (def. `false`) | igual que en `KeyValueKey` |
| `color` | `default` (def.) · `accent` | |
| `promo` | `ReactNode` | texto breve junto al value (`Body/md` negrita, `text/accent`) |
| `trailing` | `ReactNode` | icono al final del value (20px) |
| `expandable` | `boolean` (def. `false`) | agrega el toggle "Ver completo / Ver menos" para revelar contenido largo que por default se trunca |
| `expanded` / `defaultExpanded` / `onExpandedChange` | | controlado / no controlado, como el resto de la librería |
| `expandLabel` / `collapseLabel` | `ReactNode` | def. `"Ver completo"` / `"Ver menos"` |

`children` = contenido del value. Por default siempre trunca a una línea con
ellipsis; `expandable` es el único mecanismo para revelarlo completo.

## Estructura

```
.key-value                          flex-col · radio 16 · elevación opcional
  .key-value-row ·N                   bg surface|canvas · padding
    .key-value-row__content             KeyValueKey + KeyValueValue
    .key-value-row__trailing            (opcional) icono / Badge
```

`KeyValueKey`/`KeyValueValue` son componentes de primer nivel (no anidados
por el DOM del Row) — cada uno trae su propio `.css`.

## Comportamiento

- **Ancho: prioridad asimétrica, no 50/50.** Por default la **key** absorbe
  el espacio (crece/envuelve/trunca) y el **value** mantiene su ancho
  natural — así un value corto-a-mediano ("Reinvertir el capital e
  intereses") nunca se trunca solo porque la key también es larga y
  envuelve. Cuando `expandable` está activo en el value, la prioridad se
  **invierte**: la key (normalmente una etiqueta corta: "Sello digital",
  "Hash") mantiene su ancho natural y el **value** absorbe el espacio y
  trunca — es exactamente el caso para el que existe `expandable`. El swap
  se resuelve con `:has()` (`KeyValueRow.css`), sin que el Row necesite un
  prop explícito.
- **Simplificación deliberada vs. Figma:** el building block real distingue
  `interaction: static | interactive` con dos layouts distintos
  (`items-center` + ancho natural vs. `items-start` + 50/50). Acá se
  unificó a **`items-start` siempre** — con contenido de una línea es
  visualmente idéntico a `center`, y evita reflow cuando un value se
  expande. El prop `interaction`/`expanded` a nivel de fila **no se
  expuso** — `expandable`/`expanded` viven enteramente en `KeyValueValue`,
  que es donde Figma también anida el `_building_blocks_menu_button`. Row
  no necesita saber nada de esto.
- **Texto expandido sin espacios** (sellos digitales, hashes): además de
  `white-space: normal`, se necesita `overflow-wrap: break-word` — estas
  cadenas no tienen puntos de quiebre naturales.
- `divider = true` → **solo** espacio (`space-25`) entre filas, nunca líneas
  divisorias.
- Cambiar `elevation` solo cambia la sombra, no el layout interno.

## Motion

Sin motion propio (ni en el grupo ni en las filas). El chevron del toggle
"ver completo/menos" rota 180° con `linear-200` al expandir/colapsar;
`prefers-reduced-motion` → sin transición.

## Accesibilidad

- El toggle es un `<button>` real con `aria-expanded` + `aria-controls`
  (apunta al `id` del texto del value) — foco por teclado, sin depender
  solo del color/chevron como indicador.
- Lectores de pantalla deben leer key seguida de value (orden del DOM).
- No se debe truncar información crítica sin la alternativa accesible
  (`expandable`).

## Tokens

| Elemento | Token |
|---|---|
| Fondo grupo | ninguno (cada fila trae `bg/surface` o `bg/canvas`) |
| Radio | `containers/radius-200` (16) |
| Separación entre filas (`divider`) | `internalLayout/space-25` (2) |
| Elevación | `Elevation/elevation-2` |
| Key / Value texto | `Body/md` (14/20/500) |
| Key / Value emphasis | `Headline/xs-emphasized` (22/30/700) |
| Key color default | `text/secondary` |
| Value color default | `text/primary` |
| Key/Value color accent, promo | `text/accentPrimary` — Figma pide `text/accent` (`#0a5647`, `ref/accent/mint/800`); ese token puntual no está en el pipeline, se mapeó a `text/accentPrimary` (`#0f7862`, `mint/700`), el más cercano ya existente en el sistema |
| Trailing icons | 20px, sin token de color propio (lo define el ícono/Badge que pase el consumidor) |
| Toggle label | `Body/md-semiemphasized` (14/20/600) · `text/brand` → `text/linkHover` (hover) → `text/linkPressed` (pressed) → `text/disabled` |
| Badge trailing | reutiliza `Badge` (`semantic="success" variant="soft"` = `bg/successMuted` + `border/success`, coincide exacto con el ejemplo de Figma) |

## Reglas de uso

Usar cuando se necesita mostrar información estructurada y comparable, con
múltiples atributos relacionados. **No** usar cuando se requiere
interacción compleja por fila o el contenido es narrativo. Mantener
consistencia: todas las filas del mismo grupo deben respetar el mismo
tamaño tipográfico; no mezclar radios distintos dentro del mismo grupo.

> Referencia: [Calipso 2.0 — components_key_value_group](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2484-11944)
