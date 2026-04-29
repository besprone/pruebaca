import type { Meta, StoryObj } from '@storybook/react';
import { Add } from '@carbon/icons-react';
import { CircularIndeterminateProgress } from '../../components/CircularIndeterminateProgress/CircularIndeterminateProgress';
import type { CircularIndeterminateProgressSize } from '../../components/CircularIndeterminateProgress/CircularIndeterminateProgress';
import { IconButton } from '../../components/IconButton/IconButton';

const meta: Meta<typeof CircularIndeterminateProgress> = {
  title: 'Components/CircularIndeterminateProgress',
  component: CircularIndeterminateProgress,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'] satisfies CircularIndeterminateProgressSize[],
    },
  },
  args: {
    size: 'sm',
    'aria-label': 'Cargando',
  },
};

export default meta;
type Story = StoryObj<typeof CircularIndeterminateProgress>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Por tamaño ──────────────────────────────────────────────────────────────

export const PorTamaño: Story = {
  name: 'Por tamaño',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {(['xs', 'sm', 'md'] satisfies CircularIndeterminateProgressSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <CircularIndeterminateProgress size={size} />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-tertiary)' }}>
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ── Sobre fondo brand ────────────────────────────────────────────────────────

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
      {(['xs', 'sm', 'md'] satisfies CircularIndeterminateProgressSize[]).map((size) => (
        <CircularIndeterminateProgress key={size} size={size} />
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
      <IconButton aria-label="sm loading"  emphasis="primary"   size="sm" icon={<Add />} isLoading />
      <IconButton aria-label="md loading"  emphasis="secondary" size="md" icon={<Add />} isLoading />
      <IconButton aria-label="lg loading"  emphasis="ghost"     size="lg" icon={<Add />} isLoading />
    </div>
  ),
};
