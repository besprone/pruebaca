## QuickAction

Acceso rápido a una acción clave (Home, Dashboard). Figma:
`patterns_quick_actions_single` + `patterns_quick_actions_group`.

Patrón de solo presentación — organiza `IconButton` (componente base) + un
label, sin definir lógica propia ni nuevos tokens/estilos.

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
| `size` | `sm` (def.) · `lg` | afecta el gap icono↔label y la tipografía del label — **no** el tamaño del `IconButton` (siempre `size="lg"`, ver nota abajo) |
| `scheme` | `brand` (def., verde) · `neutral` (escala de grises) | se aplica transversalmente a `IconButton` + label |
| `disabled` | `boolean` | el label seguido automáticamente al estado disabled del `IconButton` (`:has()`) |

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

El área táctil del patrón es siempre la misma (`IconButton size="lg"`),
independientemente de la densidad visual — coincide con la doc de Figma:
"Área táctil garantizada por el Icon button".

## `IconButton`: nuevo prop `scheme`

Este patrón requería que `IconButton` (ya usado en 13+ lugares del sistema)
soportara una paleta neutra además de la verde (`brand`) que ya tenía
hardcodeada. Se agregó `scheme?: 'brand' | 'neutral'` (def. `'brand'` —
100% retrocompatible, ningún consumidor existente pasa `scheme`, así que
su comportamiento no cambia).

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

- El `<button>` real es el `IconButton` — el label visible es
  `aria-hidden` y a la vez la fuente de su `aria-label` (`QuickAction`
  pasa `label` como `aria-label` del `IconButton` automáticamente, sin
  prop aparte).
- Área táctil garantizada por el `IconButton` (ver nota de `size` arriba).
- El ícono debe comunicar la acción sin depender solo del texto — decisión
  de contenido del consumidor, el patrón no la valida.

## Relación con otros componentes

- `IconButton`: componente base (ver nuevo prop `scheme` arriba).
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
