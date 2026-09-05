import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectBottomSheet, SelectWeb } from '../../components/Select';
import type { SelectOption } from '../../components/Select';

const meta: Meta = {
  title: 'Components/Select',
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

const paises: SelectOption[] = [
  { value: 'mx', label: 'México' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'ca', label: 'Canadá' },
  { value: 'br', label: 'Brasil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
];

function Frame({ children, width = 328 }: { children?: React.ReactNode; width?: number }) {
  return (
    <div style={{ maxWidth: width, background: 'var(--semantic-color-bg-canvas)', padding: 24 }}>
      {children}
    </div>
  );
}

// ── SelectBottomSheet (mobile/app) ──────────────────────────────────────────

export const BottomSheetPlayground: Story = {
  name: 'SelectBottomSheet — mobile/app',
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <Frame>
          <SelectBottomSheet
            label="País"
            helperText="Selecciona tu país de residencia"
            options={paises}
            value={value}
            onChange={setValue}
          />
        </Frame>
      );
    }
    return <Demo />;
  },
};

export const BottomSheetConValor: Story = {
  name: 'SelectBottomSheet — con valor preseleccionado',
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string | undefined>('mx');
      return (
        <Frame>
          <SelectBottomSheet label="País" options={paises} value={value} onChange={setValue} />
        </Frame>
      );
    }
    return <Demo />;
  },
};

export const BottomSheetError: Story = {
  name: 'SelectBottomSheet — error / disabled',
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SelectBottomSheet label="País" helperText="Campo requerido" error options={paises} />
        <SelectBottomSheet label="País" options={paises} value="mx" disabled />
      </div>
    </Frame>
  ),
};

// ── SelectWeb (tablet/desktop) ───────────────────────────────────────────────

export const WebPlayground: Story = {
  name: 'SelectWeb — tablet/desktop',
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <Frame width={360}>
          <SelectWeb
            label="País"
            helperText="Selecciona tu país de residencia"
            options={paises}
            value={value}
            onChange={setValue}
          />
        </Frame>
      );
    }
    return <Demo />;
  },
};

export const WebBuscable: Story = {
  name: 'SelectWeb — con búsqueda',
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <Frame width={360}>
          <SelectWeb label="País" options={paises} value={value} onChange={setValue} searchable />
        </Frame>
      );
    }
    return <Demo />;
  },
};

export const WebError: Story = {
  name: 'SelectWeb — error / disabled',
  render: () => (
    <Frame width={360}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SelectWeb label="País" helperText="Campo requerido" error options={paises} />
        <SelectWeb label="País" options={paises} value="mx" disabled />
      </div>
    </Frame>
  ),
};
