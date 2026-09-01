import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarMenuButton } from '../../components/Calendar/CalendarMenuButton';
import { CalendarDayCell } from '../../components/Calendar/CalendarDayCell';
import { CalendarYearCell } from '../../components/Calendar/CalendarYearCell';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'xs'] },
    surface: { control: 'radio', options: ['none', 'card'] },
    weekStartsOn: { control: 'radio', options: [0, 1] },
  },
  args: {
    size: 'sm',
    surface: 'card',
    weekStartsOn: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState<Date | null>(new Date(2026, 1, 27));
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <Calendar {...args} value={value} onChange={setValue} defaultMonth={new Date(2026, 1, 1)} />
          <p style={{ margin: 0, fontSize: 13, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
            {value ? value.toLocaleDateString('es-MX', { dateStyle: 'long' }) : 'sin fecha'}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Superficies ─────────────────────────────────────────────────────────────

export const Superficies: Story = {
  name: 'Superficies (none / card)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          surface=none
        </span>
        <Calendar surface="none" defaultValue={new Date(2026, 1, 27)} defaultMonth={new Date(2026, 1, 1)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          surface=card
        </span>
        <Calendar surface="card" defaultValue={new Date(2026, 1, 27)} defaultMonth={new Date(2026, 1, 1)} />
      </div>
    </div>
  ),
};

// ── Con rango ───────────────────────────────────────────────────────────────

export const ConRango: Story = {
  name: 'Con rango (min / max)',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [value, setValue] = useState<Date | null>(null);
      const min = new Date(2026, 1, 10);
      const max = new Date(2026, 1, 24);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <Calendar
            surface="card"
            value={value}
            onChange={setValue}
            minDate={min}
            maxDate={max}
            defaultMonth={new Date(2026, 1, 1)}
          />
          <p style={{ margin: 0, fontSize: 12, color: 'var(--semantic-color-text-tertiary)' }}>
            Seleccionable: 10 – 24 feb 2026
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Tamaños ─────────────────────────────────────────────────────────────────

export const Tamanos: Story = {
  name: 'Tamaños',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>size=sm</span>
        <Calendar size="sm" surface="card" defaultValue={new Date(2026, 1, 27)} defaultMonth={new Date(2026, 1, 1)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>size=xs</span>
        <Calendar size="xs" surface="card" defaultValue={new Date(2026, 1, 27)} defaultMonth={new Date(2026, 1, 1)} />
      </div>
    </div>
  ),
};

// ── Building blocks (internos) ─────────────────────────────────────────────

export const BuildingBlocks: Story = {
  name: 'Building blocks (internos)',
  parameters: { controls: { disable: true } },
  render: () => {
    const label: React.CSSProperties = {
      fontSize: 11,
      fontFamily: 'monospace',
      color: 'var(--semantic-color-text-secondary)',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={label}>CalendarMenuButton</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <CalendarMenuButton label="Febrero 2026" />
            <CalendarMenuButton label="2022 – 2030" expanded />
            <CalendarMenuButton label="Febrero 2026" disabled />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={label}>CalendarDayCell — sm</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <CalendarDayCell day={16} />
            <CalendarDayCell day={17} type="today" />
            <CalendarDayCell day={27} type="selected" />
            <CalendarDayCell day={28} disabled />
            <CalendarDayCell day={3} outside />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={label}>CalendarYearCell</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <CalendarYearCell year={2026} />
            <CalendarYearCell year={2027} type="selected" />
            <CalendarYearCell year={2028} disabled />
          </div>
        </div>
      </div>
    );
  },
};
