import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './NavigationBarItem.css';

export type NavigationBarItemType = 'icon' | 'avatar' | 'emphasis';

export type NavigationBarItemProps = {
  /** Texto bajo el icono. Se omite en `type="emphasis"`. */
  label?: string;
  /** Glifo del icono (24px). Para `icon` y `emphasis`. */
  icon?: ReactNode;
  /** Elemento de imagen de perfil. Para `type="avatar"`. */
  avatar?: ReactNode;
  /** Tipo de navitem. Default `icon`. */
  type?: NavigationBarItemType;
  /** Estado activo — lo controla la `NavigationBar`. No aplica a `emphasis`. */
  selected?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

/**
 * NavigationBarItem — building block interno de `NavigationBar`. Representa una
 * sección navegable (icono + label) o una acción destacada (`emphasis`).
 * Figma: `_building_blocks_navigation_bar_navitem`. No se usa directamente en
 * producto: siempre a través de `NavigationBar`.
 *
 *   type="icon"      icono 24px + label; recolorea a `brand` cuando `selected`
 *   type="avatar"    imagen de perfil circular + label
 *   type="emphasis"  círculo `bg/brand` con icono `onBrand`, sin label, sin estado
 */
export function NavigationBarItem({
  label,
  icon,
  avatar,
  type = 'icon',
  selected = false,
  className,
  ...props
}: NavigationBarItemProps) {
  const isEmphasis = type === 'emphasis';
  return (
    <button
      type="button"
      className={['nav-bar-item', className].filter(Boolean).join(' ')}
      data-type={type}
      data-selected={!isEmphasis && selected ? '' : undefined}
      aria-current={!isEmphasis && selected ? 'page' : undefined}
      {...props}
    >
      <span className="nav-bar-item__icon">
        {type === 'avatar' ? (
          <span className="nav-bar-item__avatar">{avatar}</span>
        ) : (
          <span className="nav-bar-item__glyph">{icon}</span>
        )}
      </span>
      {!isEmphasis && label != null && <span className="nav-bar-item__label">{label}</span>}
    </button>
  );
}
