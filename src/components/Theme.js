import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#f1e4f4',
    },
  },
}));

export default theme;
