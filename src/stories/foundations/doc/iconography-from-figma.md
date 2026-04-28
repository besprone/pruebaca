## Objetivo

La iconografia en Calipso usa **Carbon Icons de IBM** como libreria estandar para App y Web.

## Biblioteca

- Libreria: Carbon Icons (IBM)
- URL: https://carbondesignsystem.com/elements/icons/library/

## Contrato de tamanos

En Figma el contrato canónico es con tokens `size/*` (no `iconography.size/*`):

- `size/16`
- `size/20`
- `size/24`
- `size/32`

## Reglas de uso

✅ Correcto

- Usar iconos Carbon sin redibujar.
- Aplicar colores con tokens semanticos (`semantic/color/text/*` o `semantic/color/icon/*` cuando aplique).
- Mantener proporciones originales.
- Separar icono y texto con tokens de spacing (`internalLayout/*`).

❌ Incorrecto

- Redibujar iconos.
- Cambiar opacidad manual.
- Alterar strokes.
- Mezclar estilos sin criterio (outline + filled).

## Nota de implementacion

En este Storybook se muestran iconos reales de Carbon a manera de catalogo visual y guia de tamanos.

> Referencia del frame: [kubo.iconography](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2106-170&t=fxj7jPnfPUSCumO3-1).
