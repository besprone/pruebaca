import { useContext } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconButton } from '../IconButton/IconButton';
import type { IconButtonEmphasis } from '../IconButton/IconButton';
import { QuickActionContext } from './quickActionContext';
import './QuickAction.css';

export type QuickActionEmphasis = IconButtonEmphasis;
export type QuickActionSize = 'sm' | 'lg';
export type QuickActionScheme = 'brand' | 'neutral';

export type QuickActionProps = {
  icon: ReactNode;
  /** Texto corto y accionable (máx. 2 líneas) — también es el nombre accesible del botón. */
  label: string;
  /** No cambia el tamaño — solo comunica prioridad. Un solo `primary` por grupo. */
  emphasis?: QuickActionEmphasis;
  size?: QuickActionSize;
  scheme?: QuickActionScheme;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

/**
 * QuickAction — acceso rápido a una acción clave (Home, Dashboard). Figma:
 * `patterns_quick_actions_single`.
 *
 * Compone `IconButton` (siempre `size="lg"` — el tamaño de la caja de toque
 * no cambia entre `size="sm"|"lg"` de este patrón, solo el gap y la
 * tipografía del label) + un label debajo. El área táctil la garantiza el
 * `IconButton`; el label es decorativo (`aria-hidden`) y a la vez la fuente
 * del `aria-label` del botón — no hace falta pasarlo aparte.
 *
 * Patrón de solo presentación — no define lógica propia, solo organiza
 * `IconButton` + texto.
 */
export function QuickAction({
  icon,
  label,
  emphasis = 'primary',
  size,
  scheme,
  className,
  ...props
}: QuickActionProps) {
  const ctx = useContext(QuickActionContext);
  const resolvedSize = size ?? ctx?.size ?? 'sm';
  const resolvedScheme = scheme ?? ctx?.scheme ?? 'brand';

  return (
    <div className={['quick-action', className].filter(Boolean).join(' ')} data-size={resolvedSize}>
      <IconButton
        {...props}
        icon={icon}
        emphasis={emphasis}
        size="lg"
        scheme={resolvedScheme}
        aria-label={label}
      />
      <p className="quick-action__label" data-scheme={resolvedScheme} aria-hidden="true">
        {label}
      </p>
    </div>
  );
}
