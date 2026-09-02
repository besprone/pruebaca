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

// ── En contexto: auto-dismiss + posición + animación ──────────────────────

/**
 * Viewport de demo: `position: fixed` respecto al iframe de Storybook.
 * Móvil (`<600px`, breakpoint del grid): abajo, centrado en el ancho.
 * Tablet / desktop (`≥600px`): abajo-derecha. Margen 16px (`--mobile-margin`).
 * Cambia el viewport de Storybook para ver el salto de posición.
 */
const viewportCss = `
.sb-snackbar-viewport {
  position: fixed;
  z-index: 60;
  bottom: var(--mobile-margin, 16px);
  left: var(--mobile-margin, 16px);
  right: var(--mobile-margin, 16px);
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.sb-snackbar-viewport > * { pointer-events: auto; }
@media (min-width: 600px) {
  .sb-snackbar-viewport { left: auto; justify-content: flex-end; }
}
`;

function AutoDismissDemo() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback(() => {
    clearTimeout(timer.current);
    setMounted(true);
    setOpen(true);
    timer.current = setTimeout(() => setOpen(false), 3500);
  }, []);
  const dismiss = useCallback(() => {
    clearTimeout(timer.current);
    setOpen(false);
  }, []);

  return (
    <div style={{ minHeight: 320, padding: 24, position: 'relative' }}>
      <style>{viewportCss}</style>
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
      <p style={{ ...label, marginTop: 12, maxWidth: 420 }}>
        Aparece deslizando desde arriba, se auto-cierra a los 3.5 s deslizando hacia abajo y se
        desmonta. Móvil: abajo centrado · tablet/desktop: abajo-derecha (cambia el viewport de
        Storybook para verlo).
      </p>

      {mounted && (
        <div className="sb-snackbar-viewport">
          <Snackbar
            open={open}
            onExited={() => setMounted(false)}
            message="Detalle de inversión descargado"
            action={{ label: 'Abrir', onClick: dismiss }}
            onClose={dismiss}
          />
        </div>
      )}
    </div>
  );
}

export const EnContexto: Story = {
  name: 'En contexto (auto-dismiss)',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => <AutoDismissDemo />,
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
