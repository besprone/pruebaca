## Objetivo de elevación

La elevación define jerarquía y profundidad en App/Web con una escala corta y consistente.

## Escala

- `Elevation/elevation-0`: sin sombra.
- `Elevation/elevation-1`: ligera.
- `Elevation/elevation-2`: media.
- `Elevation/elevation-3`: alta.
- `semantic/color/bg/overlay`: overlay para superposición de pantalla.

## Web CSS (resumen)

- `elevation-0`: `0 0 0 0 transparent`
- `elevation-1`: `0 2px 4px 0 rgba(28,27,32,0.1)`
- `elevation-2`: `0 3px 8px 0 rgba(28,27,32,0.12)`
- `elevation-3`: `0 6px 12px 0 rgba(0,0,0,0.16)`

## Uso por intención

- `elevation-0`: superficies planas.
- `elevation-1`: tooltips, indicadores ligeros.
- `elevation-2`: cards y superficies elevadas.
- `elevation-3`: modal, drawer, panel/sheet.

## Reglas

- Usar sombra para jerarquía, no decoración.
- No mezclar múltiples sombras arbitrarias en el mismo componente.
- No usar sombras de color fuera del sistema.
- Mantener consistencia entre componentes equivalentes.

## React Native (iOS vs Android)

En RN, la misma intención de elevación se traduce distinto por plataforma:

- **iOS**: usa `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`.
- **Android**: usa principalmente `elevation` (la sombra visual depende del valor y del sistema).

### Configuración recomendada por token

- Guardar cada nivel (`elevation-0` ... `elevation-3`) como objeto semántico único.
- En runtime, mapear ese objeto a estilo RN:
  - `ios`: aplicar `shadow*` completos.
  - `android`: aplicar `elevation` y mantener `shadowColor` solo como fallback visual/documental.

Ejemplo de shape sugerido:

```ts
type RNElevation = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};
```

Regla práctica: aunque Android “viva” de `elevation`, mantén todos los campos en el token para que iOS/Android compartan la misma fuente semántica y sea más fácil testear/paridad visual.

## Alcance

Incluye: componentes elevados y superposición visual.  
No incluye: gradientes, glows, glassmorphism.

> Referencia: [kubo.elevation](https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2102-201).
