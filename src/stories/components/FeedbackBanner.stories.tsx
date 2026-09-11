import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackBanner } from '../../components/FeedbackBanner/FeedbackBanner';
import type { FeedbackBannerType } from '../../components/FeedbackBanner/FeedbackBanner';
import { Button } from '../../components/Button/Button';

const TYPES: FeedbackBannerType[] = ['info', 'success', 'error', 'warning'];

const meta: Meta<typeof FeedbackBanner> = {
  title: 'Components/FeedbackBanner',
  component: FeedbackBanner,
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    actions: { control: false },
  },
  args: {
    type: 'info',
    headline: 'Empieza a invertir',
    supporting: 'Descubre las opciones disponibles para tu perfil.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 328 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeedbackBanner>;

const label: React.CSSProperties = {
  margin: '0 0 8px',
  font: '600 12px/1.4 var(--typography-font-family)',
  color: 'var(--semantic-color-text-secondary)',
};

const actions = (
  <>
    <Button emphasis="ghost" size="xs">
      Label
    </Button>
    <Button emphasis="ghost" size="xs">
      Label
    </Button>
  </>
);

export const Playground: Story = {
  args: { actions },
};

// ── Los 4 tipos ─────────────────────────────────────────────────────────

export const Tipos: Story = {
  name: 'Los 4 tipos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 328 }}>
      <FeedbackBanner type="info" headline="Empieza a invertir" supporting="Supporting" actions={actions} />
      <FeedbackBanner type="success" headline="Label" supporting="Supporting" actions={actions} />
      <FeedbackBanner type="error" headline="Label" supporting="Supporting" actions={actions} />
      <FeedbackBanner type="warning" headline="Label" supporting="Supporting" actions={actions} />
    </div>
  ),
};

// ── Sin acciones / sin supporting ────────────────────────────────────────

export const ContenidoVariable: Story = {
  name: 'Contenido variable',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 328 }}>
      <div>
        <p style={label}>solo headline</p>
        <FeedbackBanner type="info" headline="Empieza a invertir" />
      </div>
      <div>
        <p style={label}>headline + supporting, sin actions</p>
        <FeedbackBanner
          type="info"
          headline="Confirmación enviada"
          supporting="Recibirás en tu correo la carátula y contrato de tu inversión."
        />
      </div>
      <div>
        <p style={label}>1 sola acción</p>
        <FeedbackBanner
          type="warning"
          headline="Revisa tu información"
          supporting="Algunos datos podrían estar incompletos."
          actions={<Button emphasis="ghost" size="xs">Revisar</Button>}
        />
      </div>
    </div>
  ),
};

// ── En producto ───────────────────────────────────────────────────────────

export const EnProducto: Story = {
  name: 'En producto',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 328 }}>
      <FeedbackBanner
        type="info"
        headline="Confirmación enviada"
        supporting="Recibirás en tu correo la carátula y contrato de tu inversión."
      />
    </div>
  ),
};
