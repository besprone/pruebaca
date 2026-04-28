## Objetivo tipográfico

La capa de tipografía de Calipso busca:

- Consistencia entre App y Web.
- Jerarquía clara de lectura.
- Tokens reutilizables para diseño y código.
- Escala compacta, legible y accesible.

## Naming

`Typography/{Family}/{size-variant}`

Ejemplos: `Typography/Body/lg`, `Typography/Body/lg-emphasized`, `Typography/Display/md-semiemphasized`.

## Familias

- **Display**: títulos de máxima jerarquía.
- **Headline**: encabezados de sección.
- **Body**: contenido base, variantes emphasized/semi/link.
- **Button**: etiquetas de acciones.
- **Superscript**: numerales, labels y microtexto contextual.

## Uso recomendado

- Mantener roles semánticos por contexto (no cambiar tamaños arbitrariamente por pantalla).
- Reforzar jerarquía con peso (medium / semibold / bold) antes de inventar nuevas tallas.
- En enlaces, usar variantes `Body/*-link`.

## Reglas

1. No crear estilos ad-hoc fuera del catálogo.
2. Evitar mezclar más de 3 niveles jerárquicos en un mismo bloque.
3. Mantener line-height del token para legibilidad.
4. Priorizar contraste y tamaño legible en texto funcional.

## Accesibilidad tipográfica

- Body principal recomendado en `md` o `lg`.
- Para contenido crítico, evitar pesos demasiado ligeros.
- Validar contraste de color junto con los tokens de Color.

> Referencia del frame: [kubo.typography](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2594-24968).
