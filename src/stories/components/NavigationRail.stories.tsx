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

/* Lockup real `kubo.financiero` (Figma `brand_assets_kugo_logo` · type=primary /
   variant=original / size=sm · 131×16). El wordmark usa `currentColor` para
   adaptarse a light/dark; los verdes de marca quedan fijos. En producción esto
   viene del componente de marca del DS. */
const Logo = () => (
  <svg width="131" height="16" viewBox="0 0 131 16" fill="none" aria-label="kubo.financiero">
    <path d="M13.5583 1.6H1.59756V14.045H13.5583V1.6Z" fill="#2E9F30" />
    <path
      d="M39.7826 6.68007C40.0364 6.2157 40.4114 5.82899 40.8666 5.56191C41.3215 5.29506 41.8399 5.15729 42.3666 5.16347C44.2995 5.16347 45.8695 6.68002 45.8695 9.64394V9.7748C45.8695 12.7455 44.2999 14.2307 42.35 14.2309C41.8186 14.2603 41.2906 14.1296 40.8333 13.8559C40.3761 13.5821 40.01 13.1775 39.7826 12.6937V14.0072H36.9447V1.6H39.7826V6.68007ZM30.1458 10.5404C30.146 11.5155 30.509 11.9906 31.3177 11.9906C32.1265 11.9906 32.7298 11.4636 32.7298 10.3607V5.39101H35.5677V14.0072H32.7298V12.6869C32.2843 13.576 31.4755 14.221 30.098 14.2211C28.4975 14.2211 27.308 13.1867 27.308 11.0189L27.3011 5.39101H30.1458V10.5404ZM51.1947 5.16347C53.7616 5.16347 55.7122 6.86262 55.7123 9.59902V9.73379C55.7121 12.5355 53.7312 14.2142 51.1781 14.2143C48.7048 14.2143 46.7713 12.6971 46.6527 10.0678L46.6468 9.81582V9.68203C46.6468 6.92505 48.628 5.16367 51.1947 5.16347ZM21.2044 1.6V8.80996L23.4388 5.39492H26.3861L23.6751 9.27187L26.6087 14.0209H23.4388L21.2044 10.2436V14.0209H18.3666V1.6H21.2044ZM51.181 7.36562C50.1017 7.36581 49.5326 8.14145 49.5326 9.59218V9.72695C49.5326 11.2085 50.0881 12.0187 51.181 12.0189C52.2743 12.0189 52.8158 11.1944 52.8158 9.75722V9.62636C52.8157 8.17563 52.2605 7.36562 51.181 7.36562ZM41.3519 7.40078C40.3549 7.40102 39.7036 8.17586 39.7035 9.62636V9.75722C39.7035 11.2252 40.3206 11.9699 41.3519 11.9701C42.3835 11.9701 42.9837 11.1947 42.9837 9.7748V9.64394C42.9837 8.12752 42.3492 7.40078 41.3519 7.40078Z"
      fill="currentColor"
    />
    <path d="M59.1906 11.8945H56.9561V14.2208H59.1906V11.8945Z" fill="#D0DD28" />
    <path
      d="M99.2437 5.04655C100.83 5.04658 101.948 5.85657 102.633 7.52116L102.698 7.67643L101.43 8.25163L101.362 8.08659C100.885 6.8769 100.227 6.36296 99.1988 6.36296C98.0131 6.36309 96.7487 7.24192 96.7486 9.70573C96.7486 11.7598 97.6983 13.0866 99.1685 13.0866C100.231 13.0865 100.844 12.6148 101.43 11.3434L101.512 11.1911L102.722 11.7253L102.647 11.8844C101.872 13.6006 100.741 14.4001 99.1304 14.4001C97.2901 14.4 95.3092 12.9525 95.3091 9.72331C95.3091 6.49401 97.2868 5.04655 99.2437 5.04655ZM110.872 5.04655C113.099 5.04655 114.484 6.83865 114.484 9.72331V10.0954H108.453C108.535 11.8942 109.508 13.0863 110.933 13.0866C112.043 13.0866 112.729 12.67 113.415 11.5915L113.518 11.4255L114.474 12.2008L114.395 12.3317C113.559 13.7103 112.404 14.4001 110.872 14.4001C108.946 14.3999 107.002 12.9073 107.002 9.70573C107.003 6.50433 109.007 5.04669 110.872 5.04655ZM125.423 5.04655C127.768 5.04655 129.403 6.96962 129.403 9.72331C129.403 12.4769 127.778 14.4001 125.423 14.4001C123.069 14.4 121.424 12.4769 121.424 9.72331C121.424 6.96967 123.069 5.04662 125.423 5.04655ZM82.1177 5.04655C83.9992 5.04655 84.9966 6.06342 84.9966 7.98307V11.9118C84.9966 12.9729 85.0622 13.5758 85.2232 13.9928L85.3189 14.2311H83.8013L83.7632 14.11C83.6691 13.811 83.6065 13.5025 83.5777 13.1901C82.6988 13.9589 81.5726 14.3819 80.4078 14.3796C78.828 14.3794 77.8511 13.4797 77.8511 12.0358C77.8511 10.0542 79.6128 8.88584 83.564 8.24479V7.94792C83.5639 6.86945 83.05 6.34538 82.022 6.34538C80.6444 6.34545 79.7119 7.01435 78.982 7.66569L78.8521 7.78288L78.0435 6.81803L78.1597 6.70378C78.6738 6.17285 79.29 5.75235 79.9703 5.46745C80.6504 5.18262 81.381 5.03958 82.1177 5.04655ZM64.1089 1.69303C64.3317 1.69305 64.6262 1.71035 64.7701 1.74479H64.9205V3.04753L64.7291 3.02311C64.6126 2.9921 64.3623 2.99186 64.191 2.99186C63.3445 2.99186 62.9673 3.32361 62.9673 4.06803V5.21159H64.8248V6.52507H62.9673V14.2204H61.521V6.52507H60.0474V5.21159H61.521V4.08464C61.5211 2.5201 62.416 1.69303 64.1089 1.69303ZM67.4019 14.2204H65.9556V5.21159H67.4019V14.2204ZM73.8755 5.04655C75.5823 5.04655 76.5596 6.04588 76.5562 7.78288V14.2204H75.1099V7.99674C75.1099 6.86632 74.6435 6.36296 73.5982 6.36296C72.6798 6.363 71.8229 6.79697 70.8257 7.77214V14.2204H69.3794V5.21159H70.8257V6.34928C71.6419 5.54279 72.7317 5.0773 73.8755 5.04655ZM91.2925 5.04655C92.9992 5.04655 93.9761 6.04588 93.9761 7.78288V14.2204H92.5298V7.99674C92.5298 6.86636 92.0501 6.363 91.022 6.36296C90.1001 6.36296 89.2429 6.79684 88.2457 7.77214V14.2204H86.7994V5.21159H88.2457V6.34928C89.0614 5.54411 90.1499 5.07878 91.2925 5.04655ZM105.502 14.2204H104.055V5.21159H105.502V14.2204ZM120.79 6.42839H120.3C119.036 6.42839 117.99 7.14523 117.349 8.44792V14.2204H115.903V5.20866H117.349V6.58659C117.718 6.08441 118.203 5.67938 118.761 5.4069C119.25 5.16842 119.783 5.03801 120.325 5.02214H120.937L120.79 6.42839ZM125.423 6.36296C123.874 6.36303 122.874 7.67599 122.874 9.70573C122.874 11.2669 123.542 13.0865 125.423 13.0866C126.962 13.0866 127.957 11.7598 127.957 9.70573C127.957 8.04119 127.171 6.36296 125.423 6.36296ZM83.564 9.40299C79.774 10.0888 79.2803 11.085 79.2769 11.8708C79.2771 12.9215 80.1374 13.0798 80.648 13.0798C81.1927 13.072 81.7307 12.9568 82.231 12.7399C82.7314 12.5229 83.1844 12.2082 83.564 11.8151V9.40299ZM110.855 6.34538C109.871 6.34538 108.751 7.01125 108.487 8.86198H113.051C112.962 7.97974 112.568 6.34555 110.855 6.34538ZM67.4361 3.55046H65.9253V1.98991H67.4361V3.55046ZM105.536 3.55046H104.025V1.98991H105.536V3.55046Z"
      fill="currentColor"
    />
  </svg>
);

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

  const rail = (
    <NavigationRail
      logo={<Logo />}
      sections={sections}
      value={value}
      onChange={setValue}
      mode={mode}
      expanded={expanded}
      onExpandedChange={setExpanded}
      onClose={() => setOpen(false)}
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
          {open && rail}
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{ margin: 24, height: 40, padding: '0 16px', alignSelf: 'flex-start' }}
          >
            Abrir navegación
          </button>
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
