import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from '../../components/Radio/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
    name: 'demo',
    'aria-label': 'Opción',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [checked, setChecked] = useState(!!args.checked);
      return (
        <Radio
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    }
    return <Demo />;
  },
};

// ── Tipos ───────────────────────────────────────────────────────────────────

export const Tipos: Story = {
  name: 'Tipos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Radio aria-label="unselected" name="tipos" />
      <Radio aria-label="selected" name="tipos" defaultChecked />
    </div>
  ),
};

// ── Matriz completa (8 variantes) ─────────────────────────────────────────

export const Matriz: Story = {
  name: 'Matriz completa',
  parameters: { controls: { disable: true } },
  render: () => {
    const cell: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
    };
    const label: React.CSSProperties = {
      fontSize: 11,
      fontFamily: 'monospace',
      color: 'var(--semantic-color-text-secondary)',
    };
    const rows = [
      { type: 'unselected', props: {} },
      { type: 'selected', props: { defaultChecked: true } },
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rows.map(({ type, props }) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ ...label, width: 84 }}>{type}</span>
            <div style={cell}>
              <Radio aria-label={`${type} default`} name={`m-${type}`} {...props} />
              <span style={label}>default</span>
            </div>
            <div style={cell}>
              <Radio aria-label={`${type} disabled`} name={`md-${type}`} {...props} disabled />
              <span style={label}>disabled</span>
            </div>
          </div>
        ))}
        <p style={{ ...label, margin: 0 }}>hovered / pressed → interactúa con el mouse.</p>
      </div>
    );
  },
};

// ── Grupo ───────────────────────────────────────────────────────────────────

export const Grupo: Story = {
  name: 'Grupo (selección única)',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [value, setValue] = useState('mensual');
      const opts = [
        { value: 'mensual', label: 'Pago mensual' },
        { value: 'quincenal', label: 'Pago quincenal' },
        { value: 'semanal', label: 'Pago semanal' },
      ];
      return (
        <div role="radiogroup" aria-label="Frecuencia de pago" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {opts.map((o) => (
            <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Radio
                name="frecuencia"
                value={o.value}
                checked={value === o.value}
                onChange={(e) => setValue(e.target.value)}
              />
              <span style={{ fontFamily: 'var(--typography-font-family)', fontSize: 14 }}>{o.label}</span>
            </label>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};
