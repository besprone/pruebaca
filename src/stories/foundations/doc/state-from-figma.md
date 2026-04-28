## Capa `state`

Todos los **componentes interactivos** incluyen una capa interna llamada **state**. Esa capa:

- Controla el **feedback visual** de interacción.
- Usa **exclusivamente** tokens semánticos de estado.
- **No** se modifica a mano en instancias de producto.
- **No** altera el layout.
- Vive **dentro** del componente, no en la app final.

## Reglas (sistema)

- Nunca usar **primitives** directos.
- Nunca usar **hex manual** en la capa state.
- Nunca **override** desde el producto.

## Por token (resumen desde Figma)

Valores y alias conceptuales del frame **State**; los hex se resuelven a variables (modo actual).

| Token | Intención |
| --- | --- |
| `semantic/color/state/disabled` | Inactividad: inputs, chips, botones, toggles, cards. **Alias (~8% negro).** |
| `semantic/color/state/hover` | Hover universal. Overlay suave; no rompe legibilidad. **~4% negro.** |
| `semantic/color/state/focus` | Acompaña foco accesible; **no** sustituye el outline. **~4% negro.** |
| `semantic/color/state/focusRing` | Anillo de foco; alineado con `semantic/color/border/focus` (resuelve desde `ref/color/feedback/info/400` en el modo actual). |
| `semantic/color/state/pressed` | Pressed / active mientras se mantiene. **Misma magnitud que disabled** (8%): rol distinto. |
| `semantic/color/state/dragged` | Drag / reorder / swipe. Evitar en **fondos muy oscuros** (accesibilidad / visibilidad). |

> **En Figma** cada fila del tablero incluye texto de **Uso** y **Accesibilidad** amplios. Ver [State](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2644-16157).
