import type { Meta, StoryObj } from '@storybook/react';
import { Information, ChevronRight, CheckmarkFilled } from '@carbon/icons-react';
import { KeyValue, KeyValueRow, KeyValueKey, KeyValueValue } from '../../components/KeyValue';
import { Badge } from '../../components/Badge/Badge';
import { IconButton } from '../../components/IconButton/IconButton';
import { Button } from '../../components/Button/Button';

const meta: Meta<typeof KeyValue> = {
  title: 'Components/KeyValue',
  component: KeyValue,
  parameters: { layout: 'padded' },
  argTypes: {
    divider: { control: 'boolean' },
    elevation: { control: 'inline-radio', options: [0, 2] },
  },
  args: {
    divider: true,
    elevation: 0,
  },
};

export default meta;
type Story = StoryObj<typeof KeyValue>;

function Frame({ children, width = 360 }: { children?: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        maxWidth: width,
        background: 'var(--semantic-color-bg-canvas)',
        padding: 24,
      }}
    >
      {children}
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <Frame>
      <KeyValue {...args}>
        <KeyValueRow>
          <KeyValueKey>Capital invertido</KeyValueKey>
          <KeyValueValue>$10,000</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Tasa anual</KeyValueKey>
          <KeyValueValue>12%</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Estado</KeyValueKey>
          <KeyValueValue color="accent">Activo</KeyValueValue>
        </KeyValueRow>
      </KeyValue>
    </Frame>
  ),
};

export const ConfirmaTuInversion: Story = {
  name: 'Confirma tu inversión (ejemplo del PDF)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <KeyValue>
        <KeyValueRow>
          <KeyValueKey>Nombre de la inversión</KeyValueKey>
          <KeyValueValue>INV 30 DIAS</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Monto invertido</KeyValueKey>
          <KeyValueValue>$500.00</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow trailing={<ChevronRight />}>
          <KeyValueKey>Rendimiento total</KeyValueKey>
          <KeyValueValue>$53.23</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Pago de rendimiento</KeyValueKey>
          <KeyValueValue>Semanal</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Plazo</KeyValueKey>
          <KeyValueValue>12 meses</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Fecha en que finaliza</KeyValueKey>
          <KeyValueValue>3 feb 2027</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey multiline>Destino del dinero al vencimiento</KeyValueKey>
          <KeyValueValue>Reinvertir el capital e intereses</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Tasa anual</KeyValueKey>
          <KeyValueValue>10.50%</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey icon={<Information />}>GAT Nominal</KeyValueKey>
          <KeyValueValue>10.49%</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey icon={<Information />}>GAT Real</KeyValueKey>
          <KeyValueValue>6.40%</KeyValueValue>
        </KeyValueRow>
      </KeyValue>
      <div style={{ marginTop: 16 }}>
        <Button emphasis="primary" size="md" style={{ width: '100%' }}>
          Confirma tu inversión
        </Button>
      </div>
    </Frame>
  ),
};

export const ValorExpandible: Story = {
  name: 'Valor expandible (sello digital)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <KeyValue>
        <KeyValueRow>
          <KeyValueKey>Folio de operación</KeyValueKey>
          <KeyValueValue>SPEI-88291</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Sello digital</KeyValueKey>
          <KeyValueValue expandable>
            1016594|100870541|20260904103245|Ma3fL9qP2xR7vT1nK8wZ4hY6cB0dJ5gA==|SAT2026KUBO
          </KeyValueValue>
        </KeyValueRow>
      </KeyValue>
    </Frame>
  ),
};

export const BadgeYTrailing: Story = {
  name: 'Badge y trailing',
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <KeyValue>
        <KeyValueRow trailing={<Badge semantic="success" variant="soft" size="xs" leading={<CheckmarkFilled />} label="Verificado" />}>
          <KeyValueKey>Cuenta destino</KeyValueKey>
          <KeyValueValue>•••• 4821</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow>
          <KeyValueKey>Rendimiento</KeyValueKey>
          <KeyValueValue trailing={<IconButton emphasis="ghost" size="sm" aria-label="Más información" icon={<Information />} />}>
            $53.23
          </KeyValueValue>
        </KeyValueRow>
      </KeyValue>
    </Frame>
  ),
};

export const PromoYEnfasis: Story = {
  name: 'Promo y énfasis',
  parameters: { controls: { disable: true } },
  render: () => (
    <Frame>
      <KeyValue divider={false}>
        <KeyValueRow background="canvas">
          <KeyValueKey>Subtotal</KeyValueKey>
          <KeyValueValue>$500.00</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow background="canvas">
          <KeyValueKey>Comisión</KeyValueKey>
          <KeyValueValue promo="0% hoy">$0.00</KeyValueValue>
        </KeyValueRow>
        <KeyValueRow background="canvas">
          <KeyValueKey emphasis>Total a pagar</KeyValueKey>
          <KeyValueValue emphasis>$500.00</KeyValueValue>
        </KeyValueRow>
      </KeyValue>
    </Frame>
  ),
};

export const DividerYElevacion: Story = {
  name: 'Divider + elevación (matriz)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 24, background: 'var(--semantic-color-bg-canvas)' }}>
      {([
        [true, 0],
        [false, 0],
        [true, 2],
        [false, 2],
      ] as const).map(([divider, elevation]) => (
        <div key={`${divider}-${elevation}`} style={{ width: 240 }}>
          <p style={{ font: 'var(--typography-font-family)', fontSize: 12, color: 'var(--semantic-color-text-tertiary)', margin: '0 0 8px' }}>
            divider={String(divider)} · elevation={elevation}
          </p>
          <KeyValue divider={divider} elevation={elevation}>
            <KeyValueRow>
              <KeyValueKey>key</KeyValueKey>
              <KeyValueValue>value</KeyValueValue>
            </KeyValueRow>
            <KeyValueRow>
              <KeyValueKey>key</KeyValueKey>
              <KeyValueValue>value</KeyValueValue>
            </KeyValueRow>
          </KeyValue>
        </div>
      ))}
    </div>
  ),
};
