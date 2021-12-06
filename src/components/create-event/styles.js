import makeStyles from '@mui/styles/makeStyles';


export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1050,
    margin: 'auto',
  },
  cardPhoto: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardInput: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  cardInputDescription: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    width: '100%',
  },
  cardInputContainer: {
    width: '100%',
  },
  textDescription: {
    width: '100%',
  },
  createButton: {
    marginTop: '20px',
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  sideIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  inputField: {
    marginBottom: '20px',
  },
  eventWindow: {
    display: 'flex',
    flexDirection: 'column',
    color: '#a2a2a2',
  },
}));
