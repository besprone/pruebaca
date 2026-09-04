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

## API

```tsx
<PaymentStatusIndicator status="paid" position="first" />
<PaymentStatusIndicator status="next" position="middle" />
<PaymentStatusIndicator status="future" position="last" />
<PaymentStatusIndicator status="offer" position="middle" number="003" />

{/* modo "puente" — solo la línea, sin ícono, para continuar el timeline
    a través del área expandida de un AccordionItem */}
<PaymentStatusIndicator status="next" position="middle" showIcon={false} />
```

| Prop | Valores | |
|---|---|---|
| `status` | `future` · `next` · `paid` · `offer` | ver tabla de estados abajo |
| `position` | `first` · `middle` (def.) · `last` | `first` → sin línea antes · `last` → sin línea después |
| `showIcon` | `boolean` (def. `true`) | `false` → solo la línea (modo puente, ver `Accordion`) |
| `number` | `ReactNode` | número mostrado dentro del círculo cuando `status="offer"` |

## Estados

| `status` | Ícono | Línea (antes y después — **mismo color a ambos lados**, no asimétrico) |
|---|---|---|
| `future` | círculo blanco, borde 1.2px `bg/disabled` | `bg/disabled` (gris) |
| `next` | círculo blanco, borde 1.2px `icon/success` (anillo verde) | `icon/success` (verde) |
| `paid` | círculo lleno `icon/success`, check blanco | `icon/success` (verde) |
| `offer` | círculo blanco, borde `bg/disabled`, número dentro (`Body/sm-se`, `text/secondary`) | `bg/disabled` (gris) |

> El PDF describe la línea de `next` como asimétrica (antes verde / después
> gris). El código de Figma no lo hace así: cada unidad pinta **ambos**
> lados de su línea con el color de su propio `status`. El efecto de
> "transición" que describe el PDF ocurre igual, pero emerge de apilar
> unidades con distinto `status` una tras otra — el "después" verde de una
> unidad `next` y el "antes" gris de la siguiente unidad `future` ocupan la
> misma franja visual, así que el corte de color aparece justo en el límite
> entre ambas. Se siguió el código.

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
| Número (`offer`) | `text/secondary` · `Body/sm-semiemphasized` (12/17/600) |

## Uso típico — timeline de pagos en un Accordion

```tsx
{plan.map((pago, i) => (
  <AccordionItem
    key={pago.label}
    label={pago.label}
    leading={<PaymentStatusIndicator status={pago.status} position={posicionDe(i, plan)} />}
    contentLeading={
      <PaymentStatusIndicator status={pago.status} position={posicionDe(i, plan)} showIcon={false} />
    }
    supporting={pago.supporting}
  >
    {/* contenido del pago */}
  </AccordionItem>
))}
```

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
