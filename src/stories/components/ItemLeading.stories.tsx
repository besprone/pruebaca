import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Wallet } from '@carbon/icons-react';
import { ItemLeading } from '../../components/ItemBlocks';
import type { ItemLeadingType, ItemLeadingSize } from '../../components/ItemBlocks';

const TYPES: ItemLeadingType[] = ['icon', 'img', 'avatar', 'number', 'checkbox', 'radiobutton', 'paymentStatus'];
const SIZES: ItemLeadingSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof ItemLeading> = {
  title: 'Components/Item blocks/Leading',
  component: ItemLeading,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    size: { control: 'inline-radio', options: SIZES },
    icon: { control: false },
    img: { control: false },
    avatar: { control: false },
    avatarProps: { control: false },
    paymentStatus: { control: false },
    control: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ItemLeading>;

// foto de demo (data-uri SVG) para `type="img"` y el <Avatar>
const demoSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56">' +
  '<rect width="56" height="56" fill="#1f6f21"/>' +
  '<circle cx="28" cy="22" r="9" fill="#fff"/>' +
  '<path d="M10 50c0-9.4 8-16 18-16s18 6.6 18 16" fill="#fff"/></svg>';
const demoSrc = `data:image/svg+xml;utf8,${encodeURIComponent(demoSvg)}`;
const demoImg = <img src={demoSrc} alt="" />;

// timeline de demo para paymentStatus
const demoTimeline = (
  <svg width="24" height="56" viewBox="0 0 24 56" aria-hidden="true">
    <line x1="12" y1="0" x2="12" y2="18" stroke="var(--semantic-color-bg-disabled)" strokeWidth="1" />
    <circle cx="12" cy="28" r="7" fill="none" stroke="var(--semantic-color-icon-brand)" strokeWidth="2" />
    <line x1="12" y1="38" x2="12" y2="56" stroke="var(--semantic-color-bg-disabled)" strokeWidth="1" />
  </svg>
);

const frame: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 56,
  padding: '0 16px',
  border: '1px dashed var(--semantic-color-border-default)',
  borderRadius: 8,
};

export const Playground: Story = {
  args: { type: 'icon', size: 'sm' },
  render: (args) => (
    <div style={frame}>
      <ItemLeading
        {...args}
        icon={<Wallet />}
        img={demoImg}
        avatarProps={{ type: 'img', src: demoSrc, alt: 'Foto de perfil' }}
        paymentStatus={demoTimeline}
        number={args.number ?? '3'}
      />
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--semantic-color-text-secondary)' }}>
        {args.type} · {args.size}
      </span>
    </div>
  ),
};

export const Tipos: Story = {
  name: 'Todos los tipos',
  parameters: { controls: { disable: true } },
  render: () => {
    const [chk, setChk] = useState(false);
    const [rad, setRad] = useState(true);
    const items: [string, React.ReactNode][] = [
      ['icon sm', <ItemLeading type="icon" size="sm" icon={<Wallet />} />],
      ['icon md', <ItemLeading type="icon" size="md" icon={<Wallet />} />],
      ['img md', <ItemLeading type="img" size="md" img={demoImg} />],
      ['img md + badge', <ItemLeading type="img" size="md" img={demoImg} badge />],
      ['avatar lg (img)', <ItemLeading type="avatar" size="lg" avatarProps={{ type: 'img', src: demoSrc, alt: 'Perfil' }} />],
      ['avatar lg (initials)', <ItemLeading type="avatar" size="lg" avatarProps={{ type: 'initials', label: 'MA' }} />],
      ['avatar lg (initials · secondary)', <ItemLeading type="avatar" size="lg" avatarProps={{ type: 'initials', label: 'JS', accent: 'secondary' }} />],
      ['number', <ItemLeading type="number" number="3" />],
      ['checkbox', <ItemLeading type="checkbox" control={{ checked: chk, onChange: (e) => setChk(e.target.checked), 'aria-label': 'Seleccionar' }} />],
      ['radiobutton', <ItemLeading type="radiobutton" control={{ checked: rad, onChange: () => setRad(true), name: 'l', 'aria-label': 'Elegir' }} />],
      ['paymentStatus (slot)', <ItemLeading type="paymentStatus" paymentStatus={demoTimeline} />],
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 340 }}>
        {items.map(([label, el]) => (
          <div key={label} style={frame}>
            {el}
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--semantic-color-text-secondary)' }}>{label}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const Tamanos: Story = {
  name: 'Tamaños (img / avatar)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ ...frame, gap: 16 }}>
        {SIZES.map((s) => (
          <ItemLeading key={s} type="img" size={s} img={demoImg} />
        ))}
        <span style={legend}>img · xs→xl</span>
      </div>
      <div style={{ ...frame, gap: 16 }}>
        {SIZES.map((s) => (
          <ItemLeading key={s} type="avatar" size={s} avatarProps={{ type: 'initials', label: 'MA' }} />
        ))}
        <span style={legend}>avatar · xs→xl</span>
      </div>
    </div>
  ),
};

const legend: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
