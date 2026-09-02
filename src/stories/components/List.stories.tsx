import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ChevronRight,
  Wallet,
  Money,
  ChartLine,
  Document,
  RadioButton,
  RadioButtonChecked,
} from '@carbon/icons-react';
import { List } from '../../components/List';
import { ListItem } from '../../components/List/ListItem';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: ['segmented', 'standard'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    radius: { control: 'boolean' },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof List>;

const ROWS = [
  { icon: <Wallet />, label: 'Cuenta de ahorro', supporting: '$12,480.00' },
  { icon: <Money />, label: 'kubo.plazofijo', supporting: 'Rendimiento 11.2%' },
  { icon: <ChartLine />, label: 'Inversión flexible', supporting: '$3,000.00' },
  { icon: <Document />, label: 'Estado de cuenta', supporting: 'Marzo 2026' },
];

// ── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { type: 'segmented', radius: true, size: 'sm' },
  render: (args) => (
    <List {...args} aria-label="Cuentas">
      {ROWS.map((r) => (
        <ListItem
          key={r.label}
          leading={r.icon}
          label={r.label}
          supporting={r.supporting}
          trailing={<ChevronRight />}
          interactive
        />
      ))}
    </List>
  ),
};

// ── segmented vs standard ─────────────────────────────────────────────────

export const Tipos: Story = {
  name: 'segmented · standard',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <p style={legend}>type=&quot;segmented&quot; — tarjeta con divisores</p>
        <List type="segmented" aria-label="Segmented">
          {ROWS.map((r) => (
            <ListItem key={r.label} leading={r.icon} label={r.label} supporting={r.supporting} trailing={<ChevronRight />} interactive />
          ))}
        </List>
      </div>
      <div>
        <p style={legend}>type=&quot;standard&quot; — filas planas, sin divisores</p>
        <List type="standard" aria-label="Standard">
          {ROWS.map((r) => (
            <ListItem key={r.label} leading={r.icon} label={r.label} supporting={r.supporting} trailing={<ChevronRight />} interactive />
          ))}
        </List>
      </div>
    </div>
  ),
};

// ── size: sm (stacked) · md (horizontal) ─────────────────────────────────

export const Tamano: Story = {
  name: 'Tamaño (sm · md)',
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <p style={legend}>size=&quot;sm&quot; — stacked (label sobre supporting)</p>
        <div style={{ width: 360 }}>
          <List size="sm" aria-label="Lista sm">
            {ROWS.map((r) => (
              <ListItem key={r.label} leading={r.icon} label={r.label} supporting={r.supporting} trailing={<ChevronRight />} interactive />
            ))}
          </List>
        </div>
      </div>
      <div>
        <p style={legend}>size=&quot;md&quot; — horizontal (label y supporting en fila)</p>
        <List size="md" aria-label="Lista md">
          {ROWS.map((r) => (
            <ListItem key={r.label} leading={r.icon} label={r.label} supporting={r.supporting} trailing={<ChevronRight />} interactive />
          ))}
        </List>
      </div>
    </div>
  ),
};

// ── radius: redondeado · recto ──────────────────────────────────────────

export const Radio: Story = {
  name: 'radius (redondeado · recto)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <p style={legend}>radius=&#123;true&#125; — esquinas del grupo redondeadas</p>
        <List type="segmented" radius aria-label="Redondeada">
          {ROWS.slice(0, 3).map((r) => (
            <ListItem key={r.label} leading={r.icon} label={r.label} supporting={r.supporting} trailing={<ChevronRight />} interactive />
          ))}
        </List>
      </div>
      <div>
        <p style={legend}>radius=&#123;false&#125; — bordes rectos (p. ej. borde a borde de la pantalla)</p>
        <List type="segmented" radius={false} aria-label="Recta">
          {ROWS.slice(0, 3).map((r) => (
            <ListItem key={r.label} leading={r.icon} label={r.label} supporting={r.supporting} trailing={<ChevronRight />} interactive />
          ))}
        </List>
      </div>
    </div>
  ),
};

// ── Selección (patrón radio) ────────────────────────────────────────────

export const Seleccion: Story = {
  name: 'Selección',
  parameters: { controls: { disable: true } },
  render: () => {
    const options = [
      { value: 'az', label: 'Nombre (A-Z)' },
      { value: 'monto', label: 'Monto (mayor a menor)' },
      { value: 'venc', label: 'Vencimiento (más cercano)' },
    ];
    const [value, setValue] = useState('az');
    return (
      <div role="radiogroup" aria-label="Ordenar por" style={{ width: 320 }}>
        <List type="segmented" role="presentation">
          {options.map((o) => {
            const checked = value === o.value;
            return (
              <ListItem
                key={o.value}
                label={o.label}
                selected={checked}
                trailing={checked ? <RadioButtonChecked /> : <RadioButton />}
                interactive
                role="radio"
                aria-checked={checked}
                onClick={() => setValue(o.value)}
              />
            );
          })}
        </List>
      </div>
    );
  },
};

// ── Estados ────────────────────────────────────────────────────────────

export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <List type="segmented" aria-label="Estados">
      <ListItem leading={<Wallet />} label="Default" supporting="reposo" trailing={<ChevronRight />} />
      <ListItem leading={<Wallet />} label="Hovered" supporting="state/hover" trailing={<ChevronRight />} state="hovered" />
      <ListItem leading={<Wallet />} label="Pressed" supporting="state/pressed" trailing={<ChevronRight />} state="pressed" />
      <ListItem leading={<Wallet />} label="Selected" supporting="bg/brandSoft" trailing={<ChevronRight />} selected />
      <ListItem leading={<Wallet />} label="Disabled" supporting="no interactivo" trailing={<ChevronRight />} disabled />
      <ListItem leading={<Wallet />} label="Selected + disabled" supporting="overlay disabled" trailing={<ChevronRight />} selected disabled />
    </List>
  ),
};

// ── Contenido variable ────────────────────────────────────────────────

export const Contenido: Story = {
  name: 'Contenido variable',
  parameters: { controls: { disable: true } },
  render: () => (
    <List type="segmented" aria-label="Contenido">
      <ListItem leading={<Wallet />} label="Con leading + trailing" supporting="supporting" trailing={<ChevronRight />} />
      <ListItem label="Solo label" />
      <ListItem label="Label + supporting" supporting="sin iconos" />
      <ListItem leading={<Money />} label="Sin trailing" supporting="supporting" />
      <ListItem
        leading={<Document />}
        label="Un label muy largo que no cabe en una sola línea y se ajusta al ancho disponible"
        supporting="y su texto de apoyo también bastante extenso para ver el wrap"
        trailing={<ChevronRight />}
      />
    </List>
  ),
};

// ── Building blocks (documentación — no exportados) ───────────────────

export const BuildingBlocks: Story = {
  name: 'Building blocks',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={legend}>`ListItem` suelto — SIN radio propio</p>
        <div style={{ border: '1px dashed var(--semantic-color-border-default)' }}>
          <ListItem leading={<Wallet />} label="Label 1" supporting="supporting 1" trailing={<ChevronRight />} />
        </div>
      </div>
      <div>
        <p style={legend}>el mismo `ListItem` dentro de `List` (radius) — se ve redondeado</p>
        <List type="segmented" radius aria-label="Uno solo">
          <ListItem leading={<Wallet />} label="Label 1" supporting="supporting 1" trailing={<ChevronRight />} />
        </List>
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
