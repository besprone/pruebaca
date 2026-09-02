import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Add } from '@carbon/icons-react';
import { CircularProgress } from '../../components/CircularProgress/CircularProgress';
import type { CircularProgressSize } from '../../components/CircularProgress/CircularProgress';
import { IconButton } from '../../components/IconButton/IconButton';

const SIZES = ['xs', 'sm', 'md'] satisfies CircularProgressSize[];

const meta: Meta<typeof CircularProgress> = {
  title: 'Components/Progress/Circular',
  component: CircularProgress,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
    size: { control: 'radio', options: SIZES },
  },
  args: {
    value: 40,
    indeterminate: false,
    size: 'sm',
    'aria-label': 'Progreso',
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

const cap: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--semantic-color-text-tertiary)',
};

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Determinate: valores ───────────────────────────────────────────────────

export const Valores: Story = {
  name: 'Valores',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <CircularProgress size="md" value={v} aria-label={`Progreso ${v}%`} />
          <span style={cap}>{v}</span>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <CircularProgress size={size} indeterminate />
          <span style={cap}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Progreso animado ──────────────────────────────────────────────────────

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <CircularProgress size="md" value={v} aria-label="Cargando" />
          <span style={cap}>value={v}</span>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Sobre fondo brand ─────────────────────────────────────────────────────

export const SobreFondoBrand: Story = {
  name: 'Sobre fondo brand',
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 32,
        borderRadius: 16,
        background: 'var(--semantic-color-bg-brand)',
      }}
    >
      {SIZES.map((size) => (
        <CircularProgress key={size} size={size} indeterminate />
      ))}
    </div>
  ),
};

// ── Contexto: dentro de IconButton ───────────────────────────────────────────

export const EnIconButton: Story = {
  name: 'En contexto: IconButton loading',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton aria-label="sm loading" emphasis="primary" size="sm" icon={<Add />} isLoading />
      <IconButton aria-label="md loading" emphasis="secondary" size="md" icon={<Add />} isLoading />
      <IconButton aria-label="lg loading" emphasis="ghost" size="lg" icon={<Add />} isLoading />
    </div>
  ),
};
