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
