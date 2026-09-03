import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../components/Link/Link';
import type { LinkState } from '../../components/Link/Link';

const STATES: LinkState[] = ['default', 'hover', 'pressed'];

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
  argTypes: {
    state: { control: 'inline-radio', options: STATES },
    children: { control: 'text' },
    href: { control: 'text' },
  },
  args: {
    children: 'Ver estado de cuenta',
    href: '#',
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const label: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
  minWidth: 64,
};

export const Playground: Story = {};

export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {STATES.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={label}>{s}</span>
          <Link href="#" state={s}>
            Ver términos y condiciones
          </Link>
        </div>
      ))}
    </div>
  ),
};

export const EnContexto: Story = {
  name: 'En contexto (inline)',
  parameters: { controls: { disable: true } },
  render: () => (
    <p
      style={{
        maxWidth: 420,
        margin: 0,
        fontFamily: 'var(--typography-font-family)',
        fontSize: 16,
        lineHeight: 1.6,
        color: 'var(--semantic-color-text-primary)',
      }}
    >
      Tu transferencia se registró correctamente. Puedes{' '}
      <Link href="#">descargar el comprobante</Link> o revisar el{' '}
      <Link href="#">detalle del movimiento</Link> en cualquier momento desde tu
      historial.
    </p>
  ),
};
