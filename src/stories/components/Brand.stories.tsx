import type { Meta, StoryObj } from '@storybook/react';
import { Brand } from '../../components/Brand/Brand';
import type { BrandType, BrandVariant, BrandName, BrandSize } from '../../components/Brand/Brand';

const TYPES: BrandType[] = ['primary', 'secondary', 'imagotype'];
const VARIANTS: BrandVariant[] = ['original', 'one', 'two', 'white', 'gray'];
const SIZES: BrandSize[] = ['sm', 'md', 'lg'];
const BRANDS: BrandName[] = ['kubo', 'maestro'];

const meta: Meta<typeof Brand> = {
  title: 'Components/Brand',
  component: Brand,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    variant: { control: 'inline-radio', options: VARIANTS },
    brand: { control: 'inline-radio', options: BRANDS },
    size: { control: 'inline-radio', options: SIZES },
    decorative: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: { type: 'primary', variant: 'original', brand: 'kubo', size: 'md', decorative: false },
};

export default meta;
type Story = StoryObj<typeof Brand>;

const legend: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
const cell: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 56,
  padding: 12,
  borderRadius: 8,
};

export const Playground: Story = {};

export const Tipos: Story = {
  name: 'Tipos × tamaños (kubo)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(3, 1fr)', gap: 16, alignItems: 'center' }}>
      <span />
      {SIZES.map((s) => (
        <span key={s} style={{ ...legend, textAlign: 'center' }}>
          {s}
        </span>
      ))}
      {TYPES.map((t) => (
        <div key={t} style={{ display: 'contents' }}>
          <span style={legend}>{t}</span>
          {SIZES.map((s) => (
            <div key={s} style={cell}>
              <Brand type={t} size={s} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Variantes: Story = {
  name: 'Variantes (kubo)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {TYPES.map((t) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={legend}>{t}</span>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {VARIANTS.map((v) => (
              <div
                key={v}
                style={{
                  ...cell,
                  flexDirection: 'column',
                  gap: 8,
                  // white necesita fondo oscuro para verse
                  background: v === 'white' ? '#1c1b20' : 'var(--semantic-color-bg-subtle)',
                }}
              >
                <Brand type={t} variant={v} size="lg" />
                <span style={{ ...legend, color: v === 'white' ? '#fff' : undefined }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Maestro: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {(['primary', 'imagotype'] as const).map((t) => (
        <div key={t} style={{ ...cell, flexDirection: 'column', gap: 8, background: 'var(--semantic-color-bg-subtle)' }}>
          <Brand brand="maestro" type={t} size="lg" />
          <span style={legend}>maestro · {t}</span>
        </div>
      ))}
    </div>
  ),
};
