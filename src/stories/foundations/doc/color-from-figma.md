## Objetivo

El sistema de color de Calipso:

- Mantiene una estructura industry-grade (Material/Apple/Fluent).
- Separa **roles semánticos** (lo que significa un color en UI) de **tokens base (ref)**.
- Asegura accesibilidad **AA** en texto, iconos y contrastes.
- Permite escalabilidad en **Web + App** con un solo set de tokens.
- Minimiza colores decorativos y favorece decisiones de diseño consistentes.

## Arquitectura

El sistema se construye bajo **roles semánticos**. Los colores *ref* son base y **no** se usan directamente en producto. El consumo es solo por **tokens semánticos**: consistencia, escalabilidad, posible dark mode y cumplimiento **AA**.

### Estructura (nivel sistema)

- **Ref:** paletas `ref/green` (brand), `ref/neutral`, `ref/success` · `ref/error` · `ref/warning` · `ref/info` (feedback), `ref/accent/mint` y `ref/accent/orchid` (acentos de marca kubo; maestro usa `ref/accent/yellow` y `ref/accent/red`), más **`ref/whiteAlpha`** y **`ref/blackAlpha`** (tintes con opacidad para overlays y composición).
- **Semántica:** Text, Background, Border, Icon, **State** (overlays de interacción)

### Accesibilidad

- Texto primary/secondary cumple **AA** sobre canvas y surface.
- Estados usan overlays alineados a **WCAG**.
- Tokens **onColor** aseguran contraste sobre superficies sólidas.

### Buenas prácticas (resumen)

- No usar color brand como texto sobre brand claro.
- No usar *tertiary* para contenido crítico.
- No usar *disabled* en contenido informativo.
- Usar **focus ring** para accesibilidad AA en foco.

## Ref (base)

Son pigmentos del sistema. **No** se aplican directamente en la UI; alimentan la capa semántica. Las rampas **`ref/whiteAlpha`** y **`ref/blackAlpha`** son `ref` (blanco o negro con alpha); resolución documentada: **sufijo /0 … /900** donde el número representa opacidad en la escala 0–1000 (p. ej. `/200` ≈ 20% → hex `#_ _ _ _ _ _33` en 8 caracteres).

## Marca (kubo · maestro)

En Figma la colección **`_ Color · brand`** tiene dos modos de marca — **kubo** y **maestro**. Solo tres familias semánticas dependen de la marca: **`brand`**, **`accentPrimary`** y **`accentSecondary`** (con sus variantes `Soft` / `Muted` / `Strong` / `on*`). El resto de la semántica (`neutral`, feedback, `text/bg/border` estructurales) es igual en las dos marcas.

Este repo **shippea kubo**. Los `--semantic-color-*` y `colors-from-figma.css` están resueltos con kubo; `figma-color-tokens.ts` y `semantic-theme-aliases.ts` lo dicen en el encabezado. maestro todavía no está en el repo (escalas `ref/accent/yellow` y `ref/accent/red` + el modo maestro): entra cuando se aborde la tematización por marca.

| Rol | Ref en **kubo** | Ref en **maestro** |
| --- | --- | --- |
| `brand` (`bg` / `text` / `border` / `icon`) | `ref/green/700` | `ref/neutral/800` |
| `brand/Soft` · `brand/Muted` | `ref/green/100` · `/50` | `ref/neutral/100` · `/50` |
| `accentPrimary` (`bg`) | `ref/accent/mint/300` | `ref/accent/yellow/300` |
| `accentPrimary` (`text` / `icon`) | `ref/accent/mint/700` | `ref/accent/yellow/900` |
| `accentPrimary/border` · `/borderStrong` | `ref/accent/mint/400` · `/600` | `ref/accent/yellow/400` · `/600` |
| `accentSecondary` (`bg`) | `ref/accent/orchid/300` | `ref/accent/red/300` |
| `accentSecondary` (`text` / `icon`) | `ref/accent/orchid/700` | `ref/accent/red/700` |

> La familia **`neutral`** (`bg/neutral`, `bg/neutralSoft/Muted`, `text/neutral`, `icon/neutral`, `on*`) **no es de marca**: siempre resuelve de `ref/neutral`. Es el gris de sistema para chips / badges / tags sin carga semántica.

## Semántica (consumo)

Solo los **tokens semánticos** se usan en diseño y código. Los `ref` son internos.

### Agrupación típica

`semantic.color.text` · `semantic.color.bg` · `semantic.color.border` · `semantic.color.icon` · `semantic.color.state`

Los nombres expresan **rol** (ej. “texto principal”, “fondo de tarjeta”), no un color decorativo suelto.

### Familias de acento y neutral

| Familia | Para qué | Nota |
| --- | --- | --- |
| `brand` | Acción principal, foco de marca (CTA, selección, énfasis). | De marca. |
| `accentPrimary` | Acento decorativo de marca — badges/pills destacados, ilustración, realce visual secundario. | De marca (kubo: mint). No es una acción. |
| `accentSecondary` | Segundo acento decorativo para contraste/variedad frente a `accentPrimary`. | De marca (kubo: orchid). |
| `neutral` | Elementos neutros sin carga semántica — chips, tags, badges informativos de baja prioridad. | No es de marca; gris de sistema. |

`accentPrimary` / `accentSecondary` **no** sustituyen a `brand` para acciones ni a los tokens de feedback (`success` / `warning` / `danger` / `info`) para estado.

### Temas nativos de variables (Light e Inverse)

En Figma, `text`, `bg`, `border` e `icon` tienen **dos tablas de tema** (light e inverse). Esto es distinto a los tokens que se llaman `.../inverse`: en modo inverse también cambian varios tokens que no terminan en `inverse`.

| Capa | Ejemplos en **theme light** | Equivalentes en **theme inverse** |
| --- | --- | --- |
| **Text** | `text/primary → ref/neutral/900`, `secondary → neutral/600`, `brand → green/700`, `linkDefault → green/700` | `text/primary → ref/neutral/0`, `secondary → neutral/100`, `brand → green/50`, `linkDefault → green/400` |
| **Background** | `bg/surface → ref/neutral/0`, `canvas → neutral/50`, `brand → green/700`, `accentPrimary → accent/mint/300` | `bg/surface → ref/whiteAlpha/200`, `canvas → neutral/800`, `brand → green/400`, `accentPrimary → accent/mint/400` |
| **Border** | `border/subtle → ref/neutral/100`, `default → neutral/200`, `brand → green/700`, `danger → error/600` | `border/subtle → ref/neutral/600`, `default → neutral/500`, `brand → green/200`, `danger → error/400` |
| **Icon** | `icon/primary → ref/neutral/900`, `secondary → neutral/600`, `brand → green/700`, `success → success/700` | `icon/primary → ref/neutral/0`, `secondary → neutral/100`, `brand → green/50`, `success → green/200` |

Notas:
- `bg/inverse`, `text/inverse`, `border/inverse`, `icon/inverse` siguen existiendo y se usan como roles explícitos de inversión.
- Los overlays (`bg/overlay`, `border/overlay`) usan negro con alpha; en inverse, `bg/surface/subtle/brandSoft…` resuelven vía `ref/whiteAlpha` / `ref/blackAlpha`.
- `state` se mantiene como capa aparte (`semantic.color.state/*`), no en esta tabla.
- Familias nuevas de marca: `neutral` (chips/badges neutros), `accentPrimary` (kubo: mint) y `accentSecondary` (kubo: orchid), cada una con `bg` · `bgSoft/bgMuted` · `border` · `text` · `icon` · `on*`.

### Tokens con nombre `*inverse*` (en ambos temas)

Aquí se agrupa la familia de tokens cuyo path contiene `inverse`.  
Importante: estos tokens **también tienen valor por tema nativo** (light e inverse). Es decir, `text/inverse`, `bg/inverse`, `border/inverse`, `icon/inverse` no son “fijos”; cambian con el modo igual que el resto de semánticos.

No existe `ref/.../inverse`; el soporte de alpha base vive en `ref/whiteAlpha` y `ref/blackAlpha`.

| Rol | Token (path) | Uso resumido |
| --- | --- | --- |
| Texto en superficie inversa | `semantic/color/text/inverse` | Copy principal claro sobre `bg/inverse` u otras capas oscuras. |
| Fondo inverso sólido | `semantic/color/bg/inverse` | Contenedor o pieza con bloque inverso. |
| Icono en contexto inverso | `semantic/color/icon/inverse` | Pictos en piezas o slots con inversión según sistema. |
| Contorno inverso | `semantic/color/border/inverse` | Bordes en UI oscura. |

**Regla:** en producto consume estas filas en **semantic** y siempre bajo el tema activo (light o inverse), combinando con **AA** y con el mapeo de la tabla superior.

### Reglas

- Nunca **ref** directo en componentes de producto.
- Siempre tokens **semánticos** en UI.
- Estados (hover, pressed, etc.) como **overlay** sobre el color del componente, salvo reglas del token.
- Textos **onX** para contraste automático en superficies de marca o feedback.

> **En Figma** el frame **kubo.color** documenta además el **uso y accesibilidad por token** (texto largo por variante). Aquí se muestran los **valores** actuales y el mapa; el detalle narrativo completo sigue en el archivo [Calipso 2.0 — Color](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2080-939).
