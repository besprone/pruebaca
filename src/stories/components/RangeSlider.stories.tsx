import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider';
import { SliderHandle } from '../../components/RangeSlider/SliderHandle';
import { SliderHandleIndicator } from '../../components/RangeSlider/SliderHandleIndicator';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'radio', options: ['standard', 'centered'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    showIndicator: { control: 'radio', options: [true, false, 'always'] },
  },
  args: {
    type: 'standard',
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showIndicator: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, paddingTop: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

const mxn = (v: number) => `$${v.toLocaleString('es-MX')}`;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: ({ min, max, step, disabled, showIndicator }) => {
    function Demo() {
      const [value, setValue] = useState<number>(50);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <RangeSlider
            type="standard"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            showIndicator={showIndicator}
            value={value}
            onChange={setValue}
          />
          <p style={{ margin: 0, fontSize: 13, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
            value: {value}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Standard (monto de crédito) ────────────────────────────────────────────

export const Standard: Story = {
  name: 'Standard — monto',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [value, setValue] = useState(80_000);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 13, fontFamily: 'var(--typography-font-family)' }}>
            Selecciona el monto que necesitas
          </span>
          <RangeSlider
            type="standard"
            min={20_000}
            max={150_000}
            step={5_000}
            value={value}
            onChange={setValue}
            formatValue={mxn}
            aria-label="Monto de crédito"
          />
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, fontFamily: 'var(--typography-font-family)' }}>
            {mxn(value)}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Centered (filtro de rango) ────────────────────────────────────────────

export const Centered: Story = {
  name: 'Centered — rango de precio',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [range, setRange] = useState<[number, number]>([50_000, 120_000]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 13, fontFamily: 'var(--typography-font-family)' }}>Rango de monto</span>
          <RangeSlider
            type="centered"
            min={0}
            max={200_000}
            step={10_000}
            value={range}
            onChange={setRange}
            formatValue={mxn}
            aria-label="Rango de monto invertido"
          />
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, fontFamily: 'var(--typography-font-family)' }}>
            {mxn(range[0])} – {mxn(range[1])}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          default · showIndicator="always"
        </span>
        <RangeSlider type="standard" defaultValue={40} showIndicator="always" aria-label="Ejemplo" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          disabled
        </span>
        <RangeSlider type="centered" defaultValue={[30, 70]} disabled aria-label="Ejemplo deshabilitado" />
      </div>
    </div>
  ),
};

// ── Building blocks (internos) ─────────────────────────────────────────────

export const BuildingBlocks: Story = {
  name: 'Building blocks (internos)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          SliderHandle — default · pressed
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SliderHandle />
          <SliderHandle pressed />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)' }}>
          SliderHandleIndicator
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SliderHandleIndicator>0</SliderHandleIndicator>
          <SliderHandleIndicator>$80,000</SliderHandleIndicator>
        </div>
      </div>
    </div>
  ),
};
