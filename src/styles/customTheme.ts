import { theme, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    body: "Inter, sans-serif",
    heading: "Manrope, serif",
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#ffffff", "gray.900")(props),
      },
    }),
  },
  colors: {
    ...theme.colors,
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
  },
  components: {
    /** Example */
    // Button: {
    //   baseStyle: {
    //     borderRadius: 24,
    //   },
    // },
  },
});

export default customTheme;
