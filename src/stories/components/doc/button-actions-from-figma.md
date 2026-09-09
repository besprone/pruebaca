## ButtonActions

Botonera reutilizable — resuelve el **layout** de un grupo de 1–3 acciones
según el contexto donde vive. Figma: `patterns_buttons_actions`.

Patrón de **solo layout**: no crea botones nuevos, no redefine estados ni
tokens. Los hijos son `<Button>` normales; el `surface` sólo cambia
dirección, separación, alineación y ancho de esos botones. El padding del
borde lo pone el contenedor que la coloca (footer de diálogo,
`SystemFeedback`, card…), nunca la botonera — `padding: 0`.

## API

```tsx
<ButtonActions surface="dialog">
  <Button emphasis="ghost" size="sm">Cancelar</Button>
  <Button emphasis="primary" size="sm">Guardar</Button>
</ButtonActions>
```

| Prop | Valores | |
|---|---|---|
| `surface` | `screen` (def.) · `dialog` · `card` · `bottomSheet` · `feedbackState` | contexto → layout (tabla abajo) |
| `children` | `ReactNode` | 1–3 `<Button>`. El orden del markup es el orden visual |
| `className` | `string` | se combina con `button-actions` (el contenedor añade su padding aquí) |

`forwardRef<HTMLDivElement>`.

## `surface` → layout (validado contra Figma)

| `surface` | dirección | gap | alineación | ancho de los botones | uso |
|---|---|---|---|---|---|
| `screen` | column | **16** (`componentSpacing/space-200`) | center | **100%** (apiladas a lo ancho) | CTAs de pantalla completa — `SystemFeedback` `high`, sticky footer |
| `dialog` | row | 8 (`internalLayout/space-100`) | flex-end | auto | footer de diálogo (secundaria + primaria a la derecha) |
| `card` | row | 8 | flex-start | auto | acciones de card (a la izquierda) |
| `bottomSheet` | row | 8 | stretch | `flex: 1 1 0` (**50/50**) | footer de bottom sheet (dos botones iguales) |
| `feedbackState` | row + wrap | 8 | center | auto | estado compacto — `SystemFeedback` `low` |

`screen` es el único con `gap 16` y botones a lo ancho; el resto son filas
de `gap 8` con botones al contenido, cambiando sólo la alineación
(`dialog` derecha · `card` izquierda · `feedbackState` centro) — salvo
`bottomSheet` que reparte 50/50.

### El gap de `screen` es entre PÍLDORAS, no entre cajas táctiles

`Button` lleva un padding vertical de área táctil **fuera** de la píldora
visible (`4px` en `sm`, `8px` en `xs`, `0` en `md`). Apiladas, ese padding
se sumaba al `gap: 16` y los botones se veían a ~24px. `ButtonActions` lo
absorbe con un margin negativo en `surface="screen"`:

```css
.button-actions[data-surface='screen'] > .button {
  margin-block: calc(var(--button-block-inset, 0px) * -1);
}
```

`--button-block-inset` es un contrato que `Button` publica (= su padding
vertical de área táctil). Con esto el `gap 16` queda **entre las píldoras
visibles** —igual que los wrappers de altura fija (`h-40` / `h-32`) que usa
Figma para cada botón dentro de `patterns_buttons_actions`— y el área
táctil del `Button` se conserva (sólo cambia su caja de flujo). En `md`
(`--button-block-inset: 0`) el margin es `0`, sin efecto. Sólo se aplica a
`screen` (apilado sin wrap); las filas no tienen este problema porque el
`Button` no tiene padding horizontal.

`size` y `emphasis` de la variante de Figma **no** son props de la botonera —
describen los `<Button>` que van dentro. Correspondencia de tamaños que usa
`SystemFeedback`: `low` → `Button size="xs"` · `high sm` → `Button size="sm"`
· `high md` → `Button size="md"`.

## Uso en `SystemFeedback`

`SystemFeedback` envuelve su slot `actions` automáticamente:
`surface="screen"` en `emphasis="high"`, `surface="feedbackState"` en
`emphasis="low"`. El elemento lleva las dos clases
(`button-actions system-feedback__actions`): `ButtonActions` aporta
dirección/gap/ancho vía `[data-surface]`, y `SystemFeedback` añade sólo el
padding del "stickyCTAContainer" (`16/16/24` en `sm`, `16/0/0` en `md`) y el
`flex-shrink: 0` del modo sticky.

## Notas

- Los estados (hover/pressed/disabled/focus) y el color son cosa de cada
  `Button` — la botonera no los toca (Figma: "no redefine estados").
- El orden recomendado: en apilado (`screen`) el primario va **último**
  (más cerca del pulgar); en fila (`dialog`) va a la **derecha**.
- Dialog / BottomSheet / Card pueden adoptar `ButtonActions` en su footer en
  vez de replicar el flex — pendiente, fuera del alcance de este PR.

> Referencia: [Calipso 2.0 — patterns_buttons_actions](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2210-10061)
