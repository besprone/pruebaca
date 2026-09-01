import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { PasswordDots } from '../../components/PasswordField/PasswordDots';

const meta: Meta<typeof PasswordField> = {
  title: 'Components/PasswordField',
  component: PasswordField,
  parameters: { layout: 'centered' },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showToggle: { control: 'boolean' },
    defaultVisible: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Contraseña',
    helperText: 'Usa al menos 8 caracteres',
    error: false,
    disabled: false,
    showToggle: true,
    defaultVisible: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Controlado ──────────────────────────────────────────────────────────────

export const Controlado: Story = {
  name: 'Controlado (toggle visibilidad)',
  parameters: { controls: { disable: true } },
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState('sup3rs3cr3t');
      const [visible, setVisible] = useState(false);
      return (
        <PasswordField
          {...args}
          label="Contraseña"
          helperText={visible ? 'Visible' : 'Oculta con dots del sistema'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          visible={visible}
          onVisibilityChange={setVisible}
        />
      );
    }
    return <Demo />;
  },
};

// ── Text configuration ──────────────────────────────────────────────────────

export const TextConfiguration: Story = {
  name: 'Text configuration',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 328 }}>
      <PasswordField label="Label text (vacío, sin placeholder)" helperText="label centrado" />
      <PasswordField
        label="Placeholder text"
        placeholder="Ingresa tu contraseña"
        helperText="label flotado + placeholder"
      />
      <PasswordField label="Input text" defaultValue="contraseña123" helperText="label flotado + valor" />
    </div>
  ),
};

// ── Visibilidad ─────────────────────────────────────────────────────────────

export const Visibilidad: Story = {
  name: 'Visibilidad: hidden vs visible',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 328 }}>
      <PasswordField label="Hidden (default)" defaultValue="contraseña123" />
      <PasswordField label="Visible" defaultValue="contraseña123" defaultVisible />
    </div>
  ),
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 328 }}>
      <PasswordField label="Enabled" defaultValue="contraseña123" />
      <PasswordField
        label="Error"
        defaultValue="123"
        error
        helperText="La contraseña no cumple con el formato"
      />
      <PasswordField label="Disabled" defaultValue="contraseña123" disabled />
      <PasswordField label="Sin toggle" defaultValue="contraseña123" showToggle={false} helperText="showToggle=false" />
    </div>
  ),
};

// ── Building block ──────────────────────────────────────────────────────────

export const BuildingBlock: Story = {
  name: 'Building block (PasswordDots)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[4, 8, 12].map((n) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)', width: 64 }}
          >
            count={n}
          </span>
          <PasswordDots count={n} />
        </div>
      ))}
    </div>
  ),
};
