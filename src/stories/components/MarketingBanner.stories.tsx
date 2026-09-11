import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight } from '@carbon/icons-react';
import { MarketingBanner } from '../../components/Banner';
import type { MarketingBannerAccent } from '../../components/Banner';

const ACCENTS: MarketingBannerAccent[] = ['mint', 'orchid'];

// ilustración de ejemplo (data-uri SVG) para el slot `trailing`
const demoSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">' +
  '<rect width="80" height="80" fill="none"/>' +
  '<circle cx="40" cy="34" r="22" fill="#1f6f21" opacity="0.15"/>' +
  '<circle cx="40" cy="34" r="14" fill="#1f6f21"/>' +
  '</svg>';
const demoIllustration = <img src={`data:image/svg+xml;utf8,${encodeURIComponent(demoSvg)}`} alt="" style={{ display: 'block' }} />;

const meta: Meta<typeof MarketingBanner> = {
  title: 'Components/MarketingBanner',
  component: MarketingBanner,
  parameters: { layout: 'padded' },
  argTypes: {
    accent: { control: 'inline-radio', options: ACCENTS },
    trailing: { control: false },
    affordance: { control: false },
  },
  args: {
    accent: 'mint',
    headline: 'Invierte y gana más',
    supporting: 'Reinvierte tu capital e intereses al vencimiento.',
    affordance: { label: 'Conocer más' },
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
type Story = StoryObj<typeof MarketingBanner>;

const label: React.CSSProperties = {
  margin: '0 0 8px',
  font: '600 12px/1.4 var(--typography-font-family)',
  color: 'var(--semantic-color-text-secondary)',
};

export const Playground: Story = {
  args: { trailing: demoIllustration },
};

// ── Los 2 acentos ─────────────────────────────────────────────────────────

export const Acentos: Story = {
  name: 'Los 2 acentos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 328 }}>
      <MarketingBanner
        accent="mint"
        headline="Invierte y gana más"
        supporting="Reinvierte tu capital e intereses al vencimiento."
        affordance={{ label: 'Conocer más', icon: <ArrowRight /> }}
        trailing={demoIllustration}
      />
      <MarketingBanner
        accent="orchid"
        headline="Descubre plazo fijo"
        supporting="Genera rendimiento con un plazo a tu medida."
        affordance={{ label: 'Ver opciones', icon: <ArrowRight /> }}
        trailing={demoIllustration}
      />
    </div>
  ),
};

// ── Contenido variable ────────────────────────────────────────────────────

export const ContenidoVariable: Story = {
  name: 'Contenido variable',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 328 }}>
      <div>
        <p style={label}>con eyebrow</p>
        <MarketingBanner
          accent="mint"
          eyebrow="Promoción de septiembre"
          headline="Invierte y gana más"
          supporting="Reinvierte tu capital e intereses al vencimiento."
          affordance={{ label: 'Conocer más' }}
        />
      </div>
      <div>
        <p style={label}>sin ilustración (trailing opcional)</p>
        <MarketingBanner
          accent="orchid"
          headline="Descubre plazo fijo"
          supporting="Genera rendimiento con un plazo a tu medida."
          affordance={{ label: 'Ver opciones' }}
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
      <MarketingBanner
        accent="mint"
        headline="Reinvierte y sigue ganando"
        supporting="Tu capital + intereses, listos para un nuevo plazo."
        affordance={{ label: 'Reinvertir', icon: <ArrowRight /> }}
        trailing={demoIllustration}
      />
    </div>
  ),
};
