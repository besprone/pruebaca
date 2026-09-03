import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../components/Avatar';
import type { AvatarSize } from '../../components/Avatar';

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const demoSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56">' +
  '<rect width="56" height="56" fill="#1f6f21"/>' +
  '<circle cx="28" cy="22" r="9" fill="#fff"/>' +
  '<path d="M10 50c0-9.4 8-16 18-16s18 6.6 18 16" fill="#fff"/></svg>';
const demoSrc = `data:image/svg+xml;utf8,${encodeURIComponent(demoSvg)}`;

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: ['img', 'initials'] },
    size: { control: 'inline-radio', options: SIZES },
    accent: { control: 'inline-radio', options: ['primary', 'secondary'] },
    src: { control: false },
    label: { control: 'text' },
    alt: { control: false },
  },
  args: { type: 'initials', size: 'md', accent: 'primary', label: 'MA' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 16 };
const legend: React.CSSProperties = {
  minWidth: 140,
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};

export const Playground: Story = {
  render: (args) => <Avatar {...args} src={args.type === 'img' ? demoSrc : undefined} />,
};

export const Tamanos: Story = {
  name: 'Tamaños',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={row}>
        <span style={legend}>img</span>
        {SIZES.map((s) => (
          <Avatar key={s} type="img" size={s} src={demoSrc} alt="" />
        ))}
      </div>
      <div style={row}>
        <span style={legend}>initials · primary</span>
        {SIZES.map((s) => (
          <Avatar key={s} type="initials" size={s} label="MA" />
        ))}
      </div>
      <div style={row}>
        <span style={legend}>initials · secondary</span>
        {SIZES.map((s) => (
          <Avatar key={s} type="initials" size={s} accent="secondary" label="JS" />
        ))}
      </div>
    </div>
  ),
};

export const Fallback: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={row}>
        <span style={legend}>img sin src + label</span>
        <Avatar type="img" size="lg" label="MA" />
      </div>
      <div style={row}>
        <span style={legend}>img src roto + label</span>
        <Avatar type="img" size="lg" src="https://invalid.example/x.png" label="MA" />
      </div>
      <div style={row}>
        <span style={legend}>img sin src ni label</span>
        <Avatar type="img" size="lg" />
      </div>
    </div>
  ),
};
