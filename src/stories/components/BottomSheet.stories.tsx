import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckmarkOutline, Money, Wallet, Document, Purchase, ChevronRight } from '@carbon/icons-react';
import { BottomSheet } from '../../components/Overlays';
import type { BottomSheetProps, BottomSheetType } from '../../components/Overlays';
import { Button } from '../../components/Button/Button';
import { List } from '../../components/List';
import { ListItem } from '../../components/List/ListItem';

const TYPES: BottomSheetType[] = ['default', 'centered'];

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    fullHeight: { control: 'boolean' },
    showHandle: { control: 'boolean' },
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
    fullHeight: false,
    showHandle: true,
    showClose: true,
    label: 'Deposita dinero',
    supporting: 'Elige cómo quieres agregar fondos a tu cuenta',
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

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
      <p>Contenido de la pantalla detrás del sheet.</p>
      {children}
    </div>
  );
}

const chevron = <ChevronRight style={{ color: 'var(--semantic-color-icon-tertiary)' }} />;

const depositList = (
  <List type="segmented" size="sm">
    <ListItem interactive leading={<Money />} label="Transferencia SPEI" supporting="Sin comisión" trailing={chevron} />
    <ListItem interactive leading={<Wallet />} label="Tarjeta de débito" supporting="Inmediato" trailing={chevron} />
    <ListItem interactive leading={<Document />} label="Depósito en efectivo" supporting="En comercios afiliados" trailing={chevron} />
  </List>
);

function Demo({
  args,
  content,
}: {
  args: Partial<BottomSheetProps>;
  content: React.ReactNode;
}) {
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
        Abrir bottom sheet
      </Button>
      {mounted && (
        <BottomSheet
          {...(args as BottomSheetProps)}
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setMounted(false)}
        >
          {content}
        </BottomSheet>
      )}
    </Backdrop>
  );
}

export const Playground: Story = {
  render: (args) => <Demo args={args} content={depositList} />,
};

export const BasicSheet: Story = {
  name: 'Basic sheet',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{ type: 'default', label: 'Deposita dinero', supporting: 'Elige cómo quieres agregar fondos' }}
      content={depositList}
    />
  ),
};

export const Informational: Story = {
  name: 'Informational (centered)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        type: 'centered',
        label: 'Termina de configurar tu cuenta',
        supporting: 'Da el siguiente paso en tus finanzas',
        slotHeading: <CheckmarkOutline size={56} style={{ color: 'var(--semantic-color-icon-brand)' }} />,
      }}
      content={
        <List type="segmented" size="sm">
          <ListItem interactive leading={<Wallet />} label="Deposita dinero" supporting="Gestiona tus pagos" trailing={chevron} />
          <ListItem interactive leading={<Purchase />} label="Haz tu primera inversión" supporting="Invierte desde $50 MXN" trailing={chevron} />
        </List>
      }
    />
  ),
};

export const FullContent: Story = {
  name: 'Full content (fullHeight)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{ type: 'default', fullHeight: true, label: 'Selecciona una categoría' }}
      content={
        <List type="segmented" size="sm">
          {Array.from({ length: 18 }, (_, i) => (
            <ListItem key={i} interactive leading={<Document />} label={`Categoría ${i + 1}`} supporting="Toca para seleccionar" trailing={chevron} />
          ))}
        </List>
      }
    />
  ),
};

export const WithFooter: Story = {
  name: 'Con footer + microcopy',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{
        type: 'default',
        label: 'Confirma tu inversión',
        supporting: 'Revisa los detalles antes de continuar',
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
      content={depositList}
    />
  ),
};

export const Minimal: Story = {
  name: 'Minimal (sin label)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Demo
      args={{ type: 'default', showHandle: true, showClose: false }}
      content={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBlock: 8 }}>
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
