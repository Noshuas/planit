import React from 'react';
import {
  withStyles,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider } from '@material-ui/styles';
import Theme from '../Theme'; // need to take a look
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// eslint-disable-next-line react/function-component-definition
export default function Availability({
  handleClose, open, googleClientId, windowStart, windowEnd,
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
