import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckmarkFilled } from '@carbon/icons-react';
import { ButtonActions } from '../../components/ButtonActions';
import type { ButtonActionsSurface } from '../../components/ButtonActions';
import { Button } from '../../components/Button/Button';

const meta: Meta<typeof ButtonActions> = {
  title: 'Components/ButtonActions',
  component: ButtonActions,
  parameters: { layout: 'padded' },
  argTypes: {
    surface: {
      control: 'radio',
      options: [
        'screen',
        'dialog',
        'card',
        'bottomSheet',
        'feedbackState',
      ] satisfies ButtonActionsSurface[],
    },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonActions>;

const label: CSSProperties = {
  margin: '0 0 8px',
  font: '600 12px/1.4 var(--typography-font-family)',
  color: 'var(--semantic-color-text-secondary)',
};

/** Marco de 360px que acota el ancho (las pantallas reales lo hacen con el layout). */
const Frame = ({ children }: { children: ReactNode }) => (
  <div style={{ maxWidth: 360, border: '1px dashed var(--semantic-color-border-subtle)', padding: 16 }}>
    {children}
  </div>
);

export const Playground: Story = {
  args: {
    surface: 'screen',
    children: (
      <>
        <Button emphasis="primary" size="sm" icon={<CheckmarkFilled />}>
          Confirmar
        </Button>
        <Button emphasis="ghost" size="sm">
          Cancelar
        </Button>
      </>
    ),
  },
  render: (args) => (
    <Frame>
      <ButtonActions {...args} />
    </Frame>
  ),
};

// ── Todas las surfaces ─────────────────────────────────────────────────────

export const PorSurface: Story = {
  name: 'Por surface',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
      <div>
        <p style={label}>screen — apiladas a lo ancho · gap 16</p>
        <Frame>
          <ButtonActions surface="screen">
            <Button emphasis="ghost" size="sm">
              Contactar a soporte
            </Button>
            <Button emphasis="secondary" size="sm">
              ¿Olvidaste tu contraseña?
            </Button>
            <Button emphasis="primary" size="sm">
              Iniciar sesión
            </Button>
          </ButtonActions>
        </Frame>
      </div>

      <div>
        <p style={label}>dialog — fila a la derecha · gap 8</p>
        <Frame>
          <ButtonActions surface="dialog">
            <Button emphasis="ghost" size="sm">
              Cancelar
            </Button>
            <Button emphasis="primary" size="sm">
              Guardar
            </Button>
          </ButtonActions>
        </Frame>
      </div>

      <div>
        <p style={label}>card — fila a la izquierda · gap 8</p>
        <Frame>
          <ButtonActions surface="card">
            <Button emphasis="primary" size="xs">
              Ver más
            </Button>
            <Button emphasis="secondary" size="xs">
              Compartir
            </Button>
          </ButtonActions>
        </Frame>
      </div>

      <div>
        <p style={label}>bottomSheet — fila 50/50 · gap 8</p>
        <Frame>
          <ButtonActions surface="bottomSheet">
            <Button emphasis="secondary" size="sm">
              Cancelar
            </Button>
            <Button emphasis="primary" size="sm">
              Aceptar
            </Button>
          </ButtonActions>
        </Frame>
      </div>

      <div>
        <p style={label}>feedbackState — fila centrada con wrap · gap 8</p>
        <Frame>
          <ButtonActions surface="feedbackState">
            <Button emphasis="ghost" size="xs">
              Restablecer búsqueda
            </Button>
            <Button emphasis="ghost" size="xs">
              Ajustar filtros
            </Button>
          </ButtonActions>
        </Frame>
      </div>
    </div>
  ),
};

// ── sticky (stickyCTAContainer) ───────────────────────────────────────────

const Phone = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      inlineSize: 360,
      blockSize: 520,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--semantic-color-border-subtle)',
      borderRadius: 16,
      background: 'var(--semantic-color-bg-surface)',
    }}
  >
    {children}
  </div>
);

const Filler = ({ n }: { n: number }) => (
  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
    {Array.from({ length: n }, (_, i) => (
      <p
        key={i}
        style={{
          margin: 0,
          padding: 12,
          borderRadius: 10,
          background: 'var(--semantic-color-bg-canvas)',
          font: '500 14px/20px var(--typography-font-family)',
        }}
      >
        Contenido {i + 1}
      </p>
    ))}
  </div>
);

export const Sticky: Story = {
  name: 'sticky — stickyCTAContainer (divider auto)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <p style={label}>divider="auto" — scrollea para ver el borde</p>
        <Phone>
          <Filler n={12} />
          <ButtonActions surface="screen" sticky>
            <Button emphasis="ghost" size="sm">
              Cancelar
            </Button>
            <Button emphasis="primary" size="sm" icon={<CheckmarkFilled />}>
              Confirmar
            </Button>
          </ButtonActions>
        </Phone>
      </div>

      <div>
        <p style={label}>divider="always"</p>
        <Phone>
          <Filler n={3} />
          <ButtonActions surface="screen" sticky divider="always">
            <Button emphasis="primary" size="sm">
              Continuar
            </Button>
          </ButtonActions>
        </Phone>
      </div>
    </div>
  ),
};

// ── sticky con barra alta (microcopy) — el sentinel puede caer tapado ──────
// Repro del hallazgo del DS: con una barra más alta (microcopy + botón) el
// contenido puede terminar DENTRO de esa altura desde el fondo del scroll —
// tapado por la barra sticky — y aun así contar como "visible" si el
// IntersectionObserver no descuenta el alto real de la barra del root.

export const StickyMicrocopy: Story = {
  name: 'sticky — barra alta con microcopy (divider auto)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <p style={label}>
        Barra con microcopy (~más alta) — el borde debe aparecer mientras haya contenido sin
        scrollear y desaparecer al llegar al final, sin importar cuánto mida la barra.
      </p>
      <Phone>
        <Filler n={8} />
        <ButtonActions surface="screen" sticky>
          <p
            style={{
              margin: '0 0 4px',
              textAlign: 'center',
              font: '500 12px/16px var(--typography-font-family)',
              color: 'var(--semantic-color-text-tertiary)',
            }}
          >
            Al continuar aceptas los términos del contrato.
          </p>
          <Button emphasis="primary" size="sm">
            Confirmar
          </Button>
        </ButtonActions>
      </Phone>
    </div>
  ),
};
