import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowLeft } from '@carbon/icons-react';
import { SearchField } from '../../components/SearchField/SearchField';
import type { SearchFieldVariant } from '../../components/SearchField/SearchField';
import { IconButton } from '../../components/IconButton/IconButton';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['appbar', 'inContainer'] satisfies SearchFieldVariant[],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    variant: 'appbar',
    disabled: false,
    placeholder: 'Buscar inversiones',
    'aria-label': 'Buscar inversiones',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchField>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Controlado (con clear) ──────────────────────────────────────────────────

export const Controlado: Story = {
  name: 'Controlado (con clear)',
  parameters: { controls: { disable: true } },
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState('pagaré');
      return (
        <SearchField
          {...args}
          variant="inContainer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      );
    }
    return <Demo />;
  },
};

// ── Por variante ────────────────────────────────────────────────────────────

export const PorVariante: Story = {
  name: 'Por variante',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <SearchField
        variant="appbar"
        aria-label="Buscar inversiones"
        placeholder="Buscar inversiones"
      />
      <SearchField
        variant="inContainer"
        aria-label="Buscar inversiones"
        placeholder="Buscar inversiones"
      />
    </div>
  ),
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      {(['appbar', 'inContainer'] as SearchFieldVariant[]).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'var(--semantic-color-text-secondary)',
            }}
          >
            variant={variant}
          </span>
          <SearchField variant={variant} aria-label="Buscar" placeholder="Placeholder (vacío)" />
          <SearchField
            variant={variant}
            aria-label="Buscar"
            defaultValue="Texto ingresado"
            onClear={() => {}}
          />
          <SearchField
            variant={variant}
            aria-label="Buscar"
            defaultValue="No editable"
            disabled
            onClear={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

// ── En app bar ──────────────────────────────────────────────────────────────

export const EnAppBar: Story = {
  name: 'En app bar (search mode)',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [value, setValue] = useState('');
      return (
        <div
          style={{
            width: 320,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 8,
            borderRadius: 'var(--containers-radius-200)',
            background: 'var(--semantic-color-bg-surface)',
            boxShadow: 'var(--elevation-200, 0 1px 2px rgba(0,0,0,0.12))',
          }}
        >
          <IconButton
            emphasis="ghost"
            size="sm"
            aria-label="Cerrar búsqueda"
            icon={<ArrowLeft />}
          />
          <div style={{ flex: 1 }}>
            <SearchField
              variant="appbar"
              aria-label="Buscar inversiones"
              placeholder="Buscar inversiones"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClear={() => setValue('')}
            />
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
