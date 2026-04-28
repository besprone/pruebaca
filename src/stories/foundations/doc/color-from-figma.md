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

- **Ref:** paletas (brand, neutral, accent, feedback) más **`ref/color/white-alpha`** y **`ref/color/black-alpha`** (tintes con opacidad para overlays y composición, según Figma *Palette*).
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

Son pigmentos del sistema. **No** se aplican directamente en la UI; alimentan la capa semántica. Las rampas **white-alpha** y **black-alpha** son `ref` (blanco o negro con alpha); resolución documentada: **sufijo /0 … /900** donde el número representa opacidad en la escala 0–1000 (p. ej. `/200` ≈ 20% → hex `#_ _ _ _ _ _33` en 8 caracteres).

## Semántica (consumo)

Solo los **tokens semánticos** se usan en diseño y código. Los `ref` son internos.

### Agrupación típica

`semantic.color.text` · `semantic.color.bg` · `semantic.color.border` · `semantic.color.icon` · `semantic.color.state`

Los nombres expresan **rol** (ej. “texto principal”, “fondo de tarjeta”), no un color decorativo suelto.

### Temas nativos de variables (Light e Inverse)

En Figma, `text`, `bg`, `border` e `icon` tienen **dos tablas de tema** (light e inverse). Esto es distinto a los tokens que se llaman `.../inverse`: en modo inverse también cambian varios tokens que no terminan en `inverse`.

| Capa | Ejemplos en **theme light** | Equivalentes en **theme inverse** |
| --- | --- | --- |
| **Text** | `text/primary → ref/neutral/900`, `secondary → neutral/600`, `brand → brand/700`, `linkDefault → brand/600` | `text/primary → ref/neutral/0`, `secondary → neutral/100`, `brand → brand/50`, `linkDefault → brand/400` |
| **Background** | `bg/surface → ref/neutral/0`, `canvas → neutral/50`, `brand → brand/700`, `accent → accent/700` | `bg/surface → ref/white-alpha/200`, `canvas → neutral/800`, `brand → brand/400`, `accent → accent/400` |
| **Border** | `border/subtle → ref/neutral/100`, `default → neutral/200`, `brand → brand/700`, `danger → error/600` | `border/subtle → ref/neutral/600`, `default → neutral/500`, `brand → brand/200`, `danger → error/200` |
| **Icon** | `icon/primary → ref/neutral/900`, `secondary → neutral/600`, `brand → brand/700`, `success → success/700` | `icon/primary → ref/neutral/0`, `secondary → neutral/100`, `brand → brand/50`, `success → success/200` |

Notas:
- `bg/inverse`, `text/inverse`, `border/inverse`, `icon/inverse` siguen existiendo y se usan como roles explícitos de inversión.
- `bg/inverseElevated` y overlays usan alpha (`white-alpha` / `black-alpha`) según contexto.
- `state` se mantiene como capa aparte (`semantic.color.state/*`), no en esta tabla.

### Tokens con nombre `*inverse*` (en ambos temas)

Aquí se agrupa la familia de tokens cuyo path contiene `inverse` (más `inverseElevated` en `bg`).  
Importante: estos tokens **también tienen valor por tema nativo** (light e inverse). Es decir, `text/inverse`, `bg/inverse`, `border/inverse`, `icon/inverse` no son “fijos”; cambian con el modo igual que el resto de semánticos.

No existe `ref/.../inverse`; el soporte de alpha base vive en `ref/color/white-alpha` y `ref/color/black-alpha`.

| Rol | Token (path) | Uso resumido |
| --- | --- | --- |
| Texto en superficie inversa | `semantic/color/text/inverse` | Copy principal claro sobre `bg/inverse` u otras capas oscuras. |
| Fondo inverso sólido | `semantic/color/bg/inverse` | Contenedor o pieza con bloque inverso. |
| Elevación inversa (overlay) | `semantic/color/bg/inverseElevated` | Sombreado/elevación con alpha sobre inverso. |
| Icono en contexto inverso | `semantic/color/icon/inverse` | Pictos en piezas o slots con inversión según sistema. |
| Contorno inverso | `semantic/color/border/inverse` | Bordes en UI oscura. |

**Regla:** en producto consume estas filas en **semantic** y siempre bajo el tema activo (light o inverse), combinando con **AA** y con el mapeo de la tabla superior.

### Reglas

- Nunca **ref** directo en componentes de producto.
- Siempre tokens **semánticos** en UI.
- Estados (hover, pressed, etc.) como **overlay** sobre el color del componente, salvo reglas del token.
- Textos **onX** para contraste automático en superficies de marca o feedback.

> **En Figma** el frame **kubo.color** documenta además el **uso y accesibilidad por token** (texto largo por variante). Aquí se muestran los **valores** actuales y el mapa; el detalle narrativo completo sigue en el archivo [Calipso 2.0 — Color](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2080-939).
