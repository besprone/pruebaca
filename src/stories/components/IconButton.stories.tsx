import type { Meta, StoryObj } from '@storybook/react';
import { Add, Close, Edit, Search, Settings, Star } from '@carbon/icons-react';
import { IconButton } from '../../components/IconButton/IconButton';
import type { IconButtonEmphasis, IconButtonScheme, IconButtonSize } from '../../components/IconButton/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    emphasis: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost'] satisfies IconButtonEmphasis[],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'] satisfies IconButtonSize[],
    },
    scheme: {
      control: 'radio',
      options: ['brand', 'neutral'] satisfies IconButtonScheme[],
    },
    isLoading: { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
  args: {
    'aria-label': 'Acción',
    emphasis: 'primary',
    size: 'sm',
    scheme: 'brand',
    isLoading: false,
    disabled: false,
    icon: <Add />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Por énfasis ─────────────────────────────────────────────────────────────

export const PorEnfasis: Story = {
  name: 'Por énfasis',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton aria-label="Primary"   emphasis="primary"   size="md" icon={<Add />} />
      <IconButton aria-label="Secondary" emphasis="secondary" size="md" icon={<Add />} />
      <IconButton aria-label="Ghost"     emphasis="ghost"     size="md" icon={<Add />} />
    </div>
  ),
};

// ── Por tamaño ──────────────────────────────────────────────────────────────

export const PorTamaño: Story = {
  name: 'Por tamaño',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton aria-label="sm" size="sm" icon={<Add />} />
      <IconButton aria-label="md" size="md" icon={<Add />} />
      <IconButton aria-label="lg" size="lg" icon={<Add />} />
    </div>
  ),
};

// ── Por scheme ──────────────────────────────────────────────────────────────

export const PorScheme: Story = {
  name: 'Por scheme',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {(['brand', 'neutral'] as IconButtonScheme[]).map((scheme) => (
        <div key={scheme} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconButton aria-label="Primary"   scheme={scheme} emphasis="primary"   size="md" icon={<Add />} />
          <IconButton aria-label="Secondary" scheme={scheme} emphasis="secondary" size="md" icon={<Add />} />
          <IconButton aria-label="Ghost"     scheme={scheme} emphasis="ghost"     size="md" icon={<Add />} />
        </div>
      ))}
    </div>
  ),
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => {
    const states: Array<{ label: string; props: Partial<React.ComponentProps<typeof IconButton>> }> = [
      { label: 'Default',  props: {} },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Loading',  props: { isLoading: true } },
    ];
    const emphases: IconButtonEmphasis[] = ['primary', 'secondary', 'ghost'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {emphases.map((emphasis) => (
          <div key={emphasis} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <span style={{ width: 80, fontSize: 12, color: 'var(--semantic-color-text-secondary)', fontFamily: 'monospace' }}>
              {emphasis}
            </span>
            {states.map(({ label, props }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <IconButton aria-label={label} emphasis={emphasis} size="md" icon={<Add />} {...props} />
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
    const sizes: IconButtonSize[]    = ['sm', 'md', 'lg'];
    const emphases: IconButtonEmphasis[] = ['primary', 'secondary', 'ghost'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sizes.map((size) => (
          <div key={size}>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
              size={size}
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              {emphases.map((emphasis) => (
                <div key={emphasis} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <IconButton aria-label="default"  emphasis={emphasis} size={size} icon={<Add />} />
                  <IconButton aria-label="disabled" emphasis={emphasis} size={size} icon={<Add />} disabled />
                  <IconButton aria-label="loading"  emphasis={emphasis} size={size} icon={<Add />} isLoading />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ── Íconos variados ─────────────────────────────────────────────────────────

export const IconosVariados: Story = {
  name: 'Íconos variados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton aria-label="Agregar"       emphasis="primary"   size="md" icon={<Add />} />
      <IconButton aria-label="Cerrar"        emphasis="secondary" size="md" icon={<Close />} />
      <IconButton aria-label="Editar"        emphasis="ghost"     size="md" icon={<Edit />} />
      <IconButton aria-label="Buscar"        emphasis="primary"   size="md" icon={<Search />} />
      <IconButton aria-label="Configuración" emphasis="secondary" size="md" icon={<Settings />} />
      <IconButton aria-label="Favorito"      emphasis="ghost"     size="md" icon={<Star />} />
    </div>
  ),
};
