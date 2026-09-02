import type { Meta, StoryObj } from '@storybook/react';
import { Information } from '@carbon/icons-react';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import type { TooltipSide, TooltipAlign } from '../../components/Tooltip/Tooltip';
import { IconButton } from '../../components/IconButton/IconButton';
import { Button } from '../../components/Button/Button';

const SIDES: TooltipSide[] = ['top', 'right', 'bottom', 'left'];
const ALIGNS: TooltipAlign[] = ['start', 'center', 'end'];

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    side: { control: 'inline-radio', options: SIDES },
    align: { control: 'inline-radio', options: ALIGNS },
    openDelay: { control: { type: 'number' } },
    content: { control: 'text' },
    heading: { control: 'text' },
    slot: { control: false },
    children: { control: false },
  },
  args: {
    side: 'top',
    align: 'center',
    openDelay: 200,
    content: 'Se calcula sobre el capital más los intereses acumulados.',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <Button emphasis="secondary" size="sm">
          Interés compuesto
        </Button>
      </Tooltip>
    </div>
  ),
};

// ── Placements (open controlado para verlos todos) ───────────────────────

export const Placements: Story = {
  name: 'side',
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 96,
        padding: 96,
        placeItems: 'center',
      }}
    >
      {SIDES.map((s) => (
        <Tooltip key={s} open side={s} content={`side = ${s}`} heading="Placement">
          <Button emphasis="secondary" size="sm">
            {s}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

// ── Align ───────────────────────────────────────────────────────────────

export const Align: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 72, padding: '72px 24px' }}>
      {ALIGNS.map((a) => (
        <Tooltip key={a} open side="bottom" align={a} content={`align = ${a} · texto un poco más largo para notar la alineación`}>
          <Button emphasis="secondary" size="sm" style={{ alignSelf: 'flex-start' }}>
            align {a}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

// ── Composiciones ───────────────────────────────────────────────────────

export const Composiciones: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type Combo = Omit<React.ComponentProps<typeof Tooltip>, 'children'>;
    const items: { label: string; props: Combo }[] = [
      { label: 'content', props: { content: 'Solo texto descriptivo.' } },
      {
        label: 'heading + content',
        props: { heading: 'Interés compuesto', content: 'Rendimientos sobre rendimientos.' },
      },
      {
        label: 'content + slot',
        props: { content: 'El plazo no puede modificarse una vez iniciado.', slot: <Information size={20} /> },
      },
      {
        label: 'heading + content + slot',
        props: {
          heading: 'Vigencia',
          content: 'Vence el 29 nov 2028. No admite renovación automática.',
          slot: <Information size={20} />,
        },
      },
      { label: 'slot', props: { slot: <Information size={24} /> } },
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 96, padding: 72 }}>
        {items.map(({ label, props }) => (
          <Tooltip key={label} {...props} open side="bottom">
            <Button emphasis="secondary" size="sm">
              {label}
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};

// ── En IconButton (hover real) ──────────────────────────────────────────

export const EnIconButton: Story = {
  name: 'En contexto: IconButton',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 64 }}>
      <Tooltip content="Más información sobre el interés compuesto" side="top">
        <IconButton aria-label="Información" emphasis="ghost" icon={<Information />} />
      </Tooltip>
      <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--semantic-color-text-secondary)', alignSelf: 'center' }}>
        ← hover / focus (Tab) sobre el botón
      </p>
    </div>
  ),
};

// ── Flip (cerca del borde) ─────────────────────────────────────────────

export const Flip: Story = {
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div style={{ minHeight: 200, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 8, left: 8 }}>
        <Tooltip open side="top" content="Pedías arriba, pero no hay espacio → flip a bottom.">
          <Button emphasis="secondary" size="sm">
            side=top cerca del borde superior
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};
