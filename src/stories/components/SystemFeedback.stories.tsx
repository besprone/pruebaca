import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckmarkFilled, Renew } from '@carbon/icons-react';
import { SystemFeedback } from '../../components/SystemFeedback';
import type {
  SystemFeedbackEmphasis,
  SystemFeedbackState,
  SystemFeedbackSize,
} from '../../components/SystemFeedback';
import { Button } from '../../components/Button/Button';
import { ImgSlot } from '../../components/ImgSlot';
import type { ImgSlotState } from '../../components/ImgSlot';

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

/** `media` real para `emphasis="high"` — banda `feedbackState` de 160px. */
const MediaBand = ({ state = 'success' }: { state?: ImgSlotState }) => (
  <ImgSlot type="feedbackState" state={state} size="lg" />
);

/** `media` real para `emphasis="low"` — `feedbackState` de 56px. */
const MediaIcon = ({ state = 'empty' }: { state?: ImgSlotState }) => (
  <ImgSlot type="feedbackState" state={state} size="sm" />
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
const Screen = ({ children }: { children: ReactNode }) => (
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
    actions: (
      <Button emphasis="primary" size="sm">
        Ajustar filtros
      </Button>
    ),
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
            <Button emphasis="ghost" size="xs">
              Restablecer búsqueda
            </Button>
            <Button emphasis="ghost" size="xs">
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
          <Button emphasis="ghost" size="xs">
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
            <Button emphasis="primary" size="sm" icon={<CheckmarkFilled />}>
              Ver inversión
            </Button>
            <Button emphasis="ghost" size="sm">
              Volver al inicio
            </Button>
          </>
        }
      />
    </Screen>
  ),
};

// ── Sticky con scroll — contenido más alto que la pantalla ────────────────
// La botonera queda fija al pie; el cuerpo (media + texto + content) scrollea.

export const StickyScroll: Story = {
  name: 'Sticky — cuerpo scrollea, botonera fija (high · sm)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        blockSize: 460,
        inlineSize: 360,
        display: 'flex',
        border: '1px solid var(--semantic-color-border-subtle)',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--semantic-color-bg-surface)',
      }}
    >
      <SystemFeedback
        emphasis="high"
        state="success"
        size="sm"
        transaction
        media={<MediaBand state="info" />}
        label="Confirma los datos de tu transferencia"
        supporting="Revisa cada campo antes de continuar. Este movimiento no se puede revertir una vez confirmado."
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <TxnDetail />
            <TxnDetail />
            <TxnDetail />
          </div>
        }
        actions={
          <>
            <Button emphasis="primary" size="sm">
              Confirmar transferencia
            </Button>
            <Button emphasis="ghost" size="sm">
              Cancelar
            </Button>
          </>
        }
      />
    </div>
  ),
};

// ── Welcome back — 3 acciones apiladas (Figma node 5667-12435) ────────────

export const WelcomeBack: Story = {
  name: 'Welcome back — 3 acciones (high · sm · sticky)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Screen>
      <SystemFeedback
        emphasis="high"
        state="empty"
        size="sm"
        media={<MediaBand state="info" />}
        label="Bienvenido de nuevo, Marco Antonio"
        supporting="Encontramos una cuenta asociada a mar•••@gmail.com. Elige cómo quieres iniciar sesión."
        actions={
          <>
            <Button emphasis="ghost" size="sm">
              Contactar a soporte
            </Button>
            <Button emphasis="secondary" size="sm">
              ¿Olvidaste tu contraseña?
            </Button>
            <Button emphasis="primary" size="sm">
              Iniciar sesión
            </Button>
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
          <Button emphasis="primary" size="sm" icon={<Renew />}>
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
          <Button emphasis="primary" size="md" icon={<CheckmarkFilled />}>
            Ver inversión
          </Button>
          <Button emphasis="ghost" size="md">
            Volver al inicio
          </Button>
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
      actions={
        <Button emphasis="primary" size="md">
          Entendido
        </Button>
      }
    />
  ),
};
