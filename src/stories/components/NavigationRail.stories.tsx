import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dashboard,
  ChartLine,
  Money,
  Wallet,
  Document,
  Settings,
  Notification,
  Help,
} from '@carbon/icons-react';
import { NavigationRail } from '../../components/Navigation';
import type { RailSection } from '../../components/Navigation';
import { RailNavItem } from '../../components/Navigation/RailNavItem';
import { Button } from '../../components/Button/Button';
import { Brand } from '../../components/Brand/Brand';

const meta: Meta<typeof NavigationRail> = {
  title: 'Components/Navigation/Rail',
  component: NavigationRail,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    sections: { control: false },
    logo: { control: false },
    avatar: { control: false },
    footer: { control: false },
    value: { control: false },
    mode: { control: 'inline-radio', options: ['rail', 'overlay'] },
    size: { control: 'inline-radio', options: ['lg', 'md'] },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationRail>;

const Logo = () => <Brand type="primary" brand="kubo" size="sm" />;

const demoAvatarSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="#1f6f21"/><circle cx="16" cy="12" r="5" fill="#fff"/><path d="M5 30c0-6 5-10 11-10s11 4 11 10" fill="#fff"/></svg>',
)}`;

const sections: RailSection[] = [
  {
    label: 'General',
    items: [
      { value: 'inicio', label: 'Inicio', supporting: 'Resumen', icon: <Dashboard />, badge: '3' },
      { value: 'inversiones', label: 'Inversiones', supporting: 'kubo.plazofijo', icon: <ChartLine /> },
      { value: 'prestamos', label: 'Préstamos', supporting: 'Sin activos', icon: <Money /> },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { value: 'movimientos', label: 'Movimientos', supporting: 'Últimos 30 días', icon: <Wallet /> },
      { value: 'documentos', label: 'Documentos', supporting: 'Estados de cuenta', icon: <Document /> },
    ],
  },
  {
    label: 'Ayuda',
    items: [
      { value: 'notificaciones', label: 'Notificaciones', supporting: '3 sin leer', icon: <Notification />, badge: '3' },
      { value: 'soporte', label: 'Soporte', supporting: 'Chat y FAQ', icon: <Help /> },
      { value: 'ajustes', label: 'Ajustes', supporting: 'Preferencias', icon: <Settings />, disabled: true },
    ],
  },
];

function RailDemo({ mode = 'rail' as const, size, compact }: { mode?: 'rail' | 'overlay'; size?: 'lg' | 'md'; compact?: boolean }) {
  const [value, setValue] = useState('inversiones');
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(true);

  const rail = (
    <NavigationRail
      logo={<Logo />}
      sections={sections}
      value={value}
      onChange={setValue}
      mode={mode}
      expanded={expanded}
      onExpandedChange={setExpanded}
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => setMounted(false)}
      size={size}
      compact={compact}
      avatar={{ value: 'perfil', label: 'Marco Antonio', supporting: 'marco@kubo.mx', avatarProps: { type: 'img', src: demoAvatarSrc, alt: '' } }}
      avatarLabel="Cuenta"
      footer={{ label: 'Cerrar sesión', onClick: () => {} }}
      aria-label="Navegación principal"
    />
  );

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--semantic-color-bg-canvas)' }}>
      {mode === 'overlay' ? (
        <>
          {mounted && rail}
          <Button
            emphasis="secondary"
            size="sm"
            onClick={() => {
              setMounted(true);
              setOpen(true);
            }}
            style={{ margin: 24, alignSelf: 'flex-start' }}
          >
            Abrir navegación
          </Button>
        </>
      ) : (
        rail
      )}
      <div style={{ flex: 1, padding: 32, fontFamily: 'var(--typography-font-family)' }}>
        <h2 style={{ margin: 0, color: 'var(--semantic-color-text-primary)' }}>
          {sections.flatMap((s) => s.items).find((i) => i.value === value)?.label ?? 'Perfil'}
        </h2>
        <p style={{ color: 'var(--semantic-color-text-secondary)' }}>Contenido de la sección seleccionada.</p>
      </div>
    </div>
  );
}

export const Playground: Story = {
  args: { mode: 'rail', size: 'lg', compact: false },
  render: (args) => <RailDemo mode={args.mode as 'rail' | 'overlay'} size={args.size} compact={args.compact} />,
};

export const Colapsable: Story = {
  name: 'Colapsable (rail)',
  parameters: { controls: { disable: true } },
  render: () => <RailDemo mode="rail" />,
};

export const Overlay: Story = {
  name: 'Overlay (con X)',
  parameters: { controls: { disable: true } },
  render: () => <RailDemo mode="overlay" />,
};

export const TamanoMd: Story = {
  name: 'size="md" (sin supporting)',
  parameters: { controls: { disable: true } },
  render: () => <RailDemo mode="rail" size="md" />,
};

export const BuildingBlock: Story = {
  name: 'RailNavItem (building block)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 32, alignItems: 'flex-start', background: 'var(--semantic-color-bg-surface)' }}>
      <div style={{ width: 240, display: 'flex', flexDirection: 'column' }}>
        <span style={legend}>horizontal</span>
        <RailNavItem label="Inicio" supporting="Resumen" icon={<Dashboard />} badge="3" selected />
        <RailNavItem label="Inversiones" supporting="kubo.plazofijo" icon={<ChartLine />} />
        <RailNavItem label="Ajustes" supporting="Preferencias" icon={<Settings />} disabled />
        <RailNavItem label="Compacto" icon={<Money />} compact />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={legend}>vertical</span>
        <RailNavItem orientation="vertical" label="Inicio" icon={<Dashboard />} badge="3" selected />
        <RailNavItem orientation="vertical" label="Inversiones" icon={<ChartLine />} />
        <RailNavItem orientation="vertical" label="Con label" supporting="sub" icon={<Wallet />} showContent />
      </div>
    </div>
  ),
};

const legend: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
  marginBottom: 8,
};
