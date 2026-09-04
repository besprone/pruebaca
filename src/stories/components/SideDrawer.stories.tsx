import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Money, Wallet, Document, ChevronRight } from '@carbon/icons-react';
import { SideDrawer } from '../../components/Overlays';
import type { SideDrawerProps, SideDrawerAnchor } from '../../components/Overlays';
import { Button } from '../../components/Button/Button';
import { List } from '../../components/List';
import { ListItem } from '../../components/List/ListItem';

const ANCHORS: SideDrawerAnchor[] = ['left', 'right'];

const meta: Meta<typeof SideDrawer> = {
  title: 'Components/SideDrawer',
  component: SideDrawer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    anchor: { control: 'inline-radio', options: ANCHORS },
    size: { control: false },
    showClose: { control: 'boolean' },
    label: { control: 'text' },
    supporting: { control: 'text' },
    microcopy: { control: 'text' },
    footer: { control: false },
    headerAction: { control: false },
    open: { control: false },
    children: { control: false },
  },
  args: {
    anchor: 'right',
    showClose: true,
    label: 'Filtrar movimientos',
    supporting: 'Ajusta el rango y el tipo de movimiento',
  },
};

export default meta;
type Story = StoryObj<typeof SideDrawer>;

function Backdrop({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--semantic-color-bg-canvas)',
        fontFamily: 'var(--typography-font-family)',
        color: 'var(--semantic-color-text-secondary)',
        padding: 24,
      }}
    >
      <p>Contenido de la pantalla detrás del drawer.</p>
      {children}
    </div>
  );
}

const chevron = <ChevronRight style={{ color: 'var(--semantic-color-icon-tertiary)' }} />;

const filtersList = (
  <List type="segmented" size="sm">
    <ListItem interactive leading={<Money />} label="Depósitos" supporting="Últimos 30 días" trailing={chevron} />
    <ListItem interactive leading={<Wallet />} label="Retiros" supporting="Últimos 30 días" trailing={chevron} />
    <ListItem interactive leading={<Document />} label="Transferencias" supporting="Últimos 30 días" trailing={chevron} />
  </List>
);

function Demo({ args, content }: { args: Partial<SideDrawerProps>; content?: React.ReactNode }) {
  const [mounted, setMounted] = useState(true);
  const [open, setOpen] = useState(true);
  return (
    <Backdrop>
      <Button
        emphasis="secondary"
        size="sm"
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
      >
        Abrir drawer
      </Button>
      {mounted && (
        <SideDrawer
          {...(args as SideDrawerProps)}
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setMounted(false)}
        >
          {content}
        </SideDrawer>
      )}
    </Backdrop>
  );
}

export const Playground: Story = {
  render: (args) => <Demo args={args} content={filtersList} />,
};

export const RightAnchor: Story = {
  name: 'Anclado a la derecha (default)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        anchor: 'right',
        label: 'Filtrar movimientos',
        supporting: 'Ajusta el rango y el tipo de movimiento',
        footer: (
          <>
            <Button emphasis="secondary" size="sm">
              Limpiar
            </Button>
            <Button emphasis="primary" size="sm">
              Aplicar
            </Button>
          </>
        ),
      }}
      content={filtersList}
    />
  ),
};

export const LeftAnchor: Story = {
  name: 'Anclado a la izquierda',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        anchor: 'left',
        label: 'Navegación',
        supporting: 'Secciones de tu cuenta',
      }}
      content={filtersList}
    />
  ),
};

export const WithMicrocopy: Story = {
  name: 'Con footer + microcopy',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        label: 'Configura tu inversión',
        supporting: 'Elige el plazo y el monto',
        microcopy: 'Al continuar aceptas los términos del contrato de inversión kubo.plazofijo.',
        footer: (
          <>
            <Button emphasis="secondary" size="sm">
              Cancelar
            </Button>
            <Button emphasis="primary" size="sm">
              Confirmar
            </Button>
          </>
        ),
      }}
      content={filtersList}
    />
  ),
};

export const Minimal: Story = {
  name: 'Minimal (sin label)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{ showClose: false }}
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBlock: 16 }}>
          <Button emphasis="secondary" size="sm">
            Compartir
          </Button>
          <Button emphasis="secondary" size="sm">
            Descargar
          </Button>
        </div>
      }
    />
  ),
};
