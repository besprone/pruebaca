import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { SnackbarLayout } from './SnackbarLayout';
import { SnackbarActions, type SnackbarAction } from './SnackbarActions';
import './Snackbar.css';

export type SnackbarVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info';

export type SnackbarProps = {
  /** Intención visual. `neutral` (default) · `success` · `warning` · `error` · `info`. */
  variant?: SnackbarVariant;
  /** Texto de soporte. Breve; describe el resultado, no depende solo del color. */
  message: ReactNode;
  /** Acción secundaria opcional (nunca primaria). */
  action?: SnackbarAction;
  /** Si se pasa, muestra el botón de cerrar. */
  onClose?: () => void;
  /** aria-label del botón de cerrar. Default `"Cerrar"`. */
  closeLabel?: string;
  /**
   * Rol ARIA. Por defecto `alert` para `warning`/`error`, `status` para el
   * resto. `alert` se anuncia de inmediato (`aria-live="assertive"`).
   */
  role?: 'status' | 'alert';
} & Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'children'>;

/**
 * Snackbar — feedback temporal **no bloqueante**. Confirmaciones, errores no
 * críticos, advertencias o info contextual. No interrumpe el flujo principal;
 * no reemplaza modales ni banners persistentes. Figma: `components_snackbar`.
 *
 * Este componente es el **card presentacional**. El posicionamiento (portal,
 * fixed, safe-area), el auto-cierre por tiempo y la cola de uno-a-la-vez los
 * gestiona quien lo monta (ver notas de comportamiento en la doc). Recomendado:
 * 3–5 s para `neutral`/`success`; `error` puede permanecer hasta que haya
 * acción.
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(
  { variant = 'neutral', message, action, onClose, closeLabel, role, className, ...props },
  ref,
) {
  const resolvedRole = role ?? (variant === 'warning' || variant === 'error' ? 'alert' : 'status');
  const hasActions = action != null || onClose != null;

  return (
    <div
      {...props}
      ref={ref}
      role={resolvedRole}
      aria-live={resolvedRole === 'alert' ? 'assertive' : 'polite'}
      data-variant={variant}
      className={['snackbar', className].filter(Boolean).join(' ')}
    >
      <SnackbarLayout
        message={message}
        actions={
          hasActions ? (
            <SnackbarActions action={action} onClose={onClose} closeLabel={closeLabel} />
          ) : undefined
        }
      />
    </div>
  );
});
