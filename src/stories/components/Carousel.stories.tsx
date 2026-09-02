import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../../components/Carousel/Carousel';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  argTypes: {
    itemsPerView: { control: 'inline-radio', options: [1, 2, 3] },
    pagination: { control: 'boolean' },
    controls: { control: 'boolean' },
    loop: { control: 'boolean' },
    onPageChange: { action: 'pageChange' },
    children: { control: false },
  },
  args: {
    itemsPerView: 1,
    pagination: true,
    controls: false,
    loop: false,
    'aria-label': 'Ofertas',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340, padding: '8px 24px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

function Slide({ n, tone = 'var(--semantic-color-bg-brandSoft)' }: { n: number; tone?: string }) {
  return (
    <div
      style={{
        height: 140,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--typography-font-family)',
        fontWeight: 700,
        fontSize: 20,
        color: 'var(--semantic-color-text-primary)',
        background: tone,
      }}
    >
      {n}
    </div>
  );
}

const tones = [
  'var(--semantic-color-bg-brandSoft)',
  'var(--semantic-color-bg-infoMuted)',
  'var(--semantic-color-bg-warningMuted)',
  'var(--semantic-color-bg-successMuted)',
  'var(--semantic-color-bg-accentSecondaryMuted)',
];

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <Carousel {...args}>
      {Array.from({ length: 5 }, (_, i) => (
        <Slide key={i} n={i + 1} tone={tones[i % tones.length]} />
      ))}
    </Carousel>
  ),
};

// ── Default (1 por vista + dots) ──────────────────────────────────────────

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Carousel aria-label="Plazos">
      {Array.from({ length: 4 }, (_, i) => (
        <Slide key={i} n={i + 1} tone={tones[i % tones.length]} />
      ))}
    </Carousel>
  ),
};

// ── Dos columnas + flechas ───────────────────────────────────────────────

export const DosColumnas: Story = {
  name: 'Dos columnas + flechas',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div style={{ maxWidth: 460, margin: '24px auto', padding: '8px 40px' }}>
      <Carousel aria-label="Ofertas" itemsPerView={2} controls>
        {Array.from({ length: 6 }, (_, i) => (
          <Slide key={i} n={i + 1} tone={tones[i % tones.length]} />
        ))}
      </Carousel>
    </div>
  ),
};

// ── Loop (flechas/teclado ciclan) ───────────────────────────────────────

export const Loop: Story = {
  name: 'Loop (infinito sin costura)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Carousel aria-label="Destacados" controls loop>
      {Array.from({ length: 4 }, (_, i) => (
        <Slide key={i} n={i + 1} tone={tones[i % tones.length]} />
      ))}
    </Carousel>
  ),
};

// ── Sin paginación ───────────────────────────────────────────────────────

export const SinPaginacion: Story = {
  name: 'Sin paginación',
  parameters: { controls: { disable: true } },
  render: () => (
    <Carousel aria-label="Galería" pagination={false}>
      {Array.from({ length: 3 }, (_, i) => (
        <Slide key={i} n={i + 1} tone={tones[i % tones.length]} />
      ))}
    </Carousel>
  ),
};

// ── En producto (carrusel de Cards) ─────────────────────────────────────

export const EnProducto: Story = {
  name: 'En producto',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ paddingTop: 4 }}>
      <Carousel aria-label="Ofertas destacadas">
        {[
        { t: 'Plazo fijo', d: '12 meses · 11.20%', badge: 'Recomendado' },
        { t: 'Inversión Auto', d: '6 meses · 10.50%', badge: 'Promoción' },
        { t: 'Ahorro flexible', d: 'Sin plazo · 8.00%', badge: 'Nuevo' },
      ].map((o, i) => (
        <Card key={i} elevation="raised" badge={<Badge semantic="accentPrimary" size="xs" label={o.badge} />}>
          <div style={{ padding: 16, fontFamily: 'var(--typography-font-family)' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 16 }}>{o.t}</p>
            <p style={{ margin: 0, color: 'var(--semantic-color-text-secondary)', fontSize: 13 }}>{o.d}</p>
          </div>
        </Card>
      ))}
      </Carousel>
    </div>
  ),
};
