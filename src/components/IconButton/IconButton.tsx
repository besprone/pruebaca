import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { CircularIndeterminateProgress } from '../CircularIndeterminateProgress/CircularIndeterminateProgress';
import type { CircularIndeterminateProgressSize } from '../CircularIndeterminateProgress/CircularIndeterminateProgress';
import './IconButton.css';

export type IconButtonEmphasis = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

// Mapeo de tamaño del botón al tamaño del spinner (según Figma)
const spinnerSize: Record<IconButtonSize, CircularIndeterminateProgressSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export type IconButtonProps = {
  icon: ReactNode;
  emphasis?: IconButtonEmphasis;
  size?: IconButtonSize;
  isLoading?: boolean;
  'aria-label': string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function IconButton({
  icon,
  emphasis = 'primary',
  size = 'sm',
  isLoading = false,
  disabled,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      data-emphasis={emphasis}
      data-size={size}
      data-loading={isLoading || undefined}
      className={['icon-button', className].filter(Boolean).join(' ')}
    >
      <span className="icon-button__btn">
        <span className="icon-button__state">
          {isLoading ? (
            <CircularIndeterminateProgress size={spinnerSize[size]} aria-label="Cargando" />
          ) : (
            icon
          )}
        </span>
      </span>
    </button>
  );
}
