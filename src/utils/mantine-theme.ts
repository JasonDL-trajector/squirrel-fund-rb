import { createTheme, rem } from "@mantine/core";

// Apple-inspired system font stack (avoids bundling SF fonts)
const appleSystemStack = [
  'ui-sans-serif',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
].join(", ");

// Apple-like palettes (primary uses iOS accent blue, neutrals mimic iOS grays)
export const mantineTheme = createTheme({
  fontFamily: appleSystemStack,
  primaryColor: "blue",
  defaultRadius: "md",
  colors: {
    // iOS Blue (accent)
    blue: [
      "#E6F0FF", // 0
      "#D1E4FF", // 1
      "#A8CCFF", // 2
      "#7FB2FF", // 3
      "#4D9DFF", // 4
      "#0A84FF", // 5 (primary)
      "#0077F5", // 6
      "#0066D6", // 7
      "#0055B8", // 8
      "#003F8A", // 9
    ],
    // iOS Green
    green: [
      "#EAFBF0",
      "#D7F7E2",
      "#B7EECA",
      "#8DE6AF",
      "#5EDA8F",
      "#34C759", // primary success
      "#28A64A",
      "#1E8B3D",
      "#177032",
      "#0F4D22",
    ],
    // iOS Red
    red: [
      "#FDEAEA",
      "#FAD6D6",
      "#F3B1B1",
      "#EC8A8A",
      "#E25E5E",
      "#FF3B30", // error accent
      "#E3342A",
      "#C32C23",
      "#A0241D",
      "#761A14",
    ],
    // iOS Orange (warning)
    yellow: [
      "#FFF3E5",
      "#FFE6CC",
      "#FFCF99",
      "#FFB766",
      "#FF9D33",
      "#FF9500", // warning accent
      "#E08500",
      "#C07200",
      "#9D5E00",
      "#6B3E00",
    ],
    // iOS-style neutral grays
    gray: [
      "#F5F5F7", // 0 - surfaces
      "#EFEFF1", // 1
      "#E5E5EA", // 2 - dividers
      "#D1D1D6", // 3
      "#C7C7CC", // 4
      "#8E8E93", // 5 - secondary text
      "#636366", // 6
      "#3A3A3C", // 7
      "#2C2C2E", // 8
      "#1C1C1E", // 9 - dark surfaces
    ],
  },
  headings: {
    fontFamily: appleSystemStack,
    sizes: {
      h1: { fontSize: rem(36), lineHeight: "2.75rem", fontWeight: "700" },
      h2: { fontSize: rem(30), lineHeight: "2.25rem", fontWeight: "700" },
      h3: { fontSize: rem(24), lineHeight: "1.75rem", fontWeight: "700" },
      h4: { fontSize: rem(21), lineHeight: "1.6rem", fontWeight: "600" },
      h5: { fontSize: rem(18), lineHeight: "1.6rem", fontWeight: "600" },
      h6: { fontSize: rem(16), lineHeight: "1.4rem", fontWeight: "600" },
    },
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(21),
    "2xl": rem(24),
    "3xl": rem(30),
    "4xl": rem(36),
  },
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
    "2xl": rem(32),
  },
  lineHeights: {
    xs: "1rem",
    sm: "1.35rem",
    md: "1.5rem",
    lg: "1.6rem",
    xl: "1.75rem",
    "2xl": "2.25rem",
    "3xl": "2.75rem",
  },
  radius: {
    xs: "6px",
    sm: "8px",
    md: "10px", // default card/input radius
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    // Subtle, soft shadows like iOS cards/sheets
    xs: "0 1px 1px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
    sm: "0 2px 6px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)",
    md: "0 6px 16px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
    lg: "0 10px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
    xl: "0 16px 36px rgba(0,0,0,0.12)",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
        variant: "filled",
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: "transform 120ms ease, box-shadow 150ms ease",
          boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          '&:active': { transform: "translateY(1px)" },
        },
      },
    },
    Paper: {
      defaultProps: { radius: "md", shadow: "sm" },
    },
    Card: {
      defaultProps: { radius: "md", shadow: "sm", padding: "lg" },
    },
    TextInput: {
      defaultProps: { radius: "md", size: "md" },
      styles: {
        input: {
          transition: "border-color 120ms ease, box-shadow 150ms ease",
        },
      },
    },
    PasswordInput: {
      defaultProps: { radius: "md", size: "md" },
    },
    Select: {
      defaultProps: { radius: "md", size: "md" },
    },
    NumberInput: {
      defaultProps: { radius: "md", size: "md" },
    },
    Tabs: {
      defaultProps: { radius: "md" },
    },
    Tooltip: {
      defaultProps: { radius: "sm" },
    },
    Modal: {
      defaultProps: { radius: "lg", shadow: "lg" },
    },
    Menu: {
      defaultProps: { radius: "md", shadow: "sm" },
    },
    ActionIcon: {
      defaultProps: { radius: "md" },
    },
    Switch: {
      defaultProps: { radius: "xl" },
    },
  },
  other: {
    divider: "#E5E5EA",
    disabledBackground: "rgba(60,60,67,0.12)",
    hoverBackground: "#F5F5F7",
  },
});
