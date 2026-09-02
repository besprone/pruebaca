import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Currency, ChartLine, Wallet, Document } from '@carbon/icons-react';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import type { DropdownOption } from '../../components/Dropdown/Dropdown';

const PLAZOS: DropdownOption[] = [
  { value: '3m', label: '3 meses' },
  { value: '6m', label: '6 meses' },
  { value: '12m', label: '12 meses' },
  { value: '18m', label: '18 meses' },
  { value: '24m', label: '24 meses' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
  argTypes: {
    searchable: { control: 'boolean' },
    multiple: { control: 'boolean' },
    maxHeight: { control: { type: 'number' } },
    options: { control: false },
    value: { control: false },
    onSelect: { action: 'select' },
  },
  args: {
    searchable: false,
    multiple: false,
    maxHeight: 320,
    'aria-label': 'Plazo',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '6m');
      return (
        <Dropdown
          {...args}
          options={PLAZOS}
          value={value}
          onSelect={(v) => {
            setValue((prev) =>
              args.multiple
                ? (Array.isArray(prev) ? prev : []).includes(v)
                  ? (prev as string[]).filter((x) => x !== v)
                  : [...(prev as string[]), v]
                : v,
            );
            args.onSelect?.(v);
          }}
        />
      );
    }
    return <Demo />;
  },
};

// ── Lista simple ──────────────────────────────────────────────────────────

export const Lista: Story = {
  name: 'type = list',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [v, setV] = useState('6m');
      return <Dropdown aria-label="Plazo" options={PLAZOS} value={v} onSelect={setV} />;
    }
    return <Demo />;
  },
};

// ── Con búsqueda ─────────────────────────────────────────────────────────

export const ConBusqueda: Story = {
  name: 'type = search + list',
  parameters: { controls: { disable: true } },
  render: () => {
    const options: DropdownOption[] = [
      'Aguascalientes', 'Baja California', 'Campeche', 'Chiapas', 'Chihuahua',
      'Ciudad de México', 'Coahuila', 'Durango', 'Guanajuato', 'Jalisco',
      'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Yucatán', 'Zacatecas',
    ].map((s) => ({ value: s, label: s }));
    function Demo() {
      const [v, setV] = useState('Jalisco');
      return (
        <Dropdown
          aria-label="Estado"
          searchable
          searchPlaceholder="Buscar estado"
          options={options}
          value={v}
          onSelect={setV}
          maxHeight={240}
        />
      );
    }
    return <Demo />;
  },
};

// ── Con íconos ───────────────────────────────────────────────────────────

export const ConIconos: Story = {
  name: 'Opciones con ícono',
  parameters: { controls: { disable: true } },
  render: () => {
    const options: DropdownOption[] = [
      { value: 'casa', label: 'Casa', icon: <Home /> },
      { value: 'auto', label: 'Auto', icon: <Currency /> },
      { value: 'inv', label: 'Inversión', icon: <ChartLine /> },
      { value: 'ahorro', label: 'Ahorro', icon: <Wallet /> },
      { value: 'otro', label: 'Otro', icon: <Document /> },
    ];
    function Demo() {
      const [v, setV] = useState('auto');
      return <Dropdown aria-label="Categoría" options={options} value={v} onSelect={setV} />;
    }
    return <Demo />;
  },
};

// ── Múltiple ─────────────────────────────────────────────────────────────

export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [v, setV] = useState<string[]>(['6m', '12m']);
      return (
        <Dropdown
          aria-label="Plazos"
          multiple
          options={PLAZOS}
          value={v}
          onSelect={(x) => setV((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]))}
        />
      );
    }
    return <Demo />;
  },
};

// ── Con scroll ───────────────────────────────────────────────────────────

export const ConScroll: Story = {
  name: 'scroll (indicador propio)',
  parameters: { controls: { disable: true } },
  render: () => {
    const options: DropdownOption[] = Array.from({ length: 20 }, (_, i) => ({
      value: `${i}`,
      label: `Opción ${i + 1}`,
    }));
    function Demo() {
      const [v, setV] = useState('0');
      return <Dropdown aria-label="Opción" options={options} value={v} onSelect={setV} maxHeight={200} />;
    }
    return <Demo />;
  },
};

// ── Deshabilitadas ───────────────────────────────────────────────────────

export const Deshabilitadas: Story = {
  name: 'Opciones deshabilitadas',
  parameters: { controls: { disable: true } },
  render: () => {
    const options: DropdownOption[] = [
      { value: '3m', label: '3 meses' },
      { value: '6m', label: '6 meses', disabled: true },
      { value: '12m', label: '12 meses' },
      { value: '18m', label: '18 meses', disabled: true },
      { value: '24m', label: '24 meses' },
    ];
    function Demo() {
      const [v, setV] = useState('3m');
      return <Dropdown aria-label="Plazo" options={options} value={v} onSelect={setV} />;
    }
    return <Demo />;
  },
};
