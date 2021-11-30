import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Theme from './Theme'; // need to take a look
// import style from '../styles/Availability.module.css';

import TimeBlock from './TimeBlock';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#f1e4f4',
    textAlign: 'center',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Dialog = withStyles(() => ({
  paper: {
    width: '100%',
  },
}))(MuiDialog);

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography component="span" variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

console.log('in Availability.js')

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// eslint-disable-next-line react/function-component-definition
export default function Availability({
  handleClose,
  open,
  googleClientId,
  windowStart,
  windowEnd,
}) {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <Dialog
          maxWidth="xl"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add Availability
          </DialogTitle>
          <DialogContent>
            <TimeBlock
              googleClientId={googleClientId}
              onClose={handleClose}
              windowStart={windowStart}
              windowEnd={windowEnd}
            />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
