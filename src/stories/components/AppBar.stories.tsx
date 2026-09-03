import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Menu, Settings, ChartLine, View, Search, Close, Notification } from '@carbon/icons-react';
import { AppBar } from '../../components/AppBar/AppBar';
import type { AppBarSize, AppBarLayout, AppBarConfiguration } from '../../components/AppBar/AppBar';
import { IconButton } from '../../components/IconButton/IconButton';
import { SearchField } from '../../components/SearchField/SearchField';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Brand } from '../../components/Brand/Brand';

const SIZES: AppBarSize[] = ['sm', 'md', 'lg'];
const LAYOUTS: AppBarLayout[] = ['inline', 'stacked'];
const CONFIGS: AppBarConfiguration[] = [
  'home',
  'home-settings',
  'navigation',
  'dialog',
  'search',
  'section',
  'resumen-de-saldos',
  'dos-columnas',
];

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    layout: { control: 'inline-radio', options: [undefined, ...LAYOUTS] },
    elevation: { control: 'inline-radio', options: [undefined, 'flat', 'raised'] },
    configuration: { control: 'select', options: [undefined, ...CONFIGS] },
    leading: { control: false },
    trailing: { control: false },
    headline: { control: 'text' },
    supporting: { control: 'text' },
  },
  args: { size: 'md', headline: 'Inversiones', supporting: 'kubo.plazofijo' },
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
  name: 'Configuraciones (prop configuration)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--semantic-color-bg-canvas)' }}>
      <p style={legend}>configuration="home-settings" · sm</p>
      <AppBar
        configuration="home-settings"
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

      <p style={legend}>configuration="home" · md</p>
      <AppBar
        configuration="home"
        size="md"
        leading={<IconButton emphasis="ghost" size="lg" aria-label="Menú" icon={<Menu />} />}
        headline="Inicio"
        supporting="Buen día, Marco"
        trailing={threeActions}
      />

      <p style={legend}>configuration="navigation" · lg · layout="stacked" (columna centrada)</p>
      <AppBar
        configuration="navigation"
        size="lg"
        layout="stacked"
        leading={back}
        headline="Detalle del contrato"
        supporting="kubo.plazofijo · #4821"
        trailing={<IconButton emphasis="ghost" size="lg" aria-label="Buscar" icon={<Search />} />}
      />

      <p style={legend}>configuration="dialog" · lg (fuerza stacked · centrado · pt 12 / pb 16)</p>
      <AppBar
        configuration="dialog"
        size="lg"
        headline="Nueva inversión"
        supporting="Configura tu plazo y monto"
        trailing={<IconButton emphasis="ghost" size="lg" aria-label="Cerrar" icon={<Close />} />}
      />

      <p style={legend}>configuration="search" · sm (sin bloque de texto)</p>
      <AppBar
        configuration="search"
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

      <p style={legend}>configuration="section" · lg (inset ancho · sin leading)</p>
      <AppBar
        configuration="section"
        size="lg"
        headline="Movimientos"
        supporting="Últimos 30 días"
        trailing={
          <Button emphasis="secondary" size="sm">
            Exportar
          </Button>
        }
      />

      <p style={legend}>configuration="resumen-de-saldos" · md</p>
      <AppBar
        configuration="resumen-de-saldos"
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

      <p style={legend}>configuration="dos-columnas" · md (centrado ancho · raised por defecto)</p>
      <AppBar
        configuration="dos-columnas"
        size="md"
        leading={back}
        headline="Inversiones"
        supporting="kubo.plazofijo"
        trailing={threeActions}
      />
    </div>
  ),
};

export const Colapso: Story = {
  name: 'Colapsada ↔ expandida',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--semantic-color-bg-canvas)', padding: 24 }}>
      <div>
        <p style={legend}>expandida — layout="stacked" size="lg" (el supporting hace wrap)</p>
        <div style={{ maxWidth: 420, border: '1px solid var(--semantic-color-border-default)' }}>
          <AppBar
            size="lg"
            layout="stacked"
            leading={back}
            headline="Confirma tu información"
            supporting="Revisa que tus datos sean correctos antes de continuar. Estos datos se obtuvieron de tu identificación."
            trailing={<IconButton emphasis="ghost" size="lg" aria-label="Información" icon={<Notification />} />}
          />
        </div>
      </div>
      <div>
        <p style={legend}>colapsada — layout="inline" size="sm" (headline junto al back, supporting 1 línea)</p>
        <div style={{ maxWidth: 420, border: '1px solid var(--semantic-color-border-default)' }}>
          <AppBar
            size="sm"
            leading={back}
            headline="Confirma tu información"
            supporting="Revisa que tus datos sean correctos antes de continuar. Estos datos se obtuvieron de tu identificación."
          />
        </div>
      </div>
    </div>
  ),
};

function ScrollDemo() {
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = el.scrollTop;
      setAtTop(y <= 0);
      // colapsa al bajar; se expande solo al llegar al top
      if (y > lastY.current && y > 24) setScrolled(true);
      if (y <= 0) setScrolled(false);
      lastY.current = y;
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div ref={ref} style={{ height: '100vh', overflowY: 'auto', background: 'var(--semantic-color-bg-canvas)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        {scrolled ? (
          <AppBar
            size="sm"
            elevation="raised"
            leading={<IconButton emphasis="ghost" size="lg" aria-label="Volver" icon={<ArrowLeft />} />}
            headline="Confirma tu información"
            supporting="Revisa que tus datos sean correctos antes de continuar."
          />
        ) : (
          <AppBar
            size="lg"
            layout="stacked"
            elevation={atTop ? 'flat' : 'raised'}
            leading={<IconButton emphasis="ghost" size="lg" aria-label="Volver" icon={<ArrowLeft />} />}
            headline="Confirma tu información"
            supporting="Revisa que tus datos sean correctos antes de continuar. Estos datos se obtuvieron de tu identificación."
          />
        )}
      </div>
      <div style={{ padding: 24, fontFamily: 'var(--typography-font-family)', color: 'var(--semantic-color-text-secondary)' }}>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Fila de contenido {i + 1} — baja para colapsar la barra, sube al top para expandirla.</p>
        ))}
      </div>
    </div>
  );
}

export const EnContexto: Story = {
  name: 'En contexto (scroll)',
  parameters: { controls: { disable: true } },
  render: () => <ScrollDemo />,
};
