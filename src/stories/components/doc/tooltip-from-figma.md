## Tooltip

Panel flotante con información contextual sobre un ancla, al hacer **hover o
focus**. Figma: `components_tooltip`. **No es interactivo** (no recibe clicks ni
contiene acciones) y no bloquea el contenido de abajo.

## Uso

Envuelve el ancla (un único elemento que acepte `ref`):

```tsx
<Tooltip content="Más información sobre el interés compuesto">
  <IconButton aria-label="Información" icon={<Information />} />
</Tooltip>
```

Se renderiza en un **portal** sobre `document.body`; el componente calcula la
posición (`position: fixed`, flip, clamp al viewport). Añade `aria-describedby`
al ancla mientras está visible.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `content` | `ReactNode` | — | texto principal (obligatorio para que tenga sentido) |
| `heading` | `ReactNode` | — | título opcional, más fuerte que `content` (lo requiere) |
| `slot` | `ReactNode` | — | ícono / imagen dentro del tooltip |
| `side` | `top` · `right` · `bottom` · `left` | `top` | lado preferido; hace **flip** si no cabe |
| `align` | `start` · `center` · `end` | `center` | eje cruzado |
| `openDelay` | `number` | `200` | delay de entrada (0 en salida); se **omite** entre anclas consecutivas (<300 ms) |
| `open` / `onOpenChange` | `boolean` / `(open) => void` | — | control externo (ignora hover/focus) |
| `disabled` | `boolean` | `false` | no se muestra |
| `children` | `ReactElement` | — | el ancla |

**Combinaciones válidas**: `content` · `content + slot` · `heading + content` ·
`heading + content + slot` · `slot` solo. `heading` sin `content` es inválido.

## Dimensiones / tokens

- Ancho **200px** (máx.), alto adaptativo (máx. 280). Padding `12px`. Gap interno
  `8px`. Radio `controls/radius-150` (12px). Offset ancla↔tooltip **8px**.

| Elemento | Token |
|---|---|
| Container bg / borde / sombra | `bg/surface` · `border/default` · `elevation-3` |
| Heading | `text/primary` · `Body/md-semiemphasized` (14/20/600) |
| Content | `text/secondary` · `Body/sm` (12/17/500) |

## Comportamiento

- Se muestra en `pointerenter` / `focus` del ancla; se oculta en
  `pointerleave` / `blur` / `Escape`.
- **Posición**: se calcula del `getBoundingClientRect` del ancla y del tooltip.
  Si el `side` preferido no tiene espacio y el opuesto sí → **flip**. El eje
  cruzado se recorta (`clamp`) al viewport con 8px de margen. Recalcula en
  `scroll` (captura) y `resize`.
- **Motion**: entrada `opacity` 0→1 + `scale(0.95→1)` con `linear-200`; el origen
  de la escala mira al ancla (`data-side`). Salida sin delay. Con
  `prefers-reduced-motion` no hay transform ni transición.

## Reglas de uso

- Aclarar el propósito de un elemento (ícono sin label, botón truncado).
- **No** para información crítica u obligatoria — el contenido debe ser opcional.
- **No** debe contener acciones ni elementos interactivos.
- Evitar textos largos; si es extenso, usar popover / modal.
- El ancla debe ser enfocable por teclado (un `<span>`/`<svg>` necesita
  `tabIndex={0}`) para que el tooltip sea accesible.

> Referencia: [Calipso 2.0 — components_tooltip](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4231-28238)
