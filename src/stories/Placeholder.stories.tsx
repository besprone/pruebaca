import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Ejemplos/Placeholder",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vacio: Story = {
  render: () => <span style={{ fontFamily: "system-ui" }}>Aquí irá el primer componente.</span>,
};
