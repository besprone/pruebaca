import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '@carbon/icons-react';
import { FilterChip } from '../../components/FilterChip/FilterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Components/FilterChip',
  component: FilterChip,
  parameters: { layout: 'centered' },
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    selected: false,
    disabled: false,
    children: 'Vigente',
  },
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [selected, setSelected] = useState(!!args.selected);
      return (
        <FilterChip {...args} selected={selected} onClick={() => setSelected((s) => !s)} />
      );
    }
    return <Demo />;
  },
};

// ── Selected ────────────────────────────────────────────────────────────────

export const Selected: Story = {
  name: 'selected false / true',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <FilterChip>No seleccionado</FilterChip>
      <FilterChip selected>Seleccionado</FilterChip>
    </div>
  ),
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => {
    const label: React.CSSProperties = {
      fontSize: 11,
      fontFamily: 'monospace',
      color: 'var(--semantic-color-text-secondary)',
      width: 72,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={label}>unselected</span>
          <FilterChip>default</FilterChip>
          <FilterChip disabled>disabled</FilterChip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={label}>selected</span>
          <FilterChip selected>default</FilterChip>
          <FilterChip selected disabled>
            disabled
          </FilterChip>
        </div>
        <p style={{ ...label, width: 'auto', margin: 0 }}>hover / pressed → interactúa con el mouse.</p>
      </div>
    );
  },
};

// ── Con leading ─────────────────────────────────────────────────────────────

export const ConLeading: Story = {
  name: 'Con ícono leading',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <FilterChip leading={<Calendar />}>Fecha</FilterChip>
      <FilterChip leading={<Calendar />} selected>
        Fecha
      </FilterChip>
    </div>
  ),
};

// ── Multi-select (armado por el consumidor) ────────────────────────────────

export const MultiSelect: Story = {
  name: 'Multi-select (sin ChipGroup)',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const opts = ['Auto', 'Casa', 'Navidad', 'Educación'];
      const [sel, setSel] = useState<string[]>(['Auto', 'Navidad']);
      const toggle = (v: string) =>
        setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
      return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 320 }}>
          {opts.map((o) => (
            <FilterChip key={o} selected={sel.includes(o)} onClick={() => toggle(o)}>
              {o}
            </FilterChip>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};
