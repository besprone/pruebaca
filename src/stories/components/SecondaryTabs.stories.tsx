import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Time, Calendar } from '@carbon/icons-react';
import { SecondaryTabs } from '../../components/Tabs';
import type { SecondaryTabDef } from '../../components/Tabs';
import { SecondaryTab } from '../../components/Tabs/SecondaryTab';

const meta: Meta<typeof SecondaryTabs> = {
  title: 'Components/Tabs/Secondary',
  component: SecondaryTabs,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 380 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SecondaryTabs>;

const two: SecondaryTabDef[] = [
  { value: 'plazo', label: 'Plazo', icon: <Time /> },
  { value: 'fecha', label: 'Fecha', icon: <Calendar /> },
];

const three: SecondaryTabDef[] = [
  { value: 'monto', label: 'Monto' },
  { value: 'rendimiento', label: 'Rendimiento' },
  { value: 'plazo', label: 'Plazo' },
];

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState('plazo');
    return <SecondaryTabs items={two} value={v} onChange={setV} aria-label="Elige un plazo o fecha" />;
  },
};

export const SinIcono: Story = {
  name: 'Sin icono (3 tabs)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('monto');
    return <SecondaryTabs items={three} value={v} onChange={setV} aria-label="Ordenar detalle" />;
  },
};

export const EnContexto: Story = {
  name: 'En contexto',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => {
    const [v, setV] = useState('plazo');
    return (
      <div style={{ maxWidth: 380, margin: '16px auto', border: '1px solid var(--semantic-color-border-subtle)', borderRadius: 16, overflow: 'hidden', fontFamily: 'var(--typography-font-family)' }}>
        <div style={{ padding: '16px 20px' }}>
          <strong style={{ fontSize: 18, color: 'var(--semantic-color-text-primary)' }}>Personaliza tu inversión</strong>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--semantic-color-text-secondary)' }}>
            Elige un plazo o fecha de vencimiento
          </p>
        </div>
        <SecondaryTabs items={two} value={v} onChange={setV} aria-label="Plazo o fecha" />
        <div style={{ padding: 20, minHeight: 140, color: 'var(--semantic-color-text-secondary)' }}>
          {v === 'plazo' ? 'Selecciona entre 7, 28 o 90 días.' : 'Selecciona una fecha de vencimiento del calendario.'}
        </div>
      </div>
    );
  },
};

export const Estados: Story = {
  name: 'Estados (building block)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', background: 'var(--semantic-color-bg-surface)', borderBottom: '1px solid var(--semantic-color-border-default)' }}>
      <SecondaryTab label="Default" icon={<Time />} />
      <SecondaryTab label="Selected" icon={<Time />} selected showIndicator />
      <SecondaryTab label="Disabled" icon={<Time />} disabled />
    </div>
  ),
};

export const VsPrimary: Story = {
  name: 'vs PrimaryTabs',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('plazo');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={legend}>secondary — indicador 2px full-width, sin redondeo</p>
        <SecondaryTabs items={two} value={v} onChange={setV} aria-label="Secondary demo" />
        <p style={{ ...legend, marginTop: 20 }}>
          (primary: indicador 4px de 32px con esquinas redondeadas)
        </p>
      </div>
    );
  },
};

const legend: React.CSSProperties = {
  margin: 0,
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
