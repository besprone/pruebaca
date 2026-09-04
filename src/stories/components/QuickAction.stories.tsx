import type { Meta, StoryObj } from '@storybook/react';
import { Growth, PiggyBank, SendAlt, OverflowMenuHorizontal } from '@carbon/icons-react';
import { QuickAction } from '../../components/QuickAction';
import type { QuickActionEmphasis, QuickActionSize, QuickActionScheme } from '../../components/QuickAction';
import { QuickActionGroup } from '../../components/QuickAction';

const meta: Meta<typeof QuickAction> = {
  title: 'Components/QuickAction',
  component: QuickAction,
  parameters: { layout: 'centered' },
  argTypes: {
    emphasis: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost'] satisfies QuickActionEmphasis[],
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'] satisfies QuickActionSize[],
    },
    scheme: {
      control: 'radio',
      options: ['brand', 'neutral'] satisfies QuickActionScheme[],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Invertir',
    emphasis: 'primary',
    size: 'sm',
    scheme: 'brand',
    disabled: false,
    icon: <Growth />,
  },
};

export default meta;
type Story = StoryObj<typeof QuickAction>;

export const Playground: Story = {};

// ── Por énfasis ─────────────────────────────────────────────────────────────

export const PorEnfasis: Story = {
  name: 'Por énfasis',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <QuickAction label="Invertir" emphasis="primary" icon={<Growth />} />
      <QuickAction label="Depositar dinero" emphasis="secondary" icon={<PiggyBank />} />
      <QuickAction label="Transferir" emphasis="ghost" icon={<SendAlt />} />
    </div>
  ),
};

// ── Por tamaño ──────────────────────────────────────────────────────────────

export const PorTamaño: Story = {
  name: 'Por tamaño',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
      <QuickAction label="Invertir" size="sm" icon={<Growth />} />
      <QuickAction label="Invertir" size="lg" icon={<Growth />} />
    </div>
  ),
};

// ── Por scheme ──────────────────────────────────────────────────────────────

export const PorScheme: Story = {
  name: 'Por scheme',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <QuickAction label="Invertir" emphasis="primary" scheme="brand" icon={<Growth />} />
        <QuickAction label="Depositar" emphasis="secondary" scheme="brand" icon={<PiggyBank />} />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <QuickAction label="Invertir" emphasis="primary" scheme="neutral" icon={<Growth />} />
        <QuickAction label="Depositar" emphasis="secondary" scheme="neutral" icon={<PiggyBank />} />
      </div>
    </div>
  ),
};

// ── Deshabilitado ────────────────────────────────────────────────────────────

export const Deshabilitado: Story = {
  name: 'Deshabilitado',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <QuickAction label="Invertir" emphasis="primary" disabled icon={<Growth />} />
      <QuickAction label="Depositar dinero" emphasis="secondary" disabled icon={<PiggyBank />} />
    </div>
  ),
};

// ── QuickActionGroup ─────────────────────────────────────────────────────────

export const Group: Story = {
  name: 'QuickActionGroup',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360, background: 'var(--semantic-color-bg-canvas)' }}>
      <QuickActionGroup>
        <QuickAction label="Invertir" emphasis="primary" icon={<Growth />} />
        <QuickAction label="Ahorrar" emphasis="secondary" icon={<PiggyBank />} />
        <QuickAction label="Enviar" emphasis="secondary" icon={<SendAlt />} />
        <QuickAction label="Más" emphasis="secondary" icon={<OverflowMenuHorizontal />} />
      </QuickActionGroup>
    </div>
  ),
};

export const GroupNeutralLg: Story = {
  name: 'QuickActionGroup (neutral, lg)',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360, background: 'var(--semantic-color-bg-canvas)' }}>
      <QuickActionGroup size="lg" scheme="neutral">
        <QuickAction label="Invertir" emphasis="primary" icon={<Growth />} />
        <QuickAction label="Ahorrar" emphasis="secondary" icon={<PiggyBank />} />
        <QuickAction label="Enviar" emphasis="secondary" icon={<SendAlt />} />
      </QuickActionGroup>
    </div>
  ),
};
