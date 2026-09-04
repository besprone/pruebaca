## QuickAction

Acceso rápido a una acción clave (Home, Dashboard). Figma:
`patterns_quick_actions_single` + `patterns_quick_actions_group`.

Patrón de solo presentación — combina la estructura visual de `IconButton`
(componente base) + un label, sin definir lógica propia ni nuevos
tokens/estilos.

> **Es UN SOLO `<button>`, no anida un `IconButton`.** Primer intento sí
> instanciaba `<IconButton>` dentro de `QuickAction`, con el label como
> hermano fuera del botón (`aria-hidden`, decorativo) — el usuario notó que
> eso dejaba "clics muertos": hover/focus/clic sobre el label no hacían
> nada, aunque visualmente pareciera parte del mismo control. Fix: `QuickAction`
> reproduce la estructura visual de `IconButton size="lg"` (fondo, radio,
> ícono, hover/pressed) directamente sobre su propio `<button>` — mismo
> patrón que el chevron de `AccordionItem` (nunca anidar un componente que
> renderiza su propio `<button>`/`<a>` dentro de otro elemento
> interactivo). Con esto: un solo tab-stop, un solo `aria-label`, y
> hover/pressed/clic cubren TODO el bloque (ícono + label) sin zonas
> muertas.

## API

```tsx
<QuickAction label="Invertir" icon={<Growth />} />
<QuickAction label="Depositar dinero" emphasis="secondary" icon={<PiggyBank />} />
<QuickAction label="Transferir" emphasis="ghost" scheme="neutral" icon={<SendAlt />} />
```

| Prop | Valores | |
|---|---|---|
| `label` | `string` | texto corto y accionable (máx. 2 líneas, luego trunca) — también es el `aria-label` del botón, no hace falta pasarlo aparte |
| `icon` | `ReactNode` | debe ser entendible sin depender solo del texto |
| `emphasis` | `primary` (def.) · `secondary` · `ghost` | **no cambia el tamaño** — solo comunica prioridad. Recomendado: un solo `primary` por grupo, el resto `secondary`/`ghost` |
| `size` | `sm` (def.) · `lg` | afecta el gap icono↔label y la tipografía del label — **no** el tamaño de la caja del ícono (siempre equivalente a `IconButton size="lg"`, ver nota abajo) |
| `scheme` | `brand` (def., verde) · `neutral` (escala de grises) | se aplica al ícono + label por igual |
| `disabled` | `boolean` | atributo `disabled` nativo del `<button>` — bloquea clic/foco/hover y desatura ícono + label automáticamente |

`QuickActionGroup` agrupa varias `QuickAction` en una fila balanceada:

```tsx
<QuickActionGroup size="lg" scheme="neutral">
  <QuickAction label="Invertir" icon={<Growth />} />
  <QuickAction label="Depositar" emphasis="secondary" icon={<PiggyBank />} />
  <QuickAction label="Transferir" emphasis="secondary" icon={<SendAlt />} />
</QuickActionGroup>
```

`size`/`scheme` del grupo se publican a las `QuickAction` hijas vía contexto
(mismo patrón que `List`/`ListContext`) — una hija con su propio
`size`/`scheme` explícito lo sobreescribe. Recomendado: 3–4 acciones por
grupo (más de 4 satura la interfaz — considerar scroll horizontal o
navegación a una vista secundaria).

## Nota clave: el `IconButton` interno siempre es `size="lg"`

Confirmado contra Figma: la variante `size="sm"` de `QuickAction` y la
variante `size="lg"` usan **exactamente el mismo** `IconButton` (padding
`internalLayout/space-150`=12, radio `controls/radius-150`=12, ícono 24px —
el tamaño `lg` de nuestro `IconButton`). La única diferencia entre
`size="sm"`/`"lg"` de `QuickAction` es:
- el gap entre ícono y label (`internalLayout/space-75`=6px vs
  `internalLayout/space-100`=8px)
- la tipografía del label (`Body/sm` 12/17/500 vs `Body/md` 14/20/500)

El área táctil del patrón es siempre la misma (equivalente a
`IconButton size="lg"`), independientemente de la densidad visual —
coincide con la doc de Figma: "Área táctil garantizada por el Icon
button".

## `IconButton` también ganó un prop `scheme` (adición independiente)

Este patrón necesitaba una paleta neutra además de la verde (`brand`) —
se agregó `scheme?: 'brand' | 'neutral'` (def. `'brand'`, 100%
retrocompatible) directamente a `IconButton` (ya usado en 13+ lugares del
sistema), ya que es el componente base de referencia para estos colores.
`QuickAction` **no instancia `IconButton`** (ver nota de arriba sobre por
qué es un solo `<button>`) — reproduce el mismo mapeo de tokens
directamente en su propio CSS, pero la tabla de abajo describe el mapeo
compartido por ambos.

| `emphasis` × `scheme` | Fondo | Ícono |
|---|---|---|
| `primary` × `brand` | `semantic/bg/brand` (verde) | `semantic/icon/onBrand` (blanco) |
| `primary` × `neutral` | `semantic/bg/neutral` (`#2b2a30`) | `semantic/icon/onNeutral` (blanco) |
| `secondary` × `brand` | `semantic/bg/brandSoft` | `semantic/icon/brand` |
| `secondary` × `neutral` | `semantic/bg/neutralSoft` | `semantic/icon/neutral` |
| `ghost` × `brand` | transparente | `semantic/icon/brand` |
| `ghost` × `neutral` | transparente | `semantic/icon/neutral` |

Los estados (hover/pressed/disabled/focus) no cambian con `scheme` — usan
los mismos tokens de `state/*` sin importar la paleta, tal como documenta
Figma ("El patrón no redefine estados").

## Label

Reglas de Figma seguidas al pie de la letra:
- Texto corto y accionable, máximo 2 líneas (`-webkit-line-clamp:2` en CSS)
- No editable tamaño ni tipografía — solo `size` de `QuickAction` cambia
  entre `Body/sm`/`Body/md`, sin overrides por instancia
- Color depende del énfasis/scheme (`text/brand` o `text/neutral`), nunca
  hardcodeado por instancia
- Ejemplos correctos (verbos cortos): "Invertir", "Depositar dinero",
  "Transferir", "Más"
- Ejemplos incorrectos (evitar, muy largos): "Realizar una inversión",
  "Agregar dinero a tu cuenta", "Iniciar proceso de transferencia"

## Accesibilidad

- `QuickAction` es un solo `<button>` real (ver nota de arriba) — el label
  visible es `aria-hidden` y a la vez la fuente de su `aria-label`, sin
  prop aparte. Un solo tab-stop, hover/pressed/clic cubren ícono + label
  por igual (sin clics muertos sobre el texto).
- Área táctil garantizada (equivalente a `IconButton size="lg"`, ver nota
  de `size` arriba).
- El ícono debe comunicar la acción sin depender solo del texto — decisión
  de contenido del consumidor, el patrón no la valida.

## Relación con otros componentes

- `IconButton`: componente base — `QuickAction` reproduce su estructura
  visual (no lo instancia, ver nota de arriba) y comparte su mapeo de
  tokens por `emphasis`/`scheme`.
- `QuickAction`: patrón de uso — icono + label, sin lógica propia.
- `QuickActionGroup`: agrupación de layout — no rediseña las `QuickAction`
  hijas, solo el espaciado/alineación entre ellas (tokens globales de
  spacing, sin valores fijos propios del patrón).

## Notas de implementación (de Figma, aplicadas literalmente)

- No se permiten tamaños variables dentro de un mismo grupo — es
  responsabilidad del consumidor mantener el mismo `size`/`scheme` en
  todos los hijos (el contexto de `QuickActionGroup` lo facilita, pero no
  lo fuerza — un hijo puede seguir pasando su propio `size`/`scheme`).
- No se permiten overrides de tipografía en el label.
- El énfasis se controla únicamente desde el `IconButton` (prop
  `emphasis`), nunca desde el patrón.
- El grupo no introduce tokens de spacing/color nuevos — reutiliza
  `componentSpacing/space-200` para gap y padding.

> Regla final del sistema (Figma): "Quick actions es un patrón de uso, no
> un botón nuevo. El énfasis comunica prioridad, no el tamaño." /
> "Quick actions group organiza acciones, no crea nuevas. La consistencia
> del layout es más importante que la flexibilidad individual."

> Referencia: [Calipso 2.0 — patterns_quick_actions_single](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=2188-15283) · [patterns_quick_actions_group](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4335-19643)
