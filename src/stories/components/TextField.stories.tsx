import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextField } from '../../components/TextField/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  argTypes: {
    error:        { control: 'boolean' },
    showTrailing: { control: 'boolean' },
    disabled:     { control: 'boolean' },
  },
  args: {
    label:        'Etiqueta',
    helperText:   'Texto de ayuda',
    error:        false,
    showTrailing: false,
    disabled:     false,
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
type Story = StoryObj<typeof TextField>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Controlado ──────────────────────────────────────────────────────────────

export const Controlado: Story = {
  name: 'Controlado (con clear)',
  parameters: { controls: { disable: true } },
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState('');
      return (
        <TextField
          {...args}
          label="Buscar"
          helperText="Escribe algo y luego bórralo con ×"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showTrailing={value.length > 0}
          onClear={() => setValue('')}
        />
      );
    }
    return <Demo />;
  },
};

// ── Estados ──────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField
        label="Vacío"
        helperText="Estado por defecto"
      />
      <TextField
        label="Con valor"
        defaultValue="Texto ingresado"
        helperText="Label flotando, sin trailing"
      />
      <TextField
        label="Con error"
        defaultValue="valor inválido"
        error
        showTrailing
        helperText="Este campo tiene un error"
      />
      <TextField
        label="Deshabilitado"
        defaultValue="No editable"
        disabled
        helperText="No se puede modificar"
      />
    </div>
  ),
};

// ── Flotado vs centrado ───────────────────────────────────────────────────────

export const LabelFlotado: Story = {
  name: 'Label: centrado vs flotado',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField
        label="Sin valor (label centrado)"
      />
      <TextField
        label="Con valor (label flotado)"
        defaultValue="Calipso 2.0"
      />
    </div>
  ),
};

// ── Con trailing ─────────────────────────────────────────────────────────────

export const ConTrailing: Story = {
  name: 'Trailing: clear y warning',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField
        label="Clear button"
        defaultValue="Texto con botón de limpiar"
        showTrailing
        helperText="Trailing = ícono Close (ghost)"
      />
      <TextField
        label="Error con warning"
        defaultValue="valor inválido"
        error
        showTrailing
        helperText="Trailing = ícono WarningFilled (estático)"
      />
    </div>
  ),
};
