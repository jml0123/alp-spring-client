import { sizing } from "@material-ui/system";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let ListItemStyle = createMuiTheme({
  typography: {
    h1: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      "@media (max-width:550px)": {
        fontSize: "1.1rem",
      },
    },
    h2: {
      fontSize: "1.1rem",
      "@media (max-width:550px)": {
        fontSize: "0.75rem",
      },
    },
    p: {
      fontSize: "1rem",
      "@media (max-width:550px)": {
        fontSize: "0.66rem",
      },
    },
  },
});
ListItemStyle = responsiveFontSizes(ListItemStyle);

export default ListItemStyle;
