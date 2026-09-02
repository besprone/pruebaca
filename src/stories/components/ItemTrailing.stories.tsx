import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { ItemTrailing } from '../../components/ItemBlocks';
import type { ItemTrailingType } from '../../components/ItemBlocks';
import { Badge } from '../../components/Badge/Badge';

const TYPES: ItemTrailingType[] = ['icon', 'checkbox', 'radio', 'switch', 'badge', 'text'];

const meta: Meta<typeof ItemTrailing> = {
  title: 'Components/Item blocks/Trailing',
  component: ItemTrailing,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    icon: { control: false },
    children: { control: false },
    control: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ItemTrailing>;

const frame: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: 200,
  padding: '8px 16px',
  border: '1px dashed var(--semantic-color-border-default)',
  borderRadius: 8,
};

export const Playground: Story = {
  args: { type: 'icon' },
  render: (args) => (
    <div style={frame}>
      <ItemTrailing {...args}>
        {args.type === 'badge' ? <Badge semantic="success" label="Nuevo" /> : args.type === 'text' ? '$1,200' : undefined}
      </ItemTrailing>
    </div>
  ),
};

export const Todos: Story = {
  name: 'Todos los tipos',
  parameters: { controls: { disable: true } },
  render: () => {
    const [chk, setChk] = useState(true);
    const [rad, setRad] = useState(true);
    const [sw, setSw] = useState(false);
    const rows: { label: string; el: React.ReactNode }[] = [
      { label: 'icon (decorativo)', el: <ItemTrailing type="icon" /> },
      {
        label: 'icon (acción)',
        el: <ItemTrailing type="icon" icon={<OverflowMenuVertical />} iconLabel="Más opciones" onIconClick={() => {}} />,
      },
      {
        label: 'checkbox',
        el: <ItemTrailing type="checkbox" control={{ checked: chk, onChange: (e) => setChk(e.target.checked), 'aria-label': 'Seleccionar' }} />,
      },
      {
        label: 'radio',
        el: <ItemTrailing type="radio" control={{ checked: rad, onChange: () => setRad(true), name: 'demo', 'aria-label': 'Elegir' }} />,
      },
      {
        label: 'switch',
        el: <ItemTrailing type="switch" control={{ checked: sw, onChange: (e) => setSw(e.target.checked), 'aria-label': 'Activar' }} />,
      },
      { label: 'badge', el: <ItemTrailing type="badge"><Badge semantic="success" label="Activo" /></ItemTrailing> },
      { label: 'text', el: <ItemTrailing type="text">$1,200.00</ItemTrailing> },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        {rows.map((r) => (
          <div key={r.label} style={frame}>
            <span style={{ marginRight: 'auto', fontFamily: 'monospace', fontSize: 11, color: 'var(--semantic-color-text-secondary)' }}>
              {r.label}
            </span>
            {r.el}
          </div>
        ))}
      </div>
    );
  },
};
