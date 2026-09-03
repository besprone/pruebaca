import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UserAvatar, Settings, Notification, Help, Logout, ChevronRight } from '@carbon/icons-react';
import { Menu } from '../../components/Menu';
import { MenuItem } from '../../components/Menu/MenuItem';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 240,
          padding: 8,
          borderRadius: 20,
          background: 'var(--semantic-color-bg-canvas)',
          boxShadow: 'var(--Elevation-elevation-3)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Playground: Story = {
  render: () => {
    const [sel, setSel] = useState('perfil');
    return (
      <Menu aria-label="Cuenta">
        <MenuItem leading={<UserAvatar />} label="Mi perfil" selected={sel === 'perfil'} onClick={() => setSel('perfil')} />
        <MenuItem leading={<Settings />} label="Configuración" selected={sel === 'config'} onClick={() => setSel('config')} />
        <MenuItem leading={<Notification />} label="Notificaciones" supporting="3 sin leer" selected={sel === 'notif'} onClick={() => setSel('notif')} />
        <MenuItem leading={<Help />} label="Ayuda" selected={sel === 'ayuda'} onClick={() => setSel('ayuda')} />
        <MenuItem leading={<Logout />} label="Cerrar sesión" onClick={() => {}} />
      </Menu>
    );
  },
};

export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu aria-label="Estados">
      <MenuItem leading={<Settings />} label="Default" />
      <MenuItem leading={<Settings />} label="Hovered" state="hovered" />
      <MenuItem leading={<Settings />} label="Pressed" state="pressed" />
      <MenuItem leading={<Settings />} label="Selected" selected />
      <MenuItem leading={<Settings />} label="Disabled" disabled />
      <MenuItem leading={<Settings />} label="Selected + disabled" selected disabled />
    </Menu>
  ),
};

export const ConSupporting: Story = {
  name: 'Con supporting',
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu aria-label="Con supporting">
      <MenuItem leading={<UserAvatar />} label="Marco Antonio" supporting="marco@kubo.mx" selected />
      <MenuItem leading={<Notification />} label="Alertas" supporting="Activadas" />
      <MenuItem leading={<Settings />} label="Privacidad" supporting="Solo yo" trailing={<ChevronRight />} />
    </Menu>
  ),
};

export const Expandible: Story = {
  name: 'Item expandible',
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Menu aria-label="Navegación">
        <MenuItem leading={<Settings />} label="General" />
        <MenuItem
          leading={<Notification />}
          label="Notificaciones"
          expandable
          expanded={open}
          onClick={() => setOpen((v) => !v)}
        />
        {open && (
          <>
            <MenuItem label="Push" supporting="Activadas" style={{ paddingInlineStart: 16 }} />
            <MenuItem label="Correo" supporting="Desactivadas" style={{ paddingInlineStart: 16 }} />
          </>
        )}
        <MenuItem leading={<Help />} label="Ayuda" />
      </Menu>
    );
  },
};

export const SinIconos: Story = {
  name: 'Sin iconos',
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu aria-label="Ordenar por">
      <MenuItem label="Nombre (A-Z)" selected />
      <MenuItem label="Más recientes" />
      <MenuItem label="Monto (mayor a menor)" />
    </Menu>
  ),
};
