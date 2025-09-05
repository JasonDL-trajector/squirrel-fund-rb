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
  focusRing: "auto",
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
    indigo: ["#EEF2FF","#E0E7FF","#C7D2FE","#A5B4FC","#818CF8","#6366F1","#5457D8","#4548BF","#373AA6","#2C2F85"],
    purple: ["#F5E8FF","#E9D3FF","#D4AFFF","#BF8BFF","#AA67FF","#BF5AF2","#A14BD0","#853DAE","#6A2F8D","#4F226B"],
    pink: ["#FFE5F1","#FFCBE4","#FF9CC8","#FF6EAD","#FF4091","#FF2D55","#E0274A","#C12140","#A21B36","#7A1428"],
    teal: ["#E6FFFA","#B2F5EA","#81E6D9","#4FD1C5","#38B2AC","#20C997","#1AA782","#14866C","#0E6657","#094B40"],
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
    xxs: rem(2),
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
    "2xl": rem(32),
    "3xl": rem(44),
    "4xl": rem(64),
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
    xs: "4px",
    sm: "8px",
    md: "10px", // default card/input radius
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    "3xl": "28px",
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
    SegmentedControl: {
      styles: {
        root: { backgroundColor: "#F2F2F7", borderRadius: "12px", padding: "4px" },
        label: { fontWeight: 600 },
        control: { borderRadius: "10px" },
        indicator: { boxShadow: "0 2px 6px rgba(0,0,0,0.06)" },
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
      styles: {
        tab: { fontWeight: 600 },
        tabLabel: { padding: `${rem(8)} ${rem(12)}` },
      },
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
    ios: {
      // Semantic label colors (light mode)
      label: "rgba(0,0,0,0.85)",
      secondaryLabel: "rgba(60,60,67,0.6)",
      tertiaryLabel: "rgba(60,60,67,0.3)",
      quaternaryLabel: "rgba(60,60,67,0.18)",
      // System backgrounds (light)
      systemBackground: "#FFFFFF",
      secondarySystemBackground: "#F2F2F7",
      tertiarySystemBackground: "#FFFFFF",
      // Fills
      systemFill: "rgba(120,120,128,0.2)",
      secondarySystemFill: "rgba(120,120,128,0.16)",
      tertiarySystemFill: "rgba(118,118,128,0.12)",
      quaternarySystemFill: "rgba(116,116,128,0.08)",
      // Elevation
      shadows: {
        level1: "0 1px 2px rgba(0,0,0,0.06)",
        level2: "0 3px 8px rgba(0,0,0,0.08)",
        level3: "0 6px 16px rgba(0,0,0,0.10)",
        sheet: "0 8px 30px rgba(0,0,0,0.18)",
      },
      // Motion durations
      motion: {
        fast: "120ms",
        normal: "180ms",
        slow: "260ms",
      },
      // Text styles (subset)
      textStyles: {
        largeTitle: { fontSize: rem(34), lineHeight: "2.75rem", fontWeight: 700 },
        title1: { fontSize: rem(28), lineHeight: "2.25rem", fontWeight: 700 },
        title2: { fontSize: rem(22), lineHeight: "1.8rem", fontWeight: 700 },
        headline: { fontSize: rem(17), lineHeight: "1.5rem", fontWeight: 600 },
        body: { fontSize: rem(17), lineHeight: "1.5rem", fontWeight: 400 },
        callout: { fontSize: rem(16), lineHeight: "1.45rem", fontWeight: 400 },
        subheadline: { fontSize: rem(15), lineHeight: "1.4rem", fontWeight: 400 },
        footnote: { fontSize: rem(13), lineHeight: "1.2rem", fontWeight: 400 },
        caption2: { fontSize: rem(11), lineHeight: "1rem", fontWeight: 400 },
      },
      // Safe-area aliases
      safeArea: {
        top: "env(safe-area-inset-top)",
        right: "env(safe-area-inset-right)",
        bottom: "env(safe-area-inset-bottom)",
        left: "env(safe-area-inset-left)",
      },
    },
  },
});
