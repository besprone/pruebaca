import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { LinearProgress } from '../../components/LinearProgress/LinearProgress';

const meta: Meta<typeof LinearProgress> = {
  title: 'Components/Progress/Linear',
  component: LinearProgress,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 40,
    indeterminate: false,
    'aria-label': 'Progreso',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

const cap: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--semantic-color-text-secondary)',
  marginBottom: 6,
};

export const Playground: Story = {};

// ── Valores (0 · 50 · 100 en Figma) ───────────────────────────────────────

export const Valores: Story = {
  name: 'Valores',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 328 }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v}>
          <p style={cap}>value={v}</p>
          <LinearProgress value={v} aria-label={`Progreso ${v}%`} />
        </div>
      ))}
    </div>
  ),
};

// ── Indeterminate ─────────────────────────────────────────────────────────

export const Indeterminate: Story = {
  name: 'Indeterminate',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 328 }}>
      <p style={cap}>indeterminate</p>
      <LinearProgress indeterminate aria-label="Procesando" />
    </div>
  ),
};

// ── Animado (progreso real) ───────────────────────────────────────────────

export const Animado: Story = {
  name: 'Progreso animado',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [v, setV] = useState(0);
      useEffect(() => {
        const id = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 5)), 400);
        return () => clearInterval(id);
      }, []);
      return (
        <div style={{ maxWidth: 328 }}>
          <p style={cap}>value={v}</p>
          <LinearProgress value={v} aria-label="Cargando" />
        </div>
      );
    }
    return <Demo />;
  },
};

// ── En contexto ──────────────────────────────────────────────────────────

export const EnContexto: Story = {
  name: 'En contexto',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div
      style={{
        maxWidth: 328,
        padding: 16,
        borderRadius: 12,
        background: 'var(--semantic-color-bg-surface)',
        border: '1px solid var(--semantic-color-border-subtle)',
        fontFamily: 'var(--typography-font-family)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span style={{ color: 'var(--semantic-color-text-secondary)' }}>Progreso de inversión</span>
        <strong style={{ fontSize: 13 }}>28%</strong>
      </div>
      <div style={{ marginTop: 8 }}>
        <LinearProgress value={28} aria-label="Progreso de inversión" />
      </div>
    </div>
  ),
};
