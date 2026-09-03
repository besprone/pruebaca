import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useRef, useState } from 'react';
import { AlphabetIndex, ALPHABET_ES } from '../../components/AlphabetIndex';

const meta: Meta<typeof AlphabetIndex> = {
  title: 'Components/AlphabetIndex',
  component: AlphabetIndex,
  parameters: { layout: 'centered' },
  argTypes: {
    letters: { control: false },
    available: { control: false },
    activeLetter: { control: false },
    onLetterChange: { control: false },
    size: { control: 'inline-radio', options: ['default', 'compact'] },
    showOverlay: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AlphabetIndex>;

// ── datos de demo ──────────────────────────────────────────────────────────
const NAMES = [
  'Ana', 'Andrés', 'Beatriz', 'Bruno', 'Carlos', 'Carmen', 'Daniela', 'Diego',
  'Elena', 'Emilio', 'Fernanda', 'Gabriel', 'Gloria', 'Héctor', 'Inés', 'Iván',
  'Javier', 'Julia', 'Karla', 'Leonardo', 'Lucía', 'Manuel', 'Mariana', 'Natalia',
  'Ñandú Corp.', 'Óscar', 'Olivia', 'Pablo', 'Paula', 'Quintín', 'Ramón', 'Rocío',
  'Sofía', 'Santiago', 'Teresa', 'Tomás', 'Úrsula', 'Valentina', 'Wendy', 'Ximena',
  'Yolanda', 'Zaira',
];

function sectionsFrom(names: string[]) {
  const map = new Map<string, string[]>();
  for (const n of names) {
    const l = n[0].toUpperCase();
    if (!map.has(l)) map.set(l, []);
    map.get(l)!.push(n);
  }
  return [...map.entries()];
}

function ContactsDemo({
  size,
  showOverlay,
  disableEmpty = true,
}: {
  size?: 'default' | 'compact';
  showOverlay?: boolean;
  disableEmpty?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sections = useMemo(() => sectionsFrom(NAMES), []);
  const available = useMemo(() => sections.map(([l]) => l), [sections]);
  const [active, setActive] = useState(available[0]);

  const goTo = (letter: string) => {
    const el = scrollRef.current?.querySelector<HTMLElement>(`[data-section="${letter}"]`);
    el?.scrollIntoView({ block: 'start', behavior: 'auto' });
    setActive(letter);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 460,
        border: '1px solid var(--semantic-color-border-subtle)',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--semantic-color-bg-surface)',
        fontFamily: 'var(--typography-font-family)',
      }}
    >
      <div ref={scrollRef} style={{ height: '100%', overflowY: 'auto', paddingRight: 28 }}>
        {sections.map(([letter, items]) => (
          <div key={letter} data-section={letter}>
            <div
              style={{
                position: 'sticky',
                top: 0,
                padding: '4px 16px',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--semantic-color-text-secondary)',
                background: 'var(--semantic-color-bg-subtle)',
              }}
            >
              {letter}
            </div>
            {items.map((n) => (
              <div
                key={n}
                style={{
                  padding: '12px 16px',
                  fontSize: 14,
                  color: 'var(--semantic-color-text-primary)',
                  borderBottom: '1px solid var(--semantic-color-border-subtle)',
                }}
              >
                {n}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }}>
        <AlphabetIndex
          size={size}
          showOverlay={showOverlay}
          available={disableEmpty ? available : undefined}
          activeLetter={active}
          onLetterChange={goTo}
        />
      </div>
    </div>
  );
}

// ── stories ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { size: 'default', showOverlay: false },
  render: (args) => <ContactsDemo size={args.size} showOverlay={args.showOverlay} />,
};

export const ConOverlay: Story = {
  name: 'Con overlay (drag)',
  parameters: { controls: { disable: true } },
  render: () => <ContactsDemo showOverlay />,
};

export const Compact: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ContactsDemo size="compact" />,
};

export const LetrasDeshabilitadas: Story = {
  name: 'Letras sin contenido',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <ContactsDemo disableEmpty />
      <p style={{ maxWidth: 200, fontFamily: 'monospace', fontSize: 11, color: 'var(--semantic-color-text-secondary)' }}>
        Las letras sin sección en la lista (`available`) se ven atenuadas y no
        responden al tap/drag.
      </p>
    </div>
  ),
};

export const SoloElStrip: Story = {
  name: 'Solo el strip',
  parameters: { controls: { disable: true } },
  render: () => {
    const [active, setActive] = useState('A');
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', border: '1px dashed var(--semantic-color-border-default)', padding: 16, borderRadius: 8 }}>
        <AlphabetIndex letters={ALPHABET_ES} activeLetter={active} onLetterChange={setActive} />
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--semantic-color-text-secondary)' }}>
          activa: {active}
        </span>
      </div>
    );
  },
};
