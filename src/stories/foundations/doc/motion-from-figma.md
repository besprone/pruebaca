## Objetivo

El sistema de motion define como emergen y se retiran superficies elevadas (overlays y bottom sheets) con una animacion consistente.

## Contrato de variables

En Figma, los nombres canonicos viven en la coleccion Motion:

- `spring/mass`
- `spring/stiffness`
- `spring/damping`
- `linear-200/duration-ms`
- `linear-200/easing`

> Nota: no existen paths `motion.spring/*` ni `motion.linear/*` en variables.

## Spring (implementacion)

Configuracion oficial:

- `spring/mass = 1`
- `spring/stiffness = 100`
- `spring/damping = 15`

Referencia:

`withSpring(value, { mass: 1, stiffness: 100, damping: 15 })`

Uso recomendado:

- Bottom sheets
- Overlays
- Superficies que emergen desde el borde inferior

## Linear-200

- `linear-200/duration-ms = 200`
- `linear-200/easing = linear`

Referencia:

`withTiming(value, { durationMs: <linear-200/duration-ms>, easing: <linear-200/easing> })`

## Prototipo en Figma

Para aproximar la experiencia en prototipo:

- Curva: `Smooth`
- Duracion: `800ms`
- Direccion de entrada: `Bottom`

## Buenas practicas

✅ Correcto

- Mantener el spring unico para todos los bottom sheets y overlays.
- Reutilizar los mismos parametros en todo el sistema.

❌ Incorrecto

- Crear variantes de motion por componente sin justificacion.
- Cambiar curva/duracion en Figma sin alinear implementacion.

> Referencia del frame: [kubo.motion](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2107-2239&t=fxj7jPnfPUSCumO3-1).
