import type { Meta, StoryObj } from '@storybook/react';
import { Add, Star, ArrowRight, Download } from '@carbon/icons-react';
import { Button } from '../../components/Button/Button';
import type { ButtonEmphasis, ButtonSize } from '../../components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    emphasis: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost', 'destructive'] satisfies ButtonEmphasis[],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'] satisfies ButtonSize[],
    },
    isLoading: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    children:  { control: 'text' },
  },
  args: {
    emphasis:  'primary',
    size:      'md',
    isLoading: false,
    disabled:  false,
    children:  'Botón',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Por énfasis ─────────────────────────────────────────────────────────────

export const PorEnfasis: Story = {
  name: 'Por énfasis',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Button emphasis="primary"     size="md">Primary</Button>
      <Button emphasis="secondary"   size="md">Secondary</Button>
      <Button emphasis="ghost"       size="md">Ghost</Button>
      <Button emphasis="destructive" size="md">Destructive</Button>
    </div>
  ),
};

// ── Por tamaño ──────────────────────────────────────────────────────────────

export const PorTamaño: Story = {
  name: 'Por tamaño',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
    </div>
  ),
};

// ── Con ícono ────────────────────────────────────────────────────────────────

export const ConIcono: Story = {
  name: 'Con ícono',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Button emphasis="primary"     size="xs" icon={<Add />}>Agregar</Button>
        <Button emphasis="secondary"   size="xs" icon={<Download />}>Descargar</Button>
        <Button emphasis="ghost"       size="xs" icon={<Star />}>Favorito</Button>
        <Button emphasis="destructive" size="xs" icon={<ArrowRight />}>Continuar</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Button emphasis="primary"     size="sm" icon={<Add />}>Agregar</Button>
        <Button emphasis="secondary"   size="sm" icon={<Download />}>Descargar</Button>
        <Button emphasis="ghost"       size="sm" icon={<Star />}>Favorito</Button>
        <Button emphasis="destructive" size="sm" icon={<ArrowRight />}>Continuar</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Button emphasis="primary"     size="md" icon={<Add />}>Agregar</Button>
        <Button emphasis="secondary"   size="md" icon={<Download />}>Descargar</Button>
        <Button emphasis="ghost"       size="md" icon={<Star />}>Favorito</Button>
        <Button emphasis="destructive" size="md" icon={<ArrowRight />}>Continuar</Button>
      </div>
    </div>
  ),
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => {
    const states: Array<{ label: string; props: Partial<React.ComponentProps<typeof Button>> }> = [
      { label: 'Default',  props: {} },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Loading',  props: { isLoading: true } },
    ];
    const emphases: ButtonEmphasis[] = ['primary', 'secondary', 'ghost', 'destructive'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {emphases.map((emphasis) => (
          <div key={emphasis} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <span style={{ width: 90, fontSize: 12, color: 'var(--semantic-color-text-secondary)', fontFamily: 'monospace' }}>
              {emphasis}
            </span>
            {states.map(({ label, props }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Button emphasis={emphasis} size="md" {...props}>
                  {label}
                </Button>
                <span style={{ fontSize: 11, color: 'var(--semantic-color-text-tertiary)', fontFamily: 'monospace' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// ── Matriz completa ─────────────────────────────────────────────────────────

export const Matriz: Story = {
  name: 'Matriz completa',
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes: ButtonSize[]        = ['xs', 'sm', 'md'];
    const emphases: ButtonEmphasis[] = ['primary', 'secondary', 'ghost', 'destructive'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sizes.map((size) => (
          <div key={size}>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
              size={size}
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              {emphases.map((emphasis) => (
                <div key={emphasis} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                  <Button emphasis={emphasis} size={size}>{emphasis}</Button>
                  <Button emphasis={emphasis} size={size} disabled>{emphasis}</Button>
                  <Button emphasis={emphasis} size={size} isLoading>{emphasis}</Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ── Ancho completo ───────────────────────────────────────────────────────────

export const AnchoCompleto: Story = {
  name: 'Ancho completo',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <Button emphasis="primary"     size="md" data-full-width>Primary full width</Button>
      <Button emphasis="secondary"   size="md" data-full-width>Secondary full width</Button>
      <Button emphasis="ghost"       size="md" data-full-width>Ghost full width</Button>
      <Button emphasis="destructive" size="md" data-full-width>Destructive full width</Button>
    </div>
  ),
};
