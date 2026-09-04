## Accordion

Agrupa varias secciones colapsables (`AccordionItem`). Figma:
`pattern_accordion` + `_building_blocks_accordion_item`.

Organiza información en bloques jerárquicos, reduciendo la carga visual
inicial y dejando que el usuario explore contenido bajo demanda. **No**
usar cuando todo el contenido debe estar visible siempre, cuando solo hay
1–2 secciones (usar tabs o secciones simples), o cuando la información es
crítica y no debe ocultarse.

## API

```tsx
<Accordion type="segmented">
  <AccordionItem label="¿Cómo solicito un crédito?" defaultExpanded>
    Ingresa a la app, selecciona "Solicitar crédito" y sigue los pasos.
  </AccordionItem>
  <AccordionItem label="¿Cuánto tiempo tarda la aprobación?">
    Entre 24 y 48 horas hábiles.
  </AccordionItem>
</Accordion>
```

### `Accordion`

| Prop | Valores | |
|---|---|---|
| `type` | `segmented` (def.) · `paymentStatus` | `segmented` → gap `space-25` (2px) entre items, para contenido general · `paymentStatus` → gap 0 (items contiguos), para que el `PaymentStatusIndicator` de cada item forme un timeline continuo |

`children` = `AccordionItem` (múltiples, mínimo 2 para que tenga sentido
como accordion). El patrón **no** coordina el expandido/colapsado entre
items — cada `AccordionItem` controla su propio estado; por default pueden
estar varios abiertos a la vez (confirmado en el PDF: "por defecto,
múltiples items pueden estar expandidos simultáneamente").

### `AccordionItem`

| Prop | Valores | |
|---|---|---|
| `label` | `ReactNode` | título — siempre visible |
| `supporting` | `ReactNode` | texto secundario del **header**, bajo `label` — siempre visible (ej. un monto bajo una fecha, como en el patrón `paymentStatus`). Distinto de `description` |
| `expanded` / `defaultExpanded` / `onExpandedChange` | | controlado / no controlado |
| `leading` | `ReactNode` | slot al inicio del header, self-stretch (icono, o un `PaymentStatusIndicator`) |
| `contentLeading` | `ReactNode` | continúa `leading` a través del área expandida — ver `PaymentStatusIndicator` |
| `description` | `ReactNode` | texto secundario del **content slot**, arriba de `children` — solo visible expandido (`Body/md`, `text/secondary`) |
| `children` | `ReactNode` | content slot flexible: texto, listas, `KeyValue`, componentes, layouts complejos |
| `actions` | `ReactNode` | fila inferior de acciones — normalmente 1–2 `Button` a lo ancho completo |
| `aria-label` | `string` | nombre accesible del header si `label` no basta |

`label` + `supporting` se renderizan con `ItemContent` (`_building_blocks_content`,
`src/components/ItemBlocks/`) — el mismo building block que ya usan
`ListItem`, `MenuItem` y `RailNavItem` — en vez de un `<span>` propio, para
heredar exactamente su tipografía/comportamiento. `supporting` en el header
es real: confirmado contra un ejemplo compuesto de Figma
(`components_key_value_group` dentro de un accordion de `payment_status`)
donde cada fila muestra fecha (`label`) + monto (`supporting`) — sin
`supporting`, la fila usa el alto mínimo de 56px; con él, crece de forma
natural (measured: 68px con `label`+`supporting`, `min-block-size` es solo
un piso, no una altura fija).

**`supporting` (header) vs. `description` (content slot):** dos props
distintas a propósito — `supporting` siempre está visible (parte del
`ItemContent` del header, como "$4,890.00" bajo "15 sep 2026"),
`description` solo aparece cuando el item está expandido (texto libre
antes de `children`). Nombres elegidos para no chocar entre sí ni con el
significado ya establecido de "supporting" en el resto del sistema
(`ListItem`, `KeyValueKey`, etc. — siempre "texto bajo el label,
visible").

**Ancho:** `Accordion`/`AccordionItem` son fluidos (`inline-size: 100%`),
sin min/max-width propio — no se encontró una restricción de tamaño en
Figma (el frame de 328px de los ejemplos es solo el ancho de demo, igual
que en el resto de componentes de este sistema). Si Figma sí define un
min/max explícito que no se pudo verificar por esta vía, avisar para
ajustarlo.

## Estructura

```
.accordion                          radio 16 · overflow hidden · bg/canvas (asoma en el gap)
  .accordion-item ·N                  bg/surface
    .accordion-item__row                leading? + header (16px inset + 12px gap si hay leading)
      .accordion-item__leading            self-stretch, margin-inline-start 16px
      .accordion-item__header             <button> — ItemContent (label+supporting) + chevron (rota 180° al expandir)
    .accordion-item__content            alto animado (spring) — overflow hidden mientras anima
      .accordion-item__content-row        contentLeading? + content-block
        .accordion-item__content-block      description? + slot + actions?
```

## Comportamiento

- El header **completo** es el área interactiva (un solo `<button>`, no un
  ícono aparte) — `aria-expanded` + `aria-controls` apuntando al `id` del
  contenido.
- Expandir/colapsar anima **alto + opacidad** con el mismo integrador de
  muelle del resto de la librería (`src/lib/spring` — mide `scrollHeight`,
  anima con `springTo`, fija `height:auto` al terminar de expandir para que
  el contenido pueda reflow libremente después). `prefers-reduced-motion` →
  sin animación, salta al estado final.
- Sin animación en el montaje inicial — `defaultExpanded`/`expanded` fijan
  el estado de una vez, sin reproducir la entrada.

## Deviaciones deliberadas de la spec de Figma

`_building_blocks_content_accordion` (el building block que en Figma
compone hasta 2 secciones de texto+botón con un separador entre ellas) **no
se construyó como componente aparte** — se decidió junto con el usuario
antes de empezar. `AccordionItem` expone en su lugar `description` +
`children` (slot libre) + `actions`, que cubren el caso de una sección. El
patrón de 2 secciones (poco común — el PDF lo limita a máx. 2, con reglas
específicas de separador y tipo de botón) se logra componiendo a mano
dentro de `children`:

```tsx
<AccordionItem label="Detalles del crédito" actions={<Button size="xs">Ver más</Button>}>
  <p>Primera sección de texto…</p>
  <hr style={{ border: 'none', borderTop: '1px solid var(--semantic-color-border-default)' }} />
  <p>Segunda sección de texto…</p>
</AccordionItem>
```

## Tokens

| Elemento | Token |
|---|---|
| Fondo contenedor (asoma en el gap `segmented`) | `semantic/color/bg/canvas` |
| Fondo de cada item | `semantic/color/bg/surface` |
| Radio del contenedor | `containers/radius-200` (16) |
| Gap `segmented` | `internalLayout/space-25` (2) |
| Gap `paymentStatus` | 0 |
| Header — padding inline | `layout/stack/block` (16) — si hay `leading`, este ya carga el inset de 16px (`margin-inline-start`) y el header solo aporta el gap de 12px (`internalLayout/space-150`) hasta el label |
| Header — alto mínimo | 56px |
| Label | `text/primary` · `Body/lg` (16/24/500) |
| Chevron | `icon/brand` (verde — hereda de `components_buttons_iconbutton`, no `icon/primary`), 24px reservados (sin caja de 48px extra: el hit-target es todo el header), rota 180° al expandir |
| Hover / pressed del header | `semantic/color/state/hover` · `state/pressed` (mismo patrón que `ListItem`) |
| `supporting` (header) | `text/secondary` · `Body/lg` (16/24/500 — mismo tamaño que `label`, vía `ItemContent`) |
| Content — padding inline | `layout/container/inline` (16, inicio) / `layout/stack/block` (16, fin) |
| `description` (content slot) | `text/secondary` · `Body/md` (14/20/500) |
| Actions — gap | `componentSpacing/space-200` (16) |

## Composición típica — timeline de pagos

El ejemplo real de Figma para `Accordion type="paymentStatus"` compone:
header con fecha (`label`) + monto (`supporting`) + `PaymentStatusIndicator`
en `leading`; contenido expandido = un `KeyValue` (`divider={false}`, filas
`background="canvas"`) con el detalle del pago, más `PaymentStatusIndicator
showIcon={false}` en `contentLeading` para continuar la línea. Ver la
story "Timeline de pagos" y `payment-status-from-figma.md`.

```tsx
<Accordion type="paymentStatus">
  <AccordionItem
    label="15 sep 2026"
    supporting="$4,890.00"
    leading={<PaymentStatusIndicator status="next" position="middle" />}
    contentLeading={<PaymentStatusIndicator status="next" position="middle" showIcon={false} />}
  >
    <KeyValue divider={false}>
      <KeyValueRow background="canvas">
        <KeyValueKey>Tasa anual</KeyValueKey>
        <KeyValueValue>10.50%</KeyValueValue>
      </KeyValueRow>
      {/* … */}
    </KeyValue>
  </AccordionItem>
</Accordion>
```

## Relación con otros patrones

Familia de "superficies expandibles" del sistema — no confundir con
`Dialog`/`SideDrawer`/`BottomSheet` (esos son overlays modales; `Accordion`
vive inline en el flujo de la pantalla, sin backdrop ni foco atrapado).

> Referencia: [Calipso 2.0 — pattern_accordion](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3413-8722) · [_building_blocks_accordion_item](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3413-8660)
