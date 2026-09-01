import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { Switch } from '../../components/Switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
    'aria-label': 'Ocultar saldo',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [checked, setChecked] = useState(!!args.checked);
      return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
    }
    return <Demo />;
  },
};

// ── selected true / false ──────────────────────────────────────────────────

export const Selected: Story = {
  name: 'selected false / true',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch aria-label="off" />
      <Switch aria-label="on" defaultChecked />
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
      width: 88,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={label}>selected=false</span>
          <Switch aria-label="enabled off" />
          <Switch aria-label="disabled off" disabled />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={label}>selected=true</span>
          <Switch aria-label="enabled on" defaultChecked />
          <Switch aria-label="disabled on" defaultChecked disabled />
        </div>
        <p style={{ ...label, width: 'auto', margin: 0 }}>hover / pressed → interactúa con el mouse.</p>
      </div>
    );
  },
};

// ── En row de ajustes (label + switch) ─────────────────────────────────────

export const EnRow: Story = {
  name: 'En row de ajustes',
  parameters: { controls: { disable: true } },
  render: () => {
    function SettingRow({ label: text, defaultChecked }: { label: string; defaultChecked?: boolean }) {
      const id = useId();
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '12px 0',
            borderBottom: '1px solid var(--semantic-color-border-subtle)',
          }}
        >
          <label htmlFor={id} style={{ fontFamily: 'var(--typography-font-family)', fontSize: 15 }}>
            {text}
          </label>
          <Switch id={id} defaultChecked={defaultChecked} />
        </div>
      );
    }
    return (
      <div style={{ width: 320 }}>
        <SettingRow label="Ocultar saldo" defaultChecked />
        <SettingRow label="Notificaciones push" defaultChecked />
        <SettingRow label="Ingreso con biometría" />
        <SettingRow label="Modo oscuro" />
      </div>
    );
  },
};
