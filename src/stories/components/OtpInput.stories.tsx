import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OtpInput } from '../../components/OtpInput/OtpInput';
import { OtpDigit } from '../../components/OtpInput/OtpDigit';
import type { OtpDigitSize, OtpDigitState } from '../../components/OtpInput/OtpDigit';

const meta: Meta<typeof OtpInput> = {
  title: 'Components/OtpInput',
  component: OtpInput,
  parameters: { layout: 'centered' },
  argTypes: {
    length: { control: { type: 'number', min: 3, max: 8, step: 1 } },
    size: { control: 'radio', options: ['sm', 'md'] satisfies OtpDigitSize[] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    length: 6,
    size: 'md',
    error: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ── Controlado ──────────────────────────────────────────────────────────────

export const Controlado: Story = {
  name: 'Controlado (auto-avance, paste, backspace)',
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [value, setValue] = useState('');
      const [done, setDone] = useState<string | null>(null);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <OtpInput
            length={6}
            value={value}
            onChange={(v) => {
              setValue(v);
              setDone(null);
            }}
            onComplete={(v) => setDone(v)}
            autoFocus
          />
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontFamily: 'monospace',
              color: done
                ? 'var(--semantic-color-text-success)'
                : 'var(--semantic-color-text-secondary)',
            }}
          >
            {done ? `onComplete → ${done}` : `value: "${value}"`}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--semantic-color-text-tertiary)' }}>
            Prueba pegar "123456" en el primer cuadro.
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

// ── Longitudes ──────────────────────────────────────────────────────────────

export const Longitudes: Story = {
  name: 'Longitudes (4 y 6)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <OtpInput length={4} defaultValue="12" />
      <OtpInput length={6} defaultValue="1234" />
    </div>
  ),
};

// ── Tamaños ─────────────────────────────────────────────────────────────────

export const Tamanos: Story = {
  name: 'Tamaños',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <OtpInput size="sm" defaultValue="123456" />
      <OtpInput size="md" defaultValue="123456" />
    </div>
  ),
};

// ── Estados ─────────────────────────────────────────────────────────────────

export const Estados: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={label}>error — código incorrecto (a todos los cuadros)</span>
        <OtpInput defaultValue="000000" error />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={label}>disabled — patrón deshabilitado mientras valida</span>
        <OtpInput defaultValue="1234" disabled />
      </div>
    </div>
  ),
};

// ── Building block ──────────────────────────────────────────────────────────

export const BuildingBlock: Story = {
  name: 'Building block (OtpDigit · 24 variantes)',
  parameters: { controls: { disable: true } },
  render: () => {
    const states: OtpDigitState[] = ['enabled', 'hovered', 'focused', 'pressed', 'disabled', 'error'];
    const sizes: OtpDigitSize[] = ['md', 'sm'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={label}>size={size}</span>
            {(['empty', 'input'] as const).map((cfg) => (
              <div key={cfg} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ ...label, width: 48 }}>{cfg}</span>
                {states.map((state) => (
                  <div
                    key={state}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
                  >
                    <OtpDigit
                      size={size}
                      state={state}
                      defaultValue={cfg === 'input' ? '1' : ''}
                      readOnly
                    />
                    <span style={{ ...label, fontSize: 10 }}>{state}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'monospace',
  color: 'var(--semantic-color-text-secondary)',
};
