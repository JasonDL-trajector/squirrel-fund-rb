"use client";
import React from "react";
import { Paper, PaperProps } from "@mantine/core";

type GlassmorphismCardProps = Omit<PaperProps, "children"> & {
  children: React.ReactNode;
  maxWidth?: number | string;
};

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className,
  style,
  p = "xl",
  radius = "lg",
  shadow = "xl",
  maxWidth = 520,
  ...rest
}) => {
  return (
    <Paper
      p={p}
      radius={radius}
      shadow={shadow}
      className={["glass-card", className].filter(Boolean).join(" ")}
      styles={{
        root: {
          width: "100%",
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          background: "var(--glass-bg, rgba(255,255,255,0.1))",
          border: "1px solid var(--glass-border, rgba(255,255,255,0.3))",
          backdropFilter: "blur(var(--glass-blur, 20px))",
          WebkitBackdropFilter: "blur(var(--glass-blur, 20px))",
          boxShadow:
            "var(--glass-shadow, 0 10px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06))",
          borderRadius: "var(--glass-radius, 16px)",
        },
      }}
      style={style}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default GlassmorphismCard;

