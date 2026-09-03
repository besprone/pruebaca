import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Menu, Settings, ChartLine, View, Search, Close, Notification } from '@carbon/icons-react';
import { AppBar } from '../../components/AppBar/AppBar';
import type { AppBarSize, AppBarLayout } from '../../components/AppBar/AppBar';
import { IconButton } from '../../components/IconButton/IconButton';
import { SearchField } from '../../components/SearchField/SearchField';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Brand } from '../../components/Brand/Brand';

const SIZES: AppBarSize[] = ['sm', 'md', 'lg'];
const LAYOUTS: AppBarLayout[] = ['inline', 'stacked'];

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    layout: { control: 'inline-radio', options: LAYOUTS },
    elevation: { control: 'inline-radio', options: ['flat', 'raised'] },
    leading: { control: false },
    trailing: { control: false },
    headline: { control: 'text' },
    supporting: { control: 'text' },
  },
  args: { size: 'md', layout: 'inline', elevation: 'flat', headline: 'Inversiones', supporting: 'kubo.plazofijo' },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

const back = <IconButton emphasis="ghost" size="lg" aria-label="Volver" icon={<ArrowLeft />} />;
const threeActions = (
  <>
    <IconButton emphasis="ghost" size="lg" aria-label="Rendimiento" icon={<ChartLine />} />
    <IconButton emphasis="ghost" size="lg" aria-label="Ver" icon={<View />} />
    <IconButton emphasis="ghost" size="lg" aria-label="Notificaciones" icon={<Notification />} />
  </>
);
const avatarSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#1f6f21"/><circle cx="20" cy="15" r="6" fill="#fff"/><path d="M6 38c0-8 6-13 14-13s14 5 14 13" fill="#fff"/></svg>',
)}`;

const legend: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
  padding: '16px 16px 4px',
};

export const Playground: Story = {
  render: (args) => (
    <AppBar {...args} leading={<IconButton emphasis="ghost" size="lg" aria-label="Menú" icon={<Menu />} />} trailing={threeActions} />
  ),
};

export const Configuraciones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--semantic-color-bg-canvas)' }}>
      <p style={legend}>home settings · sm · inline</p>
      <AppBar
        size="sm"
        leading={<Brand type="secondary" size="md" />}
        trailing={
          <>
            <IconButton emphasis="ghost" size="lg" aria-label="Rendimiento" icon={<ChartLine />} />
            <IconButton emphasis="ghost" size="lg" aria-label="Ajustes" icon={<Settings />} />
            <Avatar type="img" src={avatarSrc} alt="" />
          </>
        }
      />

      <p style={legend}>home · md · inline</p>
      <AppBar
        size="md"
        leading={<IconButton emphasis="ghost" size="lg" aria-label="Menú" icon={<Menu />} />}
        headline="Inicio"
        supporting="Buen día, Marco"
        trailing={threeActions}
      />

      <p style={legend}>navigation · lg · stacked</p>
      <AppBar
        size="lg"
        layout="stacked"
        leading={back}
        headline="Detalle del contrato"
        supporting="kubo.plazofijo · #4821"
        trailing={
          <IconButton emphasis="ghost" size="lg" aria-label="Buscar" icon={<Search />} />
        }
      />

      <p style={legend}>search · sm · inline</p>
      <AppBar
        size="sm"
        leading={back}
        trailing={
          <>
            <div style={{ flex: 1 }}>
              <SearchField placeholder="Buscar" aria-label="Buscar" />
            </div>
            <IconButton emphasis="ghost" size="lg" aria-label="Cerrar" icon={<Close />} />
          </>
        }
      />

      <p style={legend}>section · lg · inline (sin leading)</p>
      <AppBar
        size="lg"
        headline="Movimientos"
        supporting="Últimos 30 días"
        trailing={<Button emphasis="secondary" size="sm">Exportar</Button>}
      />

      <p style={legend}>resumen de saldos · md · inline</p>
      <AppBar
        size="md"
        leading={back}
        headline="$142,500.00"
        supporting="Saldo disponible"
        trailing={
          <>
            <IconButton emphasis="ghost" size="lg" aria-label="Rendimiento" icon={<ChartLine />} />
            <div style={{ width: 220 }}>
              <SearchField placeholder="Buscar" aria-label="Buscar" />
            </div>
          </>
        }
      />

      <p style={legend}>raised (on-scroll)</p>
      <AppBar size="md" elevation="raised" leading={back} headline="Inversiones" supporting="kubo.plazofijo" trailing={threeActions} />
    </div>
  ),
};

function ScrollDemo() {
  const [raised, setRaised] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setRaised(el.scrollTop > 4);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div ref={ref} style={{ height: '100vh', overflowY: 'auto', background: 'var(--semantic-color-bg-canvas)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <AppBar
          size="md"
          elevation={raised ? 'raised' : 'flat'}
          leading={<IconButton emphasis="ghost" size="lg" aria-label="Volver" icon={<ArrowLeft />} />}
          headline="Inversiones"
          supporting="kubo.plazofijo"
          trailing={<IconButton emphasis="ghost" size="lg" aria-label="Buscar" icon={<Search />} />}
        />
      </div>
      <div style={{ padding: 24, fontFamily: 'var(--typography-font-family)', color: 'var(--semantic-color-text-secondary)' }}>
        {Array.from({ length: 40 }, (_, i) => (
          <p key={i}>Fila de contenido {i + 1} — haz scroll para ver la elevación de la barra.</p>
        ))}
      </div>
    </div>
  );
}

export const EnContexto: Story = {
  name: 'En contexto (on-scroll)',
  parameters: { controls: { disable: true } },
  render: () => <ScrollDemo />,
};
