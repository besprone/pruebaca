import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useRef, useState } from 'react';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import type { SnackbarVariant } from '../../components/Snackbar/Snackbar';
import { SnackbarLayout } from '../../components/Snackbar/SnackbarLayout';
import { SnackbarActions } from '../../components/Snackbar/SnackbarActions';

const VARIANTS: SnackbarVariant[] = ['neutral', 'success', 'warning', 'error', 'info'];

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    message: { control: 'text' },
    action: { control: false },
    onClose: { control: false },
    role: { control: 'inline-radio', options: [undefined, 'status', 'alert'] },
  },
  args: {
    variant: 'neutral',
    message: 'Detalle de inversión descargado',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const label: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--semantic-color-text-secondary)',
};

const noop = () => {};

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    action: { label: 'Ver', onClick: noop },
  },
  render: (args) => <Snackbar {...args} />,
};

// ── Variantes ──────────────────────────────────────────────────────────────

export const Variantes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      {VARIANTS.map((v) => (
        <div key={v}>
          <p style={{ ...label, marginBottom: 6 }}>{v}</p>
          <Snackbar variant={v} message={`Mensaje ${v}`} action={{ label: 'Ver', onClick: noop }} />
        </div>
      ))}
    </div>
  ),
};

// ── Composiciones (action / close / ambos / solo mensaje) ──────────────────

export const Composiciones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <div>
        <p style={{ ...label, marginBottom: 6 }}>solo mensaje</p>
        <Snackbar message="Cambios guardados" />
      </div>
      <div>
        <p style={{ ...label, marginBottom: 6 }}>con acción</p>
        <Snackbar variant="success" message="Archivo eliminado" action={{ label: 'Deshacer', onClick: noop }} />
      </div>
      <div>
        <p style={{ ...label, marginBottom: 6 }}>con cierre</p>
        <Snackbar variant="info" message="Nueva versión disponible" onClose={noop} />
      </div>
      <div>
        <p style={{ ...label, marginBottom: 6 }}>acción + cierre</p>
        <Snackbar
          variant="error"
          message="No se pudo sincronizar"
          action={{ label: 'Reintentar', onClick: noop }}
          onClose={noop}
        />
      </div>
    </div>
  ),
};

// ── Mensaje largo (envuelve; acciones bajan a su fila) ─────────────────────

export const MensajeLargo: Story = {
  name: 'Mensaje de dos líneas',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Snackbar variant="warning" message="Tu sesión expira en 2 minutos. Guarda los cambios." action={{ label: 'Extender', onClick: noop }} />
      <Snackbar
        variant="info"
        message="Se aplicaron los cambios. Algunos ajustes tardan unos minutos en propagarse."
        onClose={noop}
      />
    </div>
  ),
};

// ── En contexto: auto-dismiss + posición ──────────────────────────────────

export const EnContexto: Story = {
  name: 'En contexto (auto-dismiss)',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
      const show = useCallback(() => {
        setOpen(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setOpen(false), 3500);
      }, []);
      return (
        <div style={{ minHeight: 260, padding: 24, position: 'relative' }}>
          <button
            type="button"
            onClick={show}
            style={{
              font: 'inherit',
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid var(--semantic-color-border-default)',
              background: 'var(--semantic-color-bg-surface)',
              cursor: 'pointer',
            }}
          >
            Descargar detalle
          </button>
          <p style={{ ...label, marginTop: 12 }}>Auto-cierre a los 3.5 s (neutral/success). Un snackbar a la vez.</p>

          {open && (
            <div
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                bottom: 16,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Snackbar
                message="Detalle de inversión descargado"
                action={{ label: 'Abrir', onClick: () => setOpen(false) }}
                onClose={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Building blocks (documentación — no exportados) ────────────────────────

export const BuildingBlocks: Story = {
  name: 'Building blocks',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      <div>
        <p style={{ ...label, marginBottom: 6 }}>SnackbarActions — type=action / close / all</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 8,
            border: '1px dashed var(--semantic-color-border-default)',
            borderRadius: 8,
          }}
        >
          <SnackbarActions action={{ label: 'Ver', onClick: noop }} />
          <SnackbarActions onClose={noop} />
          <SnackbarActions action={{ label: 'Ver', onClick: noop }} onClose={noop} />
        </div>
      </div>
      <div>
        <p style={{ ...label, marginBottom: 6 }}>SnackbarLayout — 1 línea / varias</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            border: '1px dashed var(--semantic-color-border-default)',
            borderRadius: 8,
          }}
        >
          <SnackbarLayout
            message="Una sola línea"
            actions={<SnackbarActions action={{ label: 'Ver', onClick: noop }} />}
          />
          <SnackbarLayout
            message="Mensaje que ocupa varias líneas y empuja las acciones a su propia fila abajo a la derecha."
            actions={<SnackbarActions action={{ label: 'Ver', onClick: noop }} onClose={noop} />}
          />
        </div>
      </div>
      <p style={label}>
        Los building blocks (`SnackbarLayout`, `SnackbarActions`) son internos: `index.ts` solo exporta
        `Snackbar`. Se documentan aquí importándolos por ruta.
      </p>
    </div>
  ),
};
