import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UserAvatar, Settings, Logout } from '@carbon/icons-react';
import { AvatarAction } from '../../components/AvatarAction';
import { List } from '../../components/List';
import { ListItem } from '../../components/List/ListItem';

const demoSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56">' +
  '<rect width="56" height="56" fill="#1f6f21"/>' +
  '<circle cx="28" cy="22" r="9" fill="#fff"/>' +
  '<path d="M10 50c0-9.4 8-16 18-16s18 6.6 18 16" fill="#fff"/></svg>';
const demoSrc = `data:image/svg+xml;utf8,${encodeURIComponent(demoSvg)}`;

const meta: Meta<typeof AvatarAction> = {
  title: 'Components/AvatarAction',
  component: AvatarAction,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: ['menu', 'button'] },
    label: { control: 'text' },
    supporting: { control: 'text' },
    avatarProps: { control: false },
    avatar: { control: false },
    children: { control: false },
    open: { control: false },
  },
  args: {
    type: 'menu',
    label: 'Marco Antonio',
    supporting: 'marco@kubo.mx',
    avatarProps: { type: 'initials', label: 'MA' },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarAction>;

// menú de cuenta de demo (es un pattern — aquí una List de acciones)
function AccountMenu({ onClose }: { onClose: () => void }) {
  return (
    <List type="segmented" role="menu" aria-label="Cuenta">
      <ListItem role="menuitem" interactive leading={<UserAvatar />} label="Mi perfil" onClick={onClose} />
      <ListItem role="menuitem" interactive leading={<Settings />} label="Configuración" onClick={onClose} />
      <ListItem role="menuitem" interactive leading={<Logout />} label="Cerrar sesión" onClick={onClose} />
    </List>
  );
}

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ paddingBottom: 220 }}>
        <AvatarAction {...args} open={args.type === 'menu' ? open : undefined} onOpenChange={setOpen}>
          <AccountMenu onClose={() => setOpen(false)} />
        </AvatarAction>
      </div>
    );
  },
};

export const Estados: Story = {
  name: 'Estados (menu)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AvatarAction label="Marco Antonio" supporting="marco@kubo.mx" avatarProps={{ type: 'img', src: demoSrc, alt: 'Tu perfil' }} />
      <p style={legend}>default · hover / focus (interactúa) · click abre el panel</p>
    </div>
  ),
};

export const Abierto: Story = {
  name: 'Abierto',
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ paddingBottom: 240 }}>
        <AvatarAction
          label="Marco Antonio"
          supporting="marco@kubo.mx"
          avatarProps={{ type: 'initials', label: 'MA' }}
          open={open}
          onOpenChange={setOpen}
        >
          <AccountMenu onClose={() => setOpen(false)} />
        </AvatarAction>
      </div>
    );
  },
};

export const Button: Story = {
  name: 'type="button"',
  parameters: { controls: { disable: true } },
  render: () => {
    const [n, setN] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AvatarAction
          type="button"
          label="Marco Antonio"
          supporting="Ir al perfil"
          avatarProps={{ type: 'initials', label: 'MA' }}
          onClick={() => setN((v) => v + 1)}
        />
        <p style={legend}>sin chevron ni panel · clicks: {n}</p>
      </div>
    );
  },
};

export const EnHeader: Story = {
  name: 'En un header',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ minHeight: 320 }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderBottom: '1px solid var(--semantic-color-border-subtle)',
            background: 'var(--semantic-color-bg-surface)',
            overflow: 'visible',
          }}
        >
          <strong style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--semantic-color-text-primary)' }}>
            kubo
          </strong>
          <AvatarAction
            label="Marco Antonio"
            supporting="marco@kubo.mx"
            avatarProps={{ type: 'img', src: demoSrc, alt: 'Tu perfil' }}
            open={open}
            onOpenChange={setOpen}
          >
            <AccountMenu onClose={() => setOpen(false)} />
          </AvatarAction>
        </header>
      </div>
    );
  },
};

const legend: React.CSSProperties = {
  margin: 0,
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--semantic-color-text-secondary)',
};
