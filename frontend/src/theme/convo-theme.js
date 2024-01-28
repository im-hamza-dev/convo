import { extendTheme } from "@chakra-ui/react";

const convoTheme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
  colors: {
    brand: {
      vlightBg: "#2a3942",
      lightBg: "#202c33",
      darkBg: "#111b21",
      brightPrimary: "#00a884", //brightGreen
      primary: "#005d4b", //green
      primaryText: "white",
      secondaryText: "#D6D6D6",
    },
  },
});

export { convoTheme };
