import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
        Next Robotics
      </span>
    ),
  },
  links: [
    {
      text: "Tutorials",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
