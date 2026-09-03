import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './AppBar.css';

export type AppBarSize = 'sm' | 'md' | 'lg';
export type AppBarLayout = 'inline' | 'stacked';
export type AppBarElevation = 'flat' | 'raised';

export type AppBarProps = {
  /** `sm` (móvil, 64px, headline 22) · `md` (84px, headline 28) · `lg` (84px, headline 28, más aire). Default `sm`. */
  size?: AppBarSize;
  /**
   * `inline` — leading · texto · trailing en una fila.
   * `stacked` — fila de acciones (leading + trailing) y el texto debajo, a lo ancho.
   * Default `inline`.
   */
  layout?: AppBarLayout;
  /** `flat` (sin sombra) · `raised` (sombra `elevation-2`, para el estado on-scroll). Default `flat`. */
  elevation?: AppBarElevation;
  /** Slot izquierdo — normalmente un `IconButton` (back / menú) o un `Brand`. */
  leading?: ReactNode;
  /** Título de la vista. `Headline/xs` en `sm`, `Display/sm` en `md`/`lg`. */
  headline?: ReactNode;
  /** Texto secundario bajo el headline (`Body/sm` en `sm`, `Body/lg` en `md`/`lg`). */
  supporting?: ReactNode;
  /** Muestra el bloque de texto. Default: `true` si hay `headline` o `supporting`. */
  showHeadline?: boolean;
  /**
   * Slot derecho — acciones secundarias alineadas al final: hasta 3 `IconButton`,
   * un `Button`, un `SearchField`, un `Avatar` / `AvatarAction`. Nunca la acción
   * crítica de la pantalla.
   */
  trailing?: ReactNode;
  /** Nombre accesible del `<header>`. */
  'aria-label'?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

/**
 * AppBar — barra de navegación superior. Figma: `patterns_app_bar`.
 *
 * Orienta al usuario (título de la vista) y ofrece acción principal (`leading`,
 * normalmente back) + acciones secundarias (`trailing`). **No** es un contenedor
 * de contenido y **no** reemplaza al tab bar. Las `configuration` de Figma
 * (home, navigation, search, section, dialog, resumen de saldos…) se componen
 * con estos slots + `layout` — el posicionamiento fijo y la elevación on-scroll
 * son responsabilidad del consumidor (ver story `En contexto`).
 */
export const AppBar = forwardRef<HTMLElement, AppBarProps>(function AppBar(
  {
    size = 'sm',
    layout = 'inline',
    elevation = 'flat',
    leading,
    headline,
    supporting,
    showHeadline,
    trailing,
    className,
    ...props
  },
  ref,
) {
  const hasText = (showHeadline ?? (headline != null || supporting != null)) && (headline != null || supporting != null);

  const text = hasText ? (
    <div className="app-bar__text">
      {headline != null && <p className="app-bar__headline">{headline}</p>}
      {supporting != null && <p className="app-bar__supporting">{supporting}</p>}
    </div>
  ) : null;

  return (
    <header
      {...props}
      ref={ref}
      data-size={size}
      data-layout={layout}
      data-elevation={elevation}
      className={['app-bar', className].filter(Boolean).join(' ')}
    >
      <div className="app-bar__row">
        {leading != null && <div className="app-bar__leading">{leading}</div>}
        {layout === 'inline' && text}
        {trailing != null && <div className="app-bar__trailing">{trailing}</div>}
      </div>
      {layout === 'stacked' && text}
    </header>
  );
});
