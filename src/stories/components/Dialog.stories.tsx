import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckmarkOutline, Money, Wallet, Document, ChevronRight, Share, Search } from '@carbon/icons-react';
import { Dialog } from '../../components/Overlays';
import type { DialogProps, DialogType } from '../../components/Overlays';
import { Button } from '../../components/Button/Button';
import { IconButton } from '../../components/IconButton/IconButton';
import { List } from '../../components/List';
import { ListItem } from '../../components/List/ListItem';

const TYPES: DialogType[] = ['default', 'centered', 'iframe', 'slotOnly'];

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    fullHeight: { control: 'boolean' },
    showClose: { control: 'boolean' },
    label: { control: 'text' },
    supporting: { control: 'text' },
    microcopy: { control: 'text' },
    slotHeading: { control: false },
    footer: { control: false },
    headerAction: { control: false },
    open: { control: false },
    children: { control: false },
  },
  args: {
    type: 'default',
    size: 'md',
    fullHeight: false,
    showClose: true,
    label: 'Confirma tu transferencia',
    supporting: 'Revisa los detalles antes de continuar',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

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
      <p>Contenido de la pantalla detrás del diálogo.</p>
      {children}
    </div>
  );
}

const chevron = <ChevronRight style={{ color: 'var(--semantic-color-icon-tertiary)' }} />;

const accountsList = (
  <List type="segmented" size="sm">
    <ListItem interactive leading={<Money />} label="Cuenta kubo" supporting="•••• 4821" trailing={chevron} />
    <ListItem interactive leading={<Wallet />} label="Tarjeta de débito" supporting="•••• 0193" trailing={chevron} />
  </List>
);

function Demo({ args, content }: { args: Partial<DialogProps>; content?: React.ReactNode }) {
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
        Abrir diálogo
      </Button>
      {mounted && (
        <Dialog
          {...(args as DialogProps)}
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setMounted(false)}
        >
          {content}
        </Dialog>
      )}
    </Backdrop>
  );
}

export const Playground: Story = {
  render: (args) => <Demo args={args} content={accountsList} />,
};

export const BasicDialog: Story = {
  name: 'Default (confirmación)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        type: 'default',
        label: 'Confirma tu transferencia',
        supporting: 'Vas a transferir $2,500 MXN a Juan Pérez',
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
      content={accountsList}
    />
  ),
};

export const Informational: Story = {
  name: 'Centered (informational)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        type: 'centered',
        label: 'Cuenta creada con éxito',
        supporting: 'Ya puedes empezar a mover tu dinero con kubo',
        slotHeading: <CheckmarkOutline size={56} style={{ color: 'var(--semantic-color-icon-brand)' }} />,
        footer: (
          <Button emphasis="primary" size="sm">
            Continuar
          </Button>
        ),
      }}
    />
  ),
};

export const Iframe: Story = {
  name: 'Iframe (contenido embebido)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        type: 'iframe',
        headerAction: (
          <>
            <IconButton emphasis="ghost" size="lg" aria-label="Compartir" icon={<Share />} />
            <IconButton emphasis="ghost" size="lg" aria-label="Buscar" icon={<Search />} />
          </>
        ),
        footer: (
          <Button emphasis="primary" size="sm">
            Continuar
          </Button>
        ),
      }}
      content={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            blockSize: '100%',
            color: 'var(--semantic-color-text-tertiary)',
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          contenido embebido
        </div>
      }
    />
  ),
};

export const SlotOnly: Story = {
  name: 'Slot only',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{ type: 'slotOnly' }}
      content={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 24 }}>
          <Button emphasis="secondary" size="sm">
            Compartir
          </Button>
          <Button emphasis="secondary" size="sm">
            Descargar
          </Button>
          <Button emphasis="secondary" size="sm">
            Reportar
          </Button>
        </div>
      }
    />
  ),
};

export const FullContent: Story = {
  name: 'Full height + footer',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        type: 'default',
        fullHeight: true,
        size: 'lg',
        label: 'Selecciona una cuenta destino',
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
      content={
        <List type="segmented" size="sm">
          {Array.from({ length: 14 }, (_, i) => (
            <ListItem key={i} interactive leading={<Document />} label={`Cuenta ${i + 1}`} supporting="Toca para seleccionar" trailing={chevron} />
          ))}
        </List>
      }
    />
  ),
};
