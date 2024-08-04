import { extendTheme } from "@chakra-ui/react";

const convoTheme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand.vlightBg",
      },
    },
  },
  colors: {
    brand: {
      lightBlurBg:'rgba(29, 31, 43, 0.4)',
      vlightBg: "#6884ff",
      lightBg: "#252837",
      darkBg: "#1d1f2b",
      brightPrimary: "#6884ff", //brightGreen
      primary: "#6884ff", //green
      primaryText: "white",
      secondaryText: "#D6D6D6",
    },
  },
});

export { convoTheme };
