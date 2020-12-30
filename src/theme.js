import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto'
  },
  palette: {
    text: {
      primary: 'black',
      secondary: 'black'
    },
    primary: {
      main: '#f3f1f2',
    },
    secondary: {
      main: '#f3f1f2',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#4867aa',
    },
  },
});

export default theme;
