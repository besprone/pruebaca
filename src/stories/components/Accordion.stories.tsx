import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from '../../components/Accordion';
import { PaymentStatusIndicator } from '../../components/PaymentStatus';
import type { PaymentStatusPosition, PaymentStatusValue } from '../../components/PaymentStatus';
import { Button } from '../../components/Button/Button';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

function Frame({ children, width = 328 }: { children?: React.ReactNode; width?: number }) {
  return (
    <div style={{ maxWidth: width, background: 'var(--semantic-color-bg-canvas)', padding: 24 }}>
      {children}
    </div>
  );
}

export const Playground: Story = {
  render: () => (
    <Frame>
      <Accordion type="segmented">
        <AccordionItem label="¿Cómo solicito un crédito?" defaultExpanded>
          Ingresa a la app, selecciona "Solicitar crédito" y sigue los pasos. La
          evaluación toma en promedio 24 horas.
        </AccordionItem>
        <AccordionItem label="¿Cuánto tiempo tarda la aprobación?">
          Entre 24 y 48 horas hábiles, dependiendo de la documentación proporcionada.
        </AccordionItem>
        <AccordionItem label="¿Qué documentos necesito?">
          Identificación oficial, comprobante de domicilio y comprobante de ingresos
          de los últimos 3 meses.
        </AccordionItem>
        <AccordionItem label="¿Puedo pagar antes de tiempo?">
          Sí, sin penalización. Puedes hacer pagos anticipados desde la sección
          "Mi crédito".
        </AccordionItem>
      </Accordion>
    </Frame>
  ),
};

export const ConAcciones: Story = {
  name: 'Con supporting + actions',
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <Accordion type="segmented">
        <AccordionItem
          label="Términos y condiciones"
          supporting="Aplican para todos los productos de inversión kubo.plazofijo."
          defaultExpanded
          actions={
            <>
              <Button emphasis="secondary" size="xs">
                Rechazar
              </Button>
              <Button emphasis="primary" size="xs">
                Aceptar
              </Button>
            </>
          }
        >
          Al continuar aceptas que kubo puede compartir tu información
          crediticia con burós autorizados conforme a la LFPDPPP.
        </AccordionItem>
        <AccordionItem
          label="Información de producto"
          supporting="Detalles sobre tasas y comisiones aplicables."
          actions={
            <Button emphasis="primary" size="xs">
              Ver ficha técnica
            </Button>
          }
        >
          Tasa anual fija del 10.5%, sin comisión por apertura.
        </AccordionItem>
      </Accordion>
    </Frame>
  ),
};

type Pago = {
  label: string;
  status: PaymentStatusValue;
  supporting?: string;
};

const plan: Pago[] = [
  { label: 'Pago 1', status: 'paid', supporting: 'Completado — 15 feb 2026' },
  { label: 'Pago 2', status: 'paid', supporting: 'Completado — 15 mar 2026' },
  { label: 'Pago 3', status: 'next', supporting: 'Próximo pago' },
  { label: 'Pago 4', status: 'future', supporting: 'Pendiente' },
];

export const PlanDePagos: Story = {
  name: 'Timeline de pagos (type="paymentStatus")',
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <Accordion type="paymentStatus">
        {plan.map((pago, i) => {
          const position: PaymentStatusPosition =
            i === 0 ? 'first' : i === plan.length - 1 ? 'last' : 'middle';
          return (
            <AccordionItem
              key={pago.label}
              label={pago.label}
              defaultExpanded={pago.status === 'next'}
              leading={<PaymentStatusIndicator status={pago.status} position={position} />}
              contentLeading={
                <PaymentStatusIndicator status={pago.status} position={position} showIcon={false} />
              }
              supporting={pago.supporting}
            >
              {pago.status === 'next' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Monto</span>
                  <strong>$1,250.00</strong>
                </div>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Frame>
  ),
};

export const EstadosDePago: Story = {
  name: 'PaymentStatusIndicator — estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, background: 'var(--semantic-color-bg-canvas)' }}>
      {(['future', 'next', 'paid', 'offer'] as PaymentStatusValue[]).map((status) => (
        <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ height: 64 }}>
            <PaymentStatusIndicator status={status} position="middle" number="003" />
          </div>
          <span style={{ fontFamily: 'var(--typography-font-family)', fontSize: 12, color: 'var(--semantic-color-text-tertiary)' }}>
            {status}
          </span>
        </div>
      ))}
    </div>
  ),
};
