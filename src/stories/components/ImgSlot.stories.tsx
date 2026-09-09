import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImgSlot } from '../../components/ImgSlot';
import type { ImgSlotState, ImgSlotSize, ImgSlotType } from '../../components/ImgSlot';

const meta: Meta<typeof ImgSlot> = {
  title: 'Components/ImgSlot',
  component: ImgSlot,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'radio',
      options: ['slot', 'feedbackState'] satisfies ImgSlotType[],
    },
    state: {
      control: 'radio',
      options: [
        'default',
        'success',
        'info',
        'error',
        'warning',
        'empty',
      ] satisfies ImgSlotState[],
    },
    size: {
      control: 'radio',
      options: ['xxs', 'xs', 'sm', 'md', 'lg'] satisfies ImgSlotSize[],
    },
    icon: { control: false },
    children: { control: false },
  },
  args: {
    type: 'feedbackState',
    state: 'success',
    size: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof ImgSlot>;

const caption: CSSProperties = {
  margin: '0 0 8px',
  font: '600 12px/1.4 var(--typography-font-family)',
  color: 'var(--semantic-color-text-secondary)',
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <ImgSlot {...args} />
    </div>
  ),
};

// ── feedbackState · por estado (lg) ───────────────────────────────────────

const states: Exclude<ImgSlotState, 'default'>[] = [
  'success',
  'info',
  'error',
  'warning',
  'empty',
];

export const PorEstado: Story = {
  name: 'feedbackState — por estado (lg)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      {states.map((s) => (
        <div key={s}>
          <p style={caption}>{s}</p>
          <ImgSlot type="feedbackState" state={s} size="lg" />
        </div>
      ))}
    </div>
  ),
};

// ── feedbackState · por tamaño ───────────────────────────────────────────

export const PorTamaño: Story = {
  name: 'feedbackState — por tamaño',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
      {(['xxs', 'xs', 'sm', 'md'] as const).map((sz) => (
        <div key={sz} style={{ textAlign: 'center' }}>
          <ImgSlot type="feedbackState" state="success" size={sz} />
          <p style={caption}>{sz}</p>
        </div>
      ))}
      <div style={{ flexBasis: '100%' }}>
        <ImgSlot type="feedbackState" state="success" size="lg" />
        <p style={caption}>lg</p>
      </div>
    </div>
  ),
};

// ── type="slot" ─────────────────────────────────────────────────────────

export const Slot: Story = {
  name: 'slot — placeholder y con imagen',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <p style={caption}>placeholder (sin children)</p>
        <div style={{ width: 328 }}>
          <ImgSlot type="slot" size="lg" />
        </div>
      </div>
      <div>
        <p style={caption}>con imagen (children)</p>
        <div style={{ width: 328 }}>
          <ImgSlot type="slot" size="lg">
            <div
              role="img"
              aria-label="Ilustración de ejemplo"
              style={{
                background:
                  'linear-gradient(135deg, var(--semantic-color-bg-brandSoft), var(--semantic-color-bg-infoSoft))',
              }}
            />
          </ImgSlot>
        </div>
      </div>
    </div>
  ),
};
