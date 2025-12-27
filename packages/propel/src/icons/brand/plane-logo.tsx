import * as React from "react";

import type { ISvgIcons } from "../type";

export function PlaneLogo({ width = "85", height = "52", className }: ISvgIcons) {
  return (
    <img
      src="/organizalo-assets/logo-main.png"
      width={width}
      height={height}
      className={className}
      alt="Organizalo"
      style={{ objectFit: "contain" }}
    />
  );
}
