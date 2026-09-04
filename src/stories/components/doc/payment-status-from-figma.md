## PaymentStatusIndicator

Unidad vertical de un timeline de estados de pago: ícono de estado + líneas
de conexión arriba/abajo. Figma: `_building_block_paymentstatus` (+
`_building_block_paymentstatus_line`).

Puramente visual y decorativo (`aria-hidden`) — **no** es interactivo y
**no** debe ser el único indicador de estado (acompañar siempre con texto,
p. ej. el `label`/`supporting` del `AccordionItem` que lo usa).

> **Nota sobre el nombre en Figma:** el PDF describe este building block como
> "timeline horizontal de estados de pago" con "layout horizontal
> únicamente". El componente **real** en Figma no es así — es una unidad
> **vertical** (icono + líneas verticales), pensada para apilarse en una
> lista vertical de items (ver `Accordion type="paymentStatus"`), que es
> exactamente cómo se usa en todos los ejemplos compuestos del archivo. Se
> construyó siguiendo el código de Figma, no la prosa del PDF.

> **`_building_blocks_leading`:** en Figma, `PaymentStatusIndicator` se
> instancia siempre dentro de este wrapper genérico compartido (el mismo
> que envuelve íconos/avatares/checkboxes/etc. como `leading` de una fila —
> `type="paymentStatus", size="sm"`). El wrapper en sí es solo
> `display:flex; align-items:center; overflow:clip` sin tamaño propio — no
> aporta estructura extra, así que no se replicó como componente aparte;
> `AccordionItem`'s `.accordion-item__leading` cumple el mismo rol
> (contenedor + `overflow:hidden`).

## API

```tsx
<PaymentStatusIndicator status="paid" position="first" />
<PaymentStatusIndicator status="next" position="middle" />
<PaymentStatusIndicator status="future" position="last" />
<PaymentStatusIndicator status="future" position="middle" number="4" />
<PaymentStatusIndicator status="offer" position="middle" number="003" />

{/* el item anterior ya se pagó/es el próximo — la línea de "antes" se
    pinta verde aunque este item siga siendo `future` (ver nota abajo) */}
<PaymentStatusIndicator status="future" position="middle" previousStatus="paid" />

{/* modo "puente" — solo la línea, sin ícono, para continuar el timeline
    a través del área expandida de un AccordionItem */}
<PaymentStatusIndicator status="next" position="middle" showIcon={false} />
```

| Prop | Valores | |
|---|---|---|
| `status` | `future` · `next` · `paid` · `offer` | ver tabla de estados abajo |
| `position` | `first` · `middle` (def.) · `last` | con `showIcon` (header): `first` → sin línea antes · `last` → sin línea después. Con `showIcon={false}` (puente): el tramo es uno solo (sin split antes/después) — invisible completo solo en `last`, visible completo en `first`/`middle` (ver nota abajo) |
| `showIcon` | `boolean` (def. `true`) | `false` → solo la línea (modo puente, ver `Accordion`) |
| `number` | `ReactNode` | número de pago dentro del círculo — reemplaza el ícono en `future`/`offer` (mismo círculo gris, con el número en vez de vacío). Sin efecto en `next`/`paid` |
| `previousStatus` | `PaymentStatusValue` | status del item **anterior** en la secuencia. Si es `paid`/`next`, la línea de "antes" de este item se pinta verde en vez de con el status propio. Solo aplica con `showIcon=true` (el header) — ver nota abajo |

## Estados

| `status` | Ícono | Línea (antes y después — **mismo color a ambos lados**, no asimétrico) |
|---|---|---|
| `future` | círculo blanco, borde 1.2px `bg/disabled` — o con `number` dentro (`Body/sm-se`, `text/secondary`) si se pasa | `bg/disabled` (gris) |
| `next` | círculo blanco, borde 1.2px `icon/success` (anillo verde) | `icon/success` (verde) |
| `paid` | círculo lleno `icon/success`, check blanco | `icon/success` (verde) |
| `offer` | igual que `future` (círculo blanco, borde `bg/disabled`) — normalmente con `number` | `bg/disabled` (gris) |

> **`number` no es exclusivo de `offer`.** Se confirmó contra un ejemplo real
> compuesto de Figma: una fila con `status="future"` (no `offer`) mostraba un
> número de pago ("8") dentro del mismo círculo gris — el build inicial
> ataba `number` solo a `offer`, lo cual era incorrecto. `offer` y
> `future`+`number` comparten exactamente el mismo tratamiento visual;
> `offer` se mantiene como valor de `status` aparte porque es un nombre de
> variante real en Figma (uso: pagos especiales/promocionales), pero
> visualmente no se distingue de un `future` numerado.

> El PDF describe la línea de `next` como asimétrica (antes verde / después
> gris). El código **base** de Figma no lo hace así: confirmado 4 veces
> contra instancias reales distintas (2 composiciones diferentes +
> componente aislado, incluyendo el caso exacto de un item `future` pegado
> a uno `paid`) que cada unidad pinta ambos lados de su línea con el color
> de su propio `status`, sin mirar al vecino — el corte de color en Figma
> ocurre limpio justo en el límite entre dos círculos.
>
> **Deviación deliberada de producto (`previousStatus`):** a pesar de lo
> anterior, el sistema decidió agregar la validación que el PDF sugería —
> si el item anterior ya está `paid`/`next`, la línea de "antes" de este
> item se pinta verde aunque el item en sí siga `future`. Es un cambio
> consciente respecto al código base de Figma (no un hallazgo de que Figma
> ya lo hacía así), agregado vía la prop `previousStatus` en
> `PaymentStatusIndicator` — el componente no puede inferir el status del
> vecino por sí solo, así que el consumidor (la story, o cualquier
> composición real) se lo pasa explícitamente. Sin este prop (u omitiéndolo),
> el comportamiento es el de Figma sin modificar. Afecta solo el lado
> "antes" del **header** (`showIcon=true`) — `contentLeading` sigue
> reflejando únicamente el status propio del item, sin cambios.

> `offer` tampoco es un color especial — es el mismo círculo/línea gris de
> `future`, pero mostrando un número dentro del círculo en vez de vacío.

## Tokens

| Elemento | Token |
|---|---|
| Línea (gris) | `semantic/color/bg/disabled` |
| Línea (verde) | `semantic/color/icon/success` |
| Círculo `future`/`offer` | fondo `bg/surface`, borde 1.2px `bg/disabled` |
| Círculo `next` | fondo `bg/surface`, borde 1.2px `icon/success` |
| Círculo `paid` | fondo `icon/success` |
| Check (`paid`) | `semantic/color/icon/onSuccess` (blanco) |
| Número (`future`/`offer` + `number`) | `text/secondary` · `Body/sm-semiemphasized` (12/17/600) |

## Uso típico — timeline de pagos en un Accordion

```tsx
{plan.map((pago, i) => {
  const position = posicionDe(i, plan);
  return (
    <AccordionItem
      key={pago.fecha}
      label={pago.fecha}
      supporting={pago.monto}
      leading={
        <PaymentStatusIndicator status={pago.status} position={position} number={pago.numero} />
      }
      contentLeading={
        <PaymentStatusIndicator status={pago.status} position={position} showIcon={false} />
      }
    >
      {/* detalle del pago — típicamente un KeyValue, ver accordion-from-figma.md */}
    </AccordionItem>
  );
})}
```

> **`leading` y `contentLeading` usan el mismo `position` sin ajustar — el
> componente resuelve la diferencia internamente vía `showIcon`.** Historia
> real de cómo se llegó a esto (dos bugs encontrados y corregidos en rondas
> distintas):
>
> 1. Un primer intento le pasó el mismo `position` a ambas instancias sin
>    más — con `position="first"`, el propio lado "antes" de
>    `contentLeading` se volvía transparente (la regla correcta para el
>    header, donde `first` = nada arriba de todo el timeline). Pero
>    `contentLeading` **siempre** tiene algo arriba (el header de ese mismo
>    item, ya visible), nunca es el inicio absoluto — eso dejaba un hueco
>    visible entre el círculo del header y la línea reapareciendo junto a
>    la primera fila del contenido expandido.
> 2. Un segundo intento "arregló" esto remapeando `position` en la propia
>    story (`first → middle` solo para `contentLeading`) — funcionaba, pero
>    escondía el problema real: **`contentLeading` no tiene la estructura
>    antes/después del header** (no hay círculo en medio). En Figma es **un
>    solo tramo continuo** por item — confirmado con `get_design_context`
>    sobre 3 instancias reales distintas (`first`, `middle`, y el
>    verdadero `last` de la lista): `first`/`middle` renderizan un único
>    `_building_block_paymentstatus_line` con opacidad normal (visible de
>    punta a punta); el `last` real renderiza ese mismo único tramo con
>    `opacity-0` — **completamente invisible, no solo "después" cortado**.
>
> Fix definitivo, en `PaymentStatusIndicator` mismo: cuando `showIcon` es
> `false`, el lado "antes" usa la regla de `last` (no la de `first`) — así
> ambos lados (antes/después, que en la práctica son el mismo tramo visual
> ya que no hay círculo separándolos) solo se apagan juntos en `last`,
> nunca en `first`. La story ya no necesita ningún remapeo — pasa el mismo
> `position` a `leading` y `contentLeading` tal cual, y cada uno interpreta
> `first`/`last` correctamente según su propio `showIcon`.

**Por qué se ve completo aunque el contenedor `leading` centre por default:**
`PaymentStatusIndicator` trae `align-self: stretch` en su propia raíz — así
ocupa el alto completo (56px del header, o el alto del área expandida en
`contentLeading`) sin importar que `.accordion-item__leading` use
`align-items: center` (el default correcto para un ícono suelto). Sin este
`align-self`, el indicador colapsa a su alto de contenido (24px, el
círculo) y las líneas quedan con 0px de alto — invisibles. Si se nota el
timeline "cortado" (círculos flotando sin línea entre ellos), esto es lo
primero a revisar.

`leading` (header, ícono) + `contentLeading` (área expandida, solo línea) son
DOS instancias separadas — así lo hace Figma: el header de cada
`AccordionItem` tiene su propio `PaymentStatusIndicator` con ícono, y su
área de contenido (cuando expande) tiene una segunda instancia sin ícono
que continúa la línea a través de esa altura extra. Usar
`Accordion type="paymentStatus"` para que los items queden contiguos (gap
0) y la línea se vea continua entre uno y otro.

`position` se calcula por índice: `first` el primero, `last` el último,
`middle` el resto — es responsabilidad del consumidor (como con
`List`/`ListItem`), no algo que el componente infiera solo.

> Referencia: [Calipso 2.0 — _building_block_paymentstatus](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3829-21009)
