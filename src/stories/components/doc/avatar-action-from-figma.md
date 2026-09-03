## AvatarAction

Chip de identidad de la cuenta: avatar + nombre + texto de apoyo, y
opcionalmente despliega un panel con las acciones de cuenta. Figma:
`components_avatar_action`. Se usa en headers / navegación para representar al
usuario activo.

## Uso

```tsx
const [open, setOpen] = useState(false);

<AvatarAction
  label="Marco Antonio"
  supporting="marco@kubo.mx"
  avatarProps={{ type: 'img', src: photo, alt: 'Tu perfil' }}
  open={open}
  onOpenChange={setOpen}
>
  <List role="menu" aria-label="Cuenta">
    <ListItem role="menuitem" interactive label="Mi perfil"     onClick={() => setOpen(false)} />
    <ListItem role="menuitem" interactive label="Configuración"  onClick={() => setOpen(false)} />
    <ListItem role="menuitem" interactive label="Cerrar sesión"  onClick={() => setOpen(false)} />
  </List>
</AvatarAction>
```

El **contenido del panel es un pattern** — normalmente una `List` / `Dropdown`
de acciones. `AvatarAction` no lo define; solo lo monta y orquesta abrir/cerrar.

## Propiedades

| Prop | Valores | Default | |
|---|---|---|---|
| `type` | `menu` · `button` | `menu` | `menu` muestra chevron y despliega `children`; `button` es acceso directo sin panel |
| `label` | `ReactNode` | — | nombre de la cuenta (Body/sm-semiemphasized · text/primary) |
| `supporting` | `ReactNode` | — | correo / rol (Body/xs · text/secondary) |
| `avatarProps` | `Omit<AvatarProps,'size'>` | — | props del `<Avatar>` (el `size` es fijo `sm`) |
| `avatar` | `ReactNode` | — | escape hatch: un nodo propio en vez del `<Avatar>` |
| `children` | `ReactNode` | — | contenido del panel (`type="menu"`) |
| `open` / `defaultOpen` / `onOpenChange` | `boolean` / `boolean` / `(open)=>void` | — | control del panel |
| `onClick` | `(e)=>void` | — | `type="button"`: acción directa. En `menu` se dispara antes del toggle (llamar `preventDefault` lo cancela) |

Resto de props → al `<button>` interno.

## Comportamiento

- **`type="menu"`**: click / Enter / Espacio → alterna el panel. Escape cierra y
  devuelve el foco al chip. Click fuera cierra. El chevron rota 180° al abrir.
  El consumidor cierra al seleccionar una opción (`onOpenChange(false)`).
- **`type="button"`**: sin chevron ni panel; click → `onClick`.
- **Foco**: `:focus-visible` → anillo interno `state/focusRing` (1px, sin
  desplazar layout) + overlay `state/focus`.
- **Overlays** sobre `.avatar-action__state::after`: hover `state/hover`
  (`@media (hover:hover)`), pressed / open `state/pressed`.
- El panel se posiciona `absolute` bajo el chip (`top: 100% + 8px`,
  `inset-inline: 0`), **sin portal ni detección de colisión**: el contenedor
  debe tener espacio y `overflow: visible`. Para posicionamiento complejo,
  envolver con un popover propio.

## Dimensiones / tokens

- Chip: ancho **200px** (adapta), alto **40px**, pill (`circular items/radius-round`).
  Padding `4px` (izq.) / `12px` (der.), `4px` (vert.), gap **8px**.

| Elemento | Token |
|---|---|
| Chip bg | `semantic/color/bg/brandSoft` |
| Overlay hover / pressed·open / focus | `semantic/color/state/{hover,pressed,focus}` |
| Anillo de foco | `semantic/color/state/focusRing` (1px inset) |
| Label | `semantic/color/text/primary` · Body/sm-semiemphasized (12/17/600) |
| Supporting | `semantic/color/text/secondary` · Body/xs (10/15) |
| Chevron | `semantic/color/icon/brand` · 24px |
| Panel | `bg/canvas` · `border/default` · `containers/radius-300` (24) · `elevation-3` · padding `4` |
| Panel scroll | `max-height: 400`, `overflow-y: auto`, radio 20 (`containers/radius-250`) |

## Motion

Chevron: `transform: rotate` con `linear-200`. Panel: `opacity` + `translateY(-4px)`
al aparecer, `linear-200`. `prefers-reduced-motion: reduce` → sin transición.

## Accesibilidad

- `type="menu"` → `<button aria-haspopup aria-expanded aria-controls>`; el panel
  lleva `role="menu"` y el consumidor pone `role="menuitem"` en sus opciones.
- El nombre accesible del `<button>` sale del texto (`label`); se puede
  sobreescribir con `aria-label`.

## Reglas de uso

- Header / navegación principal para representar al usuario activo.
- `type="menu"` cuando hay acciones de cuenta (perfil, configuración, cerrar sesión).
- `type="button"` cuando el tap navega directo a una pantalla (ej. perfil).
- **No** usarlo como elemento de lista o selección de datos (para eso `Dropdown`).
- Nota Figma: `type="button"` "puede descartarse en una siguiente iteración".

> Referencia: [Calipso 2.0 — components_avatar_action](https://www.figma.com/design/a43mLQt2DnsCRnrMimyREM/Calipso-2.0?node-id=4312-53430)
