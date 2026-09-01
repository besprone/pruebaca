import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChipGroup } from '../../components/ChipGroup/ChipGroup';

const meta: Meta<typeof ChipGroup> = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
    'aria-label': 'Periodo',
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
type Story = StoryObj<typeof ChipGroup>;

const periodos = [
  { value: '1s', label: '1s' },
  { value: '1m', label: '1m' },
  { value: '3m', label: '3m' },
  { value: '1a', label: '1a' },
  { value: '2a', label: '2a' },
  { value: 'todo', label: 'Todo' },
];

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState('3m');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ChipGroup {...args} options={periodos} value={value} onChange={setValue} />
          <p style={{ margin: 0, fontSize: 13, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
            value: {value}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── No controlado ──────────────────────────────────────────────────────────

export const NoControlado: Story = {
  name: 'No controlado (defaultValue)',
  parameters: { controls: { disable: true } },
  render: () => (
    <ChipGroup options={periodos} defaultValue="1a" aria-label="Periodo de fecha" />
  ),
};

// ── Scroll horizontal (no wrap) ────────────────────────────────────────────

export const ScrollHorizontal: Story = {
  name: 'Scroll horizontal (sin wrap)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 240 }}>
      <ChipGroup
        options={[
          { value: 'inicio', label: 'Inicio' },
          { value: 'inversion', label: 'Inversión' },
          { value: 'credito', label: 'Crédito' },
          { value: 'ahorro', label: 'Ahorro' },
          { value: 'metas', label: 'Metas' },
        ]}
        defaultValue="inversion"
        aria-label="Sección"
      />
    </div>
  ),
};

// ── Estados ────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          con un chip disabled
        </span>
        <ChipGroup
          options={[
            { value: 'auto', label: 'Auto' },
            { value: 'casa', label: 'Casa', disabled: true },
            { value: 'navidad', label: 'Navidad' },
          ]}
          defaultValue="auto"
          aria-label="Meta"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          grupo disabled
        </span>
        <ChipGroup options={periodos} defaultValue="3m" disabled aria-label="Periodo" />
      </div>
    </div>
  ),
};
