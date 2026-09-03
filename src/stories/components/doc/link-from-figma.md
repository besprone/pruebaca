## Link

Elemento de texto interactivo que **navega** a otra vista o URL. **No es un
botón** — no dispara acciones, solo navega. Figma: `components_link`.

## Anatomía

- **Label** — el texto (subrayado).
- **Underline** — indicador visual de enlace, siempre visible.

Sin icono: `components_link` es solo `<a>` + texto. Es **inline**, fluye dentro
del párrafo.

## API

```tsx
<Link href="/movimientos/123">Ver detalle del movimiento</Link>
```

| Prop | Valores | |
|---|---|---|
| `children` | `ReactNode` | el texto del enlace |
| `href` / `target` / `rel` / `onClick` … | | atributos nativos de `<a>` (se hacen spread) |
| `state` | `default` (def.) · `hover` · `pressed` | **fuerza** el estado visual para demos/documentación; los estados reales salen del CSS (`:hover` bajo `@media (hover: hover)`, `:active`) |

`forwardRef<HTMLAnchorElement>`.

## Estados

| state | token texto + underline |
|---|---|
| `default` | `semantic/color/text/linkDefault` (`#1f6f21`) |
| `hover` (solo web/desktop) | `semantic/color/text/linkHover` (`#165517`) |
| `pressed` (feedback táctil / click) | `semantic/color/text/linkPressed` (`#0e3a0f`) |

El subrayado usa `currentColor`, así que cambia con el texto. Grosor
`text-decoration-thickness: 0.1em` (Figma `decoration 10%`). Foco visible:
`outline` 2px `semantic/color/border/focus`.

## Tipografía

`Body/lg-link` — Open Sans **Medium (500)**, 16 / 24, letter-spacing 0.

## Dimensiones

Ancho y alto **adaptables al contenido** (Figma muestra 41×24 con "Label"); alto
efectivo = line-height 24. `padding: 0`.

## Reglas de uso

- Para **navegación** a otra vista o URL, no para disparar acciones.
- **Siempre con underline visible** — no usar link sin subrayado.
- No usarlo como sustituto de `Button` / ghost button.
- El label debe **describir el destino** — no "click aquí" / "ver más" sin
  contexto.

> Referencia: [Calipso 2.0 — components_link](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4409-25453)
