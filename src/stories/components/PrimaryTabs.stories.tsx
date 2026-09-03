import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Document, Time, CheckmarkOutline } from '@carbon/icons-react';
import { PrimaryTabs } from '../../components/Tabs';
import type { PrimaryTabDef, PrimaryTabsDistribution, PrimaryTabsSize } from '../../components/Tabs';
import { PrimaryTab } from '../../components/Tabs/PrimaryTab';

const DISTRIBUTION: PrimaryTabsDistribution[] = ['equal', 'content'];
const SIZE: PrimaryTabsSize[] = ['sm', 'md', 'lg'];

const meta: Meta<typeof PrimaryTabs> = {
  title: 'Components/Tabs/Primary',
  component: PrimaryTabs,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
    distribution: { control: 'inline-radio', options: DISTRIBUTION },
    size: { control: 'inline-radio', options: SIZE },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PrimaryTabs>;

const three: PrimaryTabDef[] = [
  { value: 'vigentes', label: 'Vigentes' },
  { value: 'finalizadas', label: 'Finalizadas' },
  { value: 'todas', label: 'Todas' },
];

const withIcons: PrimaryTabDef[] = [
  { value: 'docs', label: 'Documentos', icon: <Document /> },
  { value: 'historial', label: 'Historial', icon: <Time /> },
  { value: 'estado', label: 'Estado', icon: <CheckmarkOutline /> },
];

const many: PrimaryTabDef[] = [
  { value: 'a', label: 'Resumen' },
  { value: 'b', label: 'Movimientos' },
  { value: 'c', label: 'Rendimientos' },
  { value: 'd', label: 'Documentos' },
  { value: 'e', label: 'Configuración' },
  { value: 'f', label: 'Ayuda' },
];

export const Playground: Story = {
  args: { distribution: 'equal', size: 'md' },
  render: (args) => {
    const [v, setV] = useState('vigentes');
    return <PrimaryTabs {...args} items={three} value={v} onChange={setV} aria-label="Inversiones" />;
  },
};

export const ConIconos: Story = {
  name: 'Con iconos',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('docs');
    return <PrimaryTabs items={withIcons} value={v} onChange={setV} aria-label="Detalle" />;
  },
};

export const Distribucion: Story = {
  name: 'distribution (equal · content)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [a, setA] = useState('a');
    const [b, setB] = useState('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={legend}>equal — ancho equitativo, sin scroll (2–4 tabs)</p>
          <PrimaryTabs items={three} value={a} onChange={setA} distribution="equal" aria-label="Equal" />
        </div>
        <div>
          <p style={legend}>content — ancho por contenido, scroll horizontal</p>
          <PrimaryTabs items={many} value={b} onChange={setB} distribution="content" aria-label="Content" />
        </div>
      </div>
    );
  },
};

export const Tamanos: Story = {
  name: 'Tamaños (content)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {SIZE.map((s) => (
          <div key={s}>
            <p style={legend}>size=&quot;{s}&quot;</p>
            <PrimaryTabs
              items={many.slice(0, 4)}
              value={v}
              onChange={setV}
              distribution="content"
              size={s}
              aria-label={`Size ${s}`}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const EnContexto: Story = {
  name: 'En contexto',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => {
    const [v, setV] = useState('vigentes');
    return (
      <div style={{ maxWidth: 380, margin: '16px auto', border: '1px solid var(--semantic-color-border-subtle)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', fontFamily: 'var(--typography-font-family)' }}>
          <strong style={{ fontSize: 20, color: 'var(--semantic-color-text-primary)' }}>Inversiones</strong>
        </div>
        <PrimaryTabs items={three} value={v} onChange={setV} aria-label="Inversiones" />
        <div style={{ padding: 20, minHeight: 160, fontFamily: 'var(--typography-font-family)', color: 'var(--semantic-color-text-secondary)' }}>
          Contenido de «{three.find((t) => t.value === v)?.label}»
        </div>
      </div>
    );
  },
};

export const Estados: Story = {
  name: 'Estados (building block)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 4, background: 'var(--semantic-color-bg-surface)', borderBottom: '1px solid var(--semantic-color-border-default)' }}>
      <PrimaryTab label="Default" />
      <PrimaryTab label="Selected" selected showIndicator />
      <PrimaryTab label="Disabled" disabled />
    </div>
  ),
};

const legend: React.CSSProperties = {
  margin: '0 0 8px',
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
