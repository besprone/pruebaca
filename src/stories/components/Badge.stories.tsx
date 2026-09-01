import type { Meta, StoryObj } from '@storybook/react';
import { Star, Time, CheckmarkFilled } from '@carbon/icons-react';
import { Badge } from '../../components/Badge/Badge';
import type { BadgeSemantic, BadgeVariant, BadgeSize } from '../../components/Badge/Badge';

const SEMANTICS: BadgeSemantic[] = [
  'success',
  'neutral',
  'info',
  'warning',
  'error',
  'accentPrimary',
  'accentSecondary',
];
const VARIANTS: BadgeVariant[] = ['soft', 'outline', 'filled'];
const SIZES: BadgeSize[] = ['xxs', 'xs', 'md'];

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    semantic: { control: 'select', options: SEMANTICS },
    variant: { control: 'inline-radio', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    type: { control: 'inline-radio', options: ['text', 'circle'] },
    showLeading: { control: 'boolean' },
    label: { control: 'text' },
    leading: { control: false },
  },
  args: {
    semantic: 'success',
    variant: 'soft',
    size: 'xs',
    type: 'text',
    label: 'Recomendado',
    showLeading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const cell: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--semantic-color-text-secondary)',
};

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => <Badge {...args} leading={args.showLeading ? <Star size={16} /> : undefined} />,
};

// ── Semantics ──────────────────────────────────────────────────────────────

export const Semantics: Story = {
  name: 'Semantics (soft)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 360 }}>
      {SEMANTICS.map((s) => (
        <Badge key={s} semantic={s} label={s} />
      ))}
    </div>
  ),
};

// ── Variants ───────────────────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ ...cell, width: 56 }}>{v}</span>
          {SEMANTICS.map((s) => (
            <Badge key={s} semantic={s} variant={v} label={s} />
          ))}
        </div>
      ))}
      <p style={{ ...cell }}>
        Figma trae <code>filled</code> solo para success/info/error/accentPrimary/accentSecondary; el DS
        lo extiende a warning y neutral.
      </p>
    </div>
  ),
};

// ── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {SIZES.map((sz) => (
        <div key={sz} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ ...cell, width: 32 }}>{sz}</span>
          <Badge size={sz} semantic="info" label="Label" />
          <Badge size={sz} semantic="info" label="Con ícono" leading={<Star size={sz === 'md' ? 16 : 12} />} />
        </div>
      ))}
    </div>
  ),
};

// ── Matriz completa ────────────────────────────────────────────────────────

export const Matriz: Story = {
  name: 'Matriz semantic × variant',
  parameters: { controls: { disable: true } },
  render: () => (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th />
          {VARIANTS.map((v) => (
            <th key={v} style={{ ...cell, padding: '6px 12px', textAlign: 'left' }}>
              {v}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SEMANTICS.map((s) => (
          <tr key={s}>
            <td style={{ ...cell, padding: '6px 12px' }}>{s}</td>
            {VARIANTS.map((v) => (
              <td key={v} style={{ padding: '6px 12px' }}>
                <Badge semantic={s} variant={v} label="Label" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

// ── Circle shape ───────────────────────────────────────────────────────────

export const Circle: Story = {
  name: 'type = circle',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ ...cell, width: 56 }}>{v}</span>
          {SEMANTICS.map((s) => (
            <Badge key={s} type="circle" semantic={s} variant={v} aria-label={`${s} ${v}`} />
          ))}
        </div>
      ))}
      <p style={cell}>Indicador sin texto — notificaciones, estado en línea, presencia. Requiere `aria-label`.</p>
    </div>
  ),
};

// ── En producto ────────────────────────────────────────────────────────────

export const EnProducto: Story = {
  name: 'En producto',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 420, alignItems: 'center' }}>
      <Badge semantic="accentPrimary" variant="filled" label="Promoción" leading={<Star size={12} />} />
      <Badge semantic="accentSecondary" label="Recomendado" />
      <Badge semantic="info" label="Nuevo" />
      <Badge semantic="success" variant="soft" label="Activo" leading={<CheckmarkFilled size={12} />} />
      <Badge semantic="warning" label="En revisión" leading={<Time size={12} />} />
      <Badge semantic="error" label="Vencido" />
      <Badge semantic="neutral" label="Borrador" />
      <span style={{ ...cell }}>Estado en línea:</span>
      <Badge type="circle" semantic="success" variant="filled" aria-label="En línea" />
    </div>
  ),
};
