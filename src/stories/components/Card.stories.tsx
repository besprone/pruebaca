import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  argTypes: {
    interactive: { control: 'boolean' },
    selected: { control: 'boolean' },
    elevation: { control: 'inline-radio', options: ['flat', 'raised'] },
    badge: { control: false },
    children: { control: false },
  },
  args: {
    interactive: false,
    selected: false,
    elevation: 'flat',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 328, padding: '16px 8px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

const cap: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--semantic-color-text-secondary)',
  marginBottom: 6,
};

/** Composición de ejemplo dentro del slot — usa componentes del DS. */
function Filler({ h = 96, label = 'Slot' }: { h?: number; label?: string }) {
  return (
    <div
      style={{
        height: h,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--typography-font-family)',
        fontWeight: 600,
        color: 'var(--semantic-color-text-secondary)',
        background:
          'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--semantic-color-bg-subtle) 10px, var(--semantic-color-bg-subtle) 20px)',
      }}
    >
      {label}
    </div>
  );
}

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <Card {...args} badge={args.badge ?? undefined}>
      <Filler />
    </Card>
  ),
};

// ── Elevación ──────────────────────────────────────────────────────────────

export const Elevacion: Story = {
  name: 'Elevación',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 328 }}>
      <div>
        <p style={cap}>elevation="flat"</p>
        <Card elevation="flat">
          <Filler />
        </Card>
      </div>
      <div>
        <p style={cap}>elevation="raised"</p>
        <Card elevation="raised">
          <Filler />
        </Card>
      </div>
    </div>
  ),
};

// ── Estática vs interactiva ────────────────────────────────────────────────

export const Interaccion: Story = {
  name: 'Estática vs interactiva',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 328 }}>
      <div>
        <p style={cap}>static — sin estados de interacción</p>
        <Card>
          <Filler />
        </Card>
      </div>
      <div>
        <p style={cap}>interactive — hover / pressed / focus (pruébalo)</p>
        <Card interactive onClick={() => {}}>
          <Filler />
        </Card>
      </div>
    </div>
  ),
};

// ── Estados ───────────────────────────────────────────────────────────────

export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 328 }}>
      <div>
        <p style={cap}>focus (Tab hasta la card)</p>
        <Card interactive onClick={() => {}}>
          <Filler />
        </Card>
      </div>
      <div>
        <p style={cap}>selected — brandSoft + borde brand + check</p>
        <Card interactive selected onClick={() => {}}>
          <Filler />
        </Card>
      </div>
      <p style={cap}>hover y pressed solo con cursor (web/desktop) — interactúa con el mouse.</p>
    </div>
  ),
};

// ── Con badge ─────────────────────────────────────────────────────────────

export const ConBadge: Story = {
  name: 'Con badge',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 328 }}>
      <Card badge={<Badge semantic="accentPrimary" size="xs" label="Recomendado" />}>
        <Filler />
      </Card>
      <Card interactive selected onClick={() => {}} badge={<Badge semantic="success" size="xs" label="Vigente" />}>
        <Filler />
      </Card>
    </div>
  ),
};

// ── Seleccionable (grupo single-select) ───────────────────────────────────

export const Seleccionable: Story = {
  name: 'Grupo seleccionable',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const options = [
        { id: '3m', plazo: '3 meses', tasa: '9.50%' },
        { id: '6m', plazo: '6 meses', tasa: '10.50%' },
        { id: '12m', plazo: '12 meses', tasa: '11.20%' },
      ];
      const [sel, setSel] = useState('6m');
      return (
        <div role="radiogroup" aria-label="Plazo" style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 328 }}>
          {options.map((o) => (
            <Card
              key={o.id}
              interactive
              selected={sel === o.id}
              onClick={() => setSel(o.id)}
              role="radio"
              aria-checked={sel === o.id}
              aria-label={`${o.plazo}, tasa ${o.tasa}`}
            >
              <div
                style={{
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  fontFamily: 'var(--typography-font-family)',
                }}
              >
                <span style={{ fontWeight: 600 }}>{o.plazo}</span>
                <span style={{ color: 'var(--semantic-color-text-success)', fontWeight: 600 }}>{o.tasa}</span>
              </div>
            </Card>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};

// ── En producto (composición real dentro del slot) ───────────────────────

export const EnProducto: Story = {
  name: 'En producto',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 328 }}>
      <Card elevation="raised" badge={<Badge semantic="accentPrimary" size="xs" label="Promoción" />}>
        <div style={{ padding: 16, fontFamily: 'var(--typography-font-family)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Badge semantic="success" size="xs" label="Vigente" />
          </div>
          <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 18 }}>Auto</p>
          <p style={{ margin: '0 0 12px', color: 'var(--semantic-color-text-secondary)', fontSize: 13 }}>
            12 meses · 10.50%
          </p>
          <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: 20 }}>$10,000.00</p>
          <Button emphasis="primary" size="sm" onClick={() => {}}>
            Ver detalle
          </Button>
        </div>
      </Card>
    </div>
  ),
};
