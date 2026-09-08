import type { Meta, StoryObj } from '@storybook/react';
import { Search, CheckmarkFilled, Renew } from '@carbon/icons-react';
import { SystemFeedback } from '../../components/SystemFeedback';
import type {
  SystemFeedbackEmphasis,
  SystemFeedbackState,
  SystemFeedbackSize,
} from '../../components/SystemFeedback';
import { Button } from '../../components/Button/Button';

const meta: Meta<typeof SystemFeedback> = {
  title: 'Components/SystemFeedback',
  component: SystemFeedback,
  parameters: { layout: 'padded' },
  argTypes: {
    emphasis: {
      control: 'radio',
      options: ['low', 'high'] satisfies SystemFeedbackEmphasis[],
    },
    state: {
      control: 'radio',
      options: ['empty', 'success'] satisfies SystemFeedbackState[],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'] satisfies SystemFeedbackSize[],
    },
    transaction: { control: 'boolean' },
    sticky: { control: 'boolean' },
    label: { control: 'text' },
    supporting: { control: 'text' },
    media: { control: false },
    content: { control: false },
    actions: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof SystemFeedback>;

/** Banda ilustrativa de marcador de posición (equivale al `_building_blocks_img_component` de Figma). */
const MediaBand = () => (
  <div
    aria-hidden="true"
    style={{
      display: 'grid',
      placeItems: 'center',
      inlineSize: '100%',
      blockSize: '100%',
      background: 'var(--semantic-color-bg-brandSoft)',
      color: 'var(--semantic-color-text-secondary)',
      font: '600 14px/1 var(--typography-font-family)',
    }}
  >
    Ilustración
  </div>
);

/** Icono de 56px para el tratamiento `low`. */
const MediaIcon = () => (
  <div
    aria-hidden="true"
    style={{
      display: 'grid',
      placeItems: 'center',
      inlineSize: '100%',
      blockSize: '100%',
      borderRadius: '50%',
      background: 'var(--semantic-color-bg-brandSoft)',
      color: 'var(--semantic-color-text-brand)',
    }}
  >
    <Search size={24} />
  </div>
);

/** Detalle de transacción de ejemplo para el slot `content`. */
const TxnDetail = () => (
  <dl
    style={{
      margin: 0,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '4px 16px',
      padding: '16px',
      borderRadius: '12px',
      background: 'var(--semantic-color-bg-canvas)',
      font: '500 14px/20px var(--typography-font-family)',
      textAlign: 'left',
    }}
  >
    <dt style={{ color: 'var(--semantic-color-text-secondary)' }}>Monto</dt>
    <dd style={{ margin: 0, color: 'var(--semantic-color-text-primary)' }}>$5,000.00</dd>
    <dt style={{ color: 'var(--semantic-color-text-secondary)' }}>Referencia</dt>
    <dd style={{ margin: 0, color: 'var(--semantic-color-text-primary)' }}>KUBO-8842193</dd>
  </dl>
);

/** Marco que simula el viewport de una pantalla para las variantes `sticky`. */
const Screen = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      blockSize: 680,
      inlineSize: 360,
      display: 'flex',
      border: '1px solid var(--semantic-color-border-subtle, #e5e5e8)',
      borderRadius: 16,
      overflow: 'hidden',
      background: 'var(--semantic-color-bg-surface)',
    }}
  >
    {children}
  </div>
);

// ── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    emphasis: 'high',
    state: 'empty',
    size: 'sm',
    transaction: false,
    sticky: false,
    label: 'No encontramos resultados',
    supporting: 'Prueba con otro término o ajusta los filtros.',
    media: <MediaBand />,
    actions: <Button emphasis="primary">Ajustar filtros</Button>,
  },
};

// ── Empty state (low) ──────────────────────────────────────────────────────

export const EmptyBusqueda: Story = {
  name: 'Empty — búsqueda (low)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <SystemFeedback
        emphasis="low"
        state="empty"
        media={<MediaIcon />}
        label="No encontramos resultados"
        supporting="Prueba con otro término o ajusta los filtros."
        actions={
          <>
            <Button emphasis="ghost" size="sm">
              Restablecer búsqueda
            </Button>
            <Button emphasis="ghost" size="sm">
              Ajustar filtros
            </Button>
          </>
        }
      />
    </div>
  ),
};

export const EmptySinImagen: Story = {
  name: 'Empty — sólo texto + link (low)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <SystemFeedback
        emphasis="low"
        state="empty"
        label="Aún no tienes movimientos"
        supporting="Cuando realices tu primera operación aparecerá aquí."
        actions={
          <Button emphasis="ghost" size="sm">
            Cómo empezar
          </Button>
        }
      />
    </div>
  ),
};

// ── Success transaccional (high · sm · sticky) ─────────────────────────────

export const SuccessTransaccion: Story = {
  name: 'Success — transacción (high · sm · sticky)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Screen>
      <SystemFeedback
        emphasis="high"
        state="success"
        size="sm"
        transaction
        media={<MediaBand />}
        label="Listo, tu inversión quedó registrada"
        supporting="Verás el rendimiento reflejado en tu balance."
        content={<TxnDetail />}
        actions={
          <>
            <Button emphasis="primary" icon={<CheckmarkFilled />}>
              Ver inversión
            </Button>
            <Button emphasis="ghost">Volver al inicio</Button>
          </>
        }
      />
    </Screen>
  ),
};

// ── Informativo (high · sm · sin imagen) ──────────────────────────────────

export const Informativo: Story = {
  name: 'Informativo — reintento (high · sm)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <SystemFeedback
        emphasis="high"
        state="empty"
        size="sm"
        sticky={false}
        label="No pudimos cargar la información"
        supporting="Revisa tu conexión e inténtalo de nuevo."
        actions={
          <Button emphasis="primary" icon={<Renew />}>
            Reintentar
          </Button>
        }
      />
    </div>
  ),
};

// ── Success transaccional (high · md · web) ───────────────────────────────

export const SuccessMd: Story = {
  name: 'Success — transacción (high · md)',
  parameters: { controls: { disable: true } },
  render: () => (
    <SystemFeedback
      emphasis="high"
      state="success"
      size="md"
      transaction
      media={<MediaBand />}
      label="Listo, tu inversión quedó registrada"
      supporting="Verás el rendimiento reflejado en tu balance en las próximas horas."
      content={<TxnDetail />}
      actions={
        <>
          <Button emphasis="primary" icon={<CheckmarkFilled />}>
            Ver inversión
          </Button>
          <Button emphasis="ghost">Volver al inicio</Button>
        </>
      }
    />
  ),
};

export const SuccessMdSinContenido: Story = {
  name: 'Success — sin content slot (high · md)',
  parameters: { controls: { disable: true } },
  render: () => (
    <SystemFeedback
      emphasis="high"
      state="success"
      size="md"
      media={<MediaBand />}
      label="Tu solicitud fue enviada"
      supporting="Te avisaremos por correo cuando haya novedades."
      actions={<Button emphasis="primary">Entendido</Button>}
    />
  ),
};
