/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  Button,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Options from './Options';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large">
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

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

const SetTimeForm = ({ data, refeshData }) => {
  // console.log(data)
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const test = mockData.SingleEventData[1];
  const handleSetTime = (event) => {
    const setTime = new Date(event.target.innerText);
    // // put
    // var data = {
    const updateData = {
      updates: [
        {
          where: {
            property: '_id',
            value: data._id,
          },
          what: {
            method: '$set',
            field: 'time',
            value: setTime.toISOString(),
          },
        },
        {
          where: {
            property: '_id',
            value: data._id,
          },
          what: {
            method: '$set',
            field: 'status',
            value: 'confirmed',
          },
        },
      ],
    };
    const config = {
      method: 'put',
      url: 'http://localhost:3000/api/events',
      headers: {
        'Content-Type': 'application/json',
      },
      data: updateData,
    };
    axios(config).then(() => {
      setOpen(false);
      refeshData();
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" component="span" onClick={handleOpen}>
        Set Event Time
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Set Event Time
        </DialogTitle>
        <DialogContent>
          <Options data={data} handleSetTime={handleSetTime} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetTimeForm;
