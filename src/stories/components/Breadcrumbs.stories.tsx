import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import type { BreadcrumbsSize } from '../../components/Breadcrumbs/Breadcrumbs';

const SIZES: BreadcrumbsSize[] = ['md', 'lg'];

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    items: { control: false },
    current: { control: 'text' },
  },
  args: {
    size: 'md',
    items: [
      { label: 'Inicio', href: '#' },
      { label: 'Inversiones', href: '#' },
    ],
    current: 'kubo.plazofijo',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const legend: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
  marginBottom: 6,
};

export const Playground: Story = {};

const LINKS = [
  { label: 'Inicio', href: '#' },
  { label: 'Inversiones', href: '#' },
  { label: 'Plazo fijo', href: '#' },
];

export const Niveles: Story = {
  name: 'Niveles (# links × size)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size}>
          <p style={legend}>size={size}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[1, 2, 3].map((n) => (
              <Breadcrumbs key={n} size={size} items={LINKS.slice(0, n)} current="Detalle del contrato" />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const EnContexto: Story = {
  name: 'En contexto',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div style={{ background: 'var(--semantic-color-bg-canvas)', minHeight: 240, padding: '24px 0' }}>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '#' },
          { label: 'Movimientos', href: '#' },
        ]}
        current="Transferencia SPEI · 12 sep"
      />
      <div style={{ padding: '16px 24px', fontFamily: 'var(--typography-font-family)' }}>
        <h1 style={{ margin: 0, fontSize: 22, color: 'var(--semantic-color-text-primary)' }}>
          Transferencia SPEI · 12 sep
        </h1>
        <p style={{ color: 'var(--semantic-color-text-secondary)' }}>Contenido de la página.</p>
      </div>
    </div>
  ),
};
