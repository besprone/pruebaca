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
| `expanded` / `defaultExpanded` / `onExpandedChange` | | controlado / no controlado |
| `leading` | `ReactNode` | slot al inicio del header, self-stretch (icono, o un `PaymentStatusIndicator`) |
| `contentLeading` | `ReactNode` | continúa `leading` a través del área expandida — ver `PaymentStatusIndicator` |
| `supporting` | `ReactNode` | texto secundario, arriba del content slot (`Body/md`, `text/secondary`) |
| `children` | `ReactNode` | content slot flexible: texto, listas, `KeyValue`, componentes, layouts complejos |
| `actions` | `ReactNode` | fila inferior de acciones — normalmente 1–2 `Button` a lo ancho completo |
| `aria-label` | `string` | nombre accesible del header si `label` no basta |

## Estructura

```
.accordion                          radio 16 · overflow hidden · bg/canvas (asoma en el gap)
  .accordion-item ·N                  bg/surface
    .accordion-item__row                leading? + header
      .accordion-item__leading            self-stretch
      .accordion-item__header             <button> — label + chevron (rota 180° al expandir)
    .accordion-item__content            alto animado (spring) — overflow hidden mientras anima
      .accordion-item__content-row        contentLeading? + content-block
        .accordion-item__content-block      supporting? + slot + actions?
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
antes de empezar. `AccordionItem` expone en su lugar `supporting` +
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
| Header — padding inline | `layout/stack/block` (16) |
| Header — alto mínimo | 56px |
| Label | `text/primary` · `Body/lg` (16/24/500) |
| Chevron | `icon/primary`, 24px, rota 180° al expandir |
| Hover / pressed del header | `semantic/color/state/hover` · `state/pressed` (mismo patrón que `ListItem`) |
| Content — padding inline | `layout/container/inline` (16, inicio) / `layout/stack/block` (16, fin) |
| Supporting | `text/secondary` · `Body/md` (14/20/500) |
| Actions — gap | `componentSpacing/space-200` (16) |

## Relación con otros patrones

Familia de "superficies expandibles" del sistema — no confundir con
`Dialog`/`SideDrawer`/`BottomSheet` (esos son overlays modales; `Accordion`
vive inline en el flujo de la pantalla, sin backdrop ni foco atrapado).

> Referencia: [Calipso 2.0 — pattern_accordion](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3413-8722) · [_building_blocks_accordion_item](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=3413-8660)
