import { Plus_Jakarta_Sans } from "next/font/google";
import { createTheme } from "@mantine/core";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const mantineTheme = createTheme({
  fontFamily: plus.style.fontFamily,
  primaryColor: "blue",
  colors: {
    blue: [
      "#ECF2FF", // 0 - light
      "#D6E4FF", // 1
      "#B3D1FF", // 2
      "#8BB8FF", // 3
      "#5D87FF", // 4 - main primary
      "#4570EA", // 5 - dark
      "#3A5FD9", // 6
      "#2F4EC8", // 7
      "#243DB7", // 8
      "#192CA6", // 9
    ],
    cyan: [
      "#E8F7FF", // 0 - light
      "#D1EFFF", // 1
      "#A3DFFF", // 2
      "#75CFFF", // 3
      "#49BEFF", // 4 - main secondary
      "#23AFDB", // 5 - dark
      "#1F9BC7", // 6
      "#1B87B3", // 7
      "#17739F", // 8
      "#135F8B", // 9
    ],
    green: [
      "#E6FFFA", // 0 - light
      "#CCFFF5", // 1
      "#99FFEB", // 2
      "#66FFE1", // 3
      "#13DEB9", // 4 - main success
      "#02B3A9", // 5 - dark
      "#029F97", // 6
      "#018B85", // 7
      "#017773", // 8
      "#016361", // 9
    ],
    indigo: [
      "#EBF3FE", // 0 - light
      "#D7E7FD", // 1
      "#AFCFFB", // 2
      "#87B7F9", // 3
      "#539BFF", // 4 - main info
      "#1682D4", // 5 - dark
      "#1475BF", // 6
      "#1268AA", // 7
      "#105B95", // 8
      "#0E4E80", // 9
    ],
    red: [
      "#FDEDE8", // 0 - light
      "#FBDAD1", // 1
      "#F7B5A3", // 2
      "#F39075", // 3
      "#FA896B", // 4 - main error
      "#F3704D", // 5 - dark
      "#DB663F", // 6
      "#C35C31", // 7
      "#AB5223", // 8
      "#934815", // 9
    ],
    yellow: [
      "#FEF5E5", // 0 - light
      "#FDEBCB", // 1
      "#FBD797", // 2
      "#F9C363", // 3
      "#FFAE1F", // 4 - main warning
      "#AE8E59", // 5 - dark
      "#9D7F50", // 6
      "#8C7047", // 7
      "#7B613E", // 8
      "#6A5235", // 9
    ],
    gray: [
      "#F2F6FA", // 0 - 100
      "#EAEFF4", // 1 - 200
      "#DFE5EF", // 2 - 300
      "#7C8FAC", // 3 - 400
      "#5A6A85", // 4 - 500
      "#2A3547", // 5 - 600
      "#252F3F", // 6
      "#202937", // 7
      "#1B232F", // 8
      "#161D27", // 9
    ],
  },
  headings: {
    fontFamily: plus.style.fontFamily,
    sizes: {
      h1: { fontSize: "2.25rem", lineHeight: "2.75rem", fontWeight: "600" },
      h2: { fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: "600" },
      h3: { fontSize: "1.5rem", lineHeight: "1.75rem", fontWeight: "600" },
      h4: { fontSize: "1.3125rem", lineHeight: "1.6rem", fontWeight: "600" },
      h5: { fontSize: "1.125rem", lineHeight: "1.6rem", fontWeight: "600" },
      h6: { fontSize: "1rem", lineHeight: "1.2rem", fontWeight: "600" },
    },
  },
  fontSizes: {
    xs: "0.75rem", // body2
    sm: "0.875rem", // body1, subtitle1, subtitle2
    md: "1rem", // h6
    lg: "1.125rem", // h5
    xl: "1.3125rem", // h4
    "2xl": "1.5rem", // h3
    "3xl": "1.875rem", // h2
    "4xl": "2.25rem", // h1
  },
  lineHeights: {
    xs: "1rem", // body2
    sm: "1.334rem", // body1
    md: "1.2rem", // h6, h5
    lg: "1.6rem", // h4, h5
    xl: "1.75rem", // h3
    "2xl": "2.25rem", // h2
    "3xl": "2.75rem", // h1
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "7px", // Card borderRadius
    lg: "8px",
    xl: "12px",
  },
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    sm: "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
    md: "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
    lg: "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)",
    xl: "0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)",
  },
  other: {
    divider: "#e5eaef",
    disabledBackground: "rgba(73,82,88,0.12)",
    hoverBackground: "#f6f9fc",
  },
});
