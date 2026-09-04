import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Checkmark } from '@carbon/icons-react';
import './PaymentStatusIndicator.css';

export type PaymentStatusValue = 'future' | 'next' | 'paid' | 'offer';
export type PaymentStatusPosition = 'first' | 'middle' | 'last';

export type PaymentStatusIndicatorProps = {
  /** Estado del pago. `future` = pendiente (gris) · `next` = próximo (anillo verde) · `paid` = completado (check verde) · `offer` = pago numerado sin confirmar (gris, número dentro del círculo). */
  status: PaymentStatusValue;
  /** `first` → sin línea antes · `last` → sin línea después · `middle` (def.) → línea a ambos lados. */
  position?: PaymentStatusPosition;
  /**
   * `true` (def.) → círculo + líneas (uso en el header del item). `false` →
   * solo la línea, sin círculo — para continuar el timeline a través del
   * área de contenido expandida de un `AccordionItem`.
   */
  showIcon?: boolean;
  /** Número mostrado dentro del círculo cuando `status="offer"`. */
  number?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * PaymentStatusIndicator — unidad vertical de un timeline de estados de
 * pago: ícono de estado + líneas de conexión arriba/abajo. Figma:
 * `_building_block_paymentstatus` (+ `_building_block_paymentstatus_line`).
 *
 * Puramente visual — no es interactivo y no debe ser el único indicador de
 * estado (acompañar con texto). Pensado para apilarse verticalmente (p. ej.
 * como `leading` de varios `AccordionItem` en secuencia, con `Accordion
 * type="paymentStatus"` para que los items queden contiguos y la línea se
 * vea continua).
 */
export const PaymentStatusIndicator = forwardRef<HTMLDivElement, PaymentStatusIndicatorProps>(
  function PaymentStatusIndicator(
    { status, position = 'middle', showIcon = true, number, className, ...props },
    ref,
  ) {
    const lineBeforeStatus = position === 'first' ? 'transparent' : status;
    const lineAfterStatus = position === 'last' ? 'transparent' : status;

    return (
      <div
        {...props}
        ref={ref}
        className={['payment-status-indicator', className].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        <span className="payment-status-indicator__line" data-status={lineBeforeStatus} />
        {showIcon && (
          <span className="payment-status-indicator__icon" data-status={status}>
            {status === 'paid' && (
              <Checkmark className="payment-status-indicator__check" />
            )}
            {status === 'offer' && number != null && (
              <span className="payment-status-indicator__number">{number}</span>
            )}
          </span>
        )}
        <span className="payment-status-indicator__line" data-status={lineAfterStatus} />
      </div>
    );
  },
);
