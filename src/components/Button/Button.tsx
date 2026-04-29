import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { CircularIndeterminateProgress } from '../CircularIndeterminateProgress/CircularIndeterminateProgress';
import type { CircularIndeterminateProgressSize } from '../CircularIndeterminateProgress/CircularIndeterminateProgress';
import './Button.css';

export type ButtonEmphasis = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md';

// Spinner por tamaño de botón (Figma: icono siempre 20px en xs/sm, 24px en md)
const spinnerSize: Record<ButtonSize, CircularIndeterminateProgressSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
};

export type ButtonProps = {
  emphasis?: ButtonEmphasis;
  size?: ButtonSize;
  /** Ícono leading opcional — solo uno, al inicio */
  icon?: ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  emphasis = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      data-emphasis={emphasis}
      data-size={size}
      data-loading={isLoading || undefined}
      className={['button', className].filter(Boolean).join(' ')}
    >
      <span className="button__btn">
        <span className="button__state">
          {isLoading ? (
            <CircularIndeterminateProgress
              size={spinnerSize[size]}
              aria-label="Cargando"
            />
          ) : icon ? (
            <span className="button__icon">{icon}</span>
          ) : null}
          <span className="button__label">{children}</span>
        </span>
      </span>
    </button>
  );
}
