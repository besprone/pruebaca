import type { Meta, StoryObj } from '@storybook/react';
import { ItemContent } from '../../components/ItemBlocks';
import type { ItemContentSize } from '../../components/ItemBlocks';
import { Button } from '../../components/Button/Button';

const SIZES: ItemContentSize[] = ['sm', 'md', 'lg'];

const meta: Meta<typeof ItemContent> = {
  title: 'Components/Item blocks/Content',
  component: ItemContent,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    layout: { control: 'inline-radio', options: ['stacked', 'horizontal'] },
    label: { control: 'text' },
    supporting: { control: 'text' },
    supporting2: { control: 'text' },
    overline: { control: 'text' },
    action: { control: false },
  },
  args: {
    size: 'lg',
    layout: 'stacked',
    label: 'kubo.plazofijo',
    supporting: 'Rendimiento 11.2% anual',
  },
};

export default meta;
type Story = StoryObj<typeof ItemContent>;

const frame: React.CSSProperties = {
  width: 340,
  padding: 16,
  border: '1px dashed var(--semantic-color-border-default)',
  borderRadius: 8,
};

export const Playground: Story = {
  render: (args) => (
    <div style={frame}>
      <ItemContent {...args} />
    </div>
  ),
};

export const Tamanos: Story = {
  name: 'Tamaños (stacked)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {SIZES.map((s) => (
        <div key={s} style={frame}>
          <p style={legend}>size=&quot;{s}&quot;</p>
          <ItemContent size={s} label="Cuenta de ahorro" supporting="Disponible $12,480.00" />
        </div>
      ))}
    </div>
  ),
};

export const Composiciones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={frame}>
        <p style={legend}>label + supporting</p>
        <ItemContent label="Transferencia enviada" supporting="Hoy, 14:32" />
      </div>
      <div style={frame}>
        <p style={legend}>+ overline</p>
        <ItemContent overline="NUEVO" label="Meta de ahorro" supporting="Vacaciones" />
      </div>
      <div style={frame}>
        <p style={legend}>+ supporting2</p>
        <ItemContent label="kubo.plazofijo" supporting="Rendimiento 11.2%" supporting2="$10,000" />
      </div>
      <div style={frame}>
        <p style={legend}>+ action (slot)</p>
        <ItemContent
          label="Contratos activos"
          supporting="3 en curso"
          action={<Button emphasis="ghost" size="xs">Ver contratos</Button>}
        />
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  name: 'Horizontal (lg)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 560 }}>
      <div style={{ ...frame, width: '100%' }}>
        <ItemContent layout="horizontal" label="kubo.plazofijo" supporting="Rendimiento 11.2%" />
      </div>
      <div style={{ ...frame, width: '100%' }}>
        <ItemContent
          layout="horizontal"
          label="kubo.plazofijo"
          supporting="Rendimiento 11.2%"
          supporting2="$10,000"
        />
      </div>
    </div>
  ),
};

const legend: React.CSSProperties = {
  margin: '0 0 8px',
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
