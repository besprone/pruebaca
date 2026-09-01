import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '../../components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    'aria-label': 'Aceptar términos',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [checked, setChecked] = useState(!!args.checked);
      return (
        <Checkbox
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
      <Checkbox aria-label="unselected" />
      <Checkbox aria-label="selected" defaultChecked />
      <Checkbox aria-label="indeterminate" indeterminate />
    </div>
  ),
};

// ── Matriz completa (13 variantes) ─────────────────────────────────────────

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
      { type: 'indeterminate', props: { indeterminate: true } },
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rows.map(({ type, props }) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ ...label, width: 96 }}>{type}</span>
            <div style={cell}>
              <Checkbox aria-label={`${type} default`} {...props} />
              <span style={label}>default</span>
            </div>
            <div style={cell}>
              <Checkbox aria-label={`${type} disabled`} {...props} disabled />
              <span style={label}>disabled</span>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...label, width: 96 }}>unselected</span>
          <div style={cell}>
            <Checkbox aria-label="unselected error" error />
            <span style={label}>error</span>
          </div>
        </div>
        <p style={{ ...label, margin: 0 }}>hovered / pressed → interactúa con el mouse.</p>
      </div>
    );
  },
};

// ── Seleccionar todo (indeterminate real) ──────────────────────────────────

export const SeleccionarTodo: Story = {
  name: 'Seleccionar todo (indeterminate)',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [items, setItems] = useState([false, false, false]);
      const all = items.every(Boolean);
      const some = items.some(Boolean);
      const labels = ['Correos de producto', 'Novedades', 'Encuestas'];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Checkbox
              aria-label="Seleccionar todo"
              checked={all}
              indeterminate={some && !all}
              onChange={(e) => setItems(items.map(() => e.target.checked))}
            />
            <span style={{ fontFamily: 'var(--typography-font-family)', fontSize: 14 }}>
              Seleccionar todo
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 24 }}>
            {items.map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Checkbox
                  aria-label={labels[i]}
                  checked={v}
                  onChange={(e) => setItems(items.map((it, j) => (j === i ? e.target.checked : it)))}
                />
                <span style={{ fontFamily: 'var(--typography-font-family)', fontSize: 14 }}>
                  {labels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
