import { createTheme } from "@mui/material/styles";
import { Colors } from "./colors";
import { typography } from "./typography";

export const theme = createTheme({
  palette: Colors,
  typography: typography('"IBM Plex Sans", sans-serif'),
  spacing: 8,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },

});

