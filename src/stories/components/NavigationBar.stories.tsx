import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Analytics, Money, Portfolio, ScanAlt } from '@carbon/icons-react';
import { NavigationBar } from '../../components/NavigationBar';
import type { NavigationBarItemDef } from '../../components/NavigationBar';
import { NavigationBarItem } from '../../components/NavigationBar/NavigationBarItem';

const meta: Meta<typeof NavigationBar> = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: { layout: 'centered' },
  argTypes: {
    items: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
    border: { control: 'inline-radio', options: ['top', 'bottom'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

// ── Avatar de ejemplo (rellena el slot circular de 24px) ────────────────────

function DemoAvatar() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
      <rect width="24" height="24" fill="var(--semantic-color-bg-brand)" />
      <circle cx="12" cy="9.5" r="4" fill="#fff" />
      <path d="M4.5 21c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" fill="#fff" />
    </svg>
  );
}

// ── Sets de items ──────────────────────────────────────────────────────────

const three: NavigationBarItemDef[] = [
  { value: 'inicio', label: 'Inicio', icon: <Home /> },
  { value: 'inversion', label: 'Inversión', icon: <Analytics /> },
  { value: 'credito', label: 'Crédito', icon: <Money /> },
];

const five: NavigationBarItemDef[] = [
  { value: 'inicio', label: 'Inicio', icon: <Home /> },
  { value: 'inversion', label: 'Inversión', icon: <Analytics /> },
  { value: 'credito', label: 'Crédito', icon: <Money /> },
  { value: 'portafolio', label: 'Portafolio', icon: <Portfolio /> },
  { value: 'perfil', label: 'Perfil', type: 'avatar', avatar: <DemoAvatar />, 'aria-label': 'Tu perfil' },
];

// ── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { border: 'top' },
  render: (args) => {
    const [value, setValue] = useState('inicio');
    return (
      <NavigationBar
        {...args}
        items={five}
        value={value}
        onChange={setValue}
        aria-label="Navegación principal"
      />
    );
  },
};

// ── Cantidad de items (3 · 4 · 5) ──────────────────────────────────────────

export const Cantidad: Story = {
  name: 'Cantidad de items',
  parameters: { controls: { disable: true } },
  render: () => {
    const [a, setA] = useState('inicio');
    const [b, setB] = useState('inicio');
    const [c, setC] = useState('inicio');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <NavigationBar items={three} value={a} onChange={setA} aria-label="Nav 3 items" />
        <NavigationBar items={five.slice(0, 4)} value={b} onChange={setB} aria-label="Nav 4 items" />
        <NavigationBar items={five} value={c} onChange={setC} aria-label="Nav 5 items" />
      </div>
    );
  },
};

// ── Con item emphasis (acción destacada, no navegable) ─────────────────────

export const ConEmphasis: Story = {
  name: 'Con item emphasis',
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = useState('inicio');
    const [scans, setScans] = useState(0);
    const items: NavigationBarItemDef[] = [
      { value: 'inicio', label: 'Inicio', icon: <Home /> },
      { value: 'inversion', label: 'Inversión', icon: <Analytics /> },
      {
        value: 'escanear',
        type: 'emphasis',
        label: 'Escanear',
        icon: <ScanAlt />,
        'aria-label': 'Escanear código',
        onSelect: () => setScans((n) => n + 1),
      },
      { value: 'credito', label: 'Crédito', icon: <Money /> },
      { value: 'perfil', label: 'Perfil', type: 'avatar', avatar: <DemoAvatar />, 'aria-label': 'Tu perfil' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <NavigationBar items={items} value={value} onChange={setValue} aria-label="Navegación con acción" />
        <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 12, color: 'var(--semantic-color-text-secondary)' }}>
          activo: {value} · escaneos: {scans} (el emphasis no cambia la selección)
        </p>
      </div>
    );
  },
};

// ── Borde superior / inferior ─────────────────────────────────────────────

export const Borde: Story = {
  name: 'Borde (top / bottom)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [a, setA] = useState('inicio');
    const [b, setB] = useState('inicio');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={legend}>border=&quot;top&quot; — nav anclada abajo</p>
          <NavigationBar items={three} value={a} onChange={setA} border="top" aria-label="Nav borde top" />
        </div>
        <div>
          <p style={legend}>border=&quot;bottom&quot; — nav anclada arriba</p>
          <NavigationBar items={three} value={b} onChange={setB} border="bottom" aria-label="Nav borde bottom" />
        </div>
      </div>
    );
  },
};

// ── En contexto (anclada al borde inferior) ──────────────────────────────

export const EnContexto: Story = {
  name: 'En contexto',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => {
    const [value, setValue] = useState('inicio');
    return (
      <div
        style={{
          position: 'relative',
          width: 360,
          height: 520,
          margin: '24px auto',
          border: '1px solid var(--semantic-color-border-subtle)',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'var(--semantic-color-bg-canvas)',
        }}
      >
        <div style={{ padding: 24, fontFamily: 'var(--typography-font-family)' }}>
          <p style={{ margin: 0, color: 'var(--semantic-color-text-secondary)', fontSize: 13 }}>
            Saldo disponible
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 28, fontWeight: 700, color: 'var(--semantic-color-text-primary)' }}>
            $5,000.00
          </p>
        </div>
        <div style={{ position: 'absolute', insetInline: 0, bottom: 0 }}>
          <NavigationBar items={five} value={value} onChange={setValue} aria-label="Navegación principal" />
        </div>
      </div>
    );
  },
};

// ── Building blocks (documentación — no exportados) ───────────────────────

export const BuildingBlocks: Story = {
  name: 'Building blocks',
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'flex-start',
        background: 'var(--semantic-color-bg-surface)',
        padding: 16,
        borderRadius: 12,
      }}
    >
      <NavigationBarItem type="icon" icon={<Home />} label="Inicio" selected />
      <NavigationBarItem type="icon" icon={<Analytics />} label="Inversión" />
      <NavigationBarItem type="avatar" avatar={<DemoAvatar />} label="Perfil" selected aria-label="Perfil seleccionado" />
      <NavigationBarItem type="avatar" avatar={<DemoAvatar />} label="Perfil" aria-label="Perfil" />
      <NavigationBarItem type="emphasis" icon={<ScanAlt />} label="Escanear" aria-label="Escanear" />
    </div>
  ),
};

const legend: React.CSSProperties = {
  margin: '0 0 8px',
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
