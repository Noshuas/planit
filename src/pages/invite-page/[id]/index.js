/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import axios from 'axios';
import React, { useState } from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
// import CloseIcon from '@material-ui/icons/Close';
// import IconButton from '@material-ui/core/IconButton';
// import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
// import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { shadows } from '@material-ui/system';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

// import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from '../../../styles/invite-page.module.css';
import Availability from '../../../components/Availability';

const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const useStyles = makeStyles({
  button: {
    width: '100%',
    margin: '10px 0 5px 0',
    '&:hover': {
      color: 'white',
    },
  },
  input: {
    margin: '5px 0 5px 0',
    width: '100%',
  },
});

const modalStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// RSVP Confirmation Modal window
const DialogTitle = withStyles(modalStyles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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

const InvitePage = function ({
  event, googleClientId, windowStart, windowEnd,
}, ...props) {
  event = event[0];

  const classes = useStyles();
  const [avail, setAvail] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(false);
  const [rsvp, setRsvp] = useState(false);
  const { status } = event;

  const { register, handleSubmit, formState: { errors } } = useForm({
    revalidateMode: 'onSubmit',
    shouldUseNativeValidation: true,
  });

  const onSubmit = (data) => {
    if (avail.length === 0 && status === 'pending') {
      alert('Please provide your availability!');
    } else {
      let updates;
      if (status === 'pending') {
        data.availability = avail;
        updates = [{
          where: {
            property: '_id',
            value: event._id,
          },
          what: {
            field: 'rsvps',
            method: '$push',
            value: data,
          },
        }];
      } else {
        updates = [{
          where: {
            property: '_id',
            value: event._id,
          },
          what: {
            field: 'rsvps',
            method: '$push',
            value: data,
          },
        }];
      }
      axios.put('/api/events', { updates })
        .then(() => {
          setRsvp(true);
          setConfirmed(true);
        })
        .catch((err) => console.error(err));
    }
  };

  // Event time helper functions
  const getDay = (date) => {
    date = date.substring(10, 8);
    if (date[0] === '0') {
      return date[1];
    }
    return date;
  };

  const getMonth = (date) => {
    date = new Date(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;
    return month(date);
  };

  const day = getDay(event.window.start);
  const month = getMonth(event.window.start);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e, timeSlots) => {
    setOpen(false);
    setAvail(timeSlots);
  };

  const handleRSVPClose = () => {
    setRsvp(false);
  };

  return (
    <div className={styles.window}>

      <Dialog onClose={handleRSVPClose} aria-labelledby="rsvp-confirmed-title" open={rsvp}>
        <DialogTitle id="rsvp-confirmed-title" onClose={handleRSVPClose}>
          RSVP Confirmed!
        </DialogTitle>
        {status === 'pending'
        && (
        <DialogContent dividers>
          <Typography gutterBottom>
            Your availability for
            {' '}
            <b>{event.name}</b>
            {' '}
            has been sent to
            {' '}
            <b>{event.owner}</b>
            .
          </Typography>
          <Typography gutterBottom>
            Please close this window.
          </Typography>
        </DialogContent>
        )}
        {status === 'confirmed'
          && (
          <DialogContent dividers>
            <Typography gutterBottom>
              You will be attending
              {' '}
              <b>{event.name}</b>
              {' '}
              on
              {' '}
              <b>
                {month}
                {' '}
                {day}
              </b>
              .
            </Typography>
            <Typography gutterBottom>
              Please close this window.
            </Typography>
          </DialogContent>
          )}
      </Dialog>

      <div className={styles.container}>
        <Script src="https://apis.google.com/js/api.js" strategy="beforeInteractive" />
        <Image
          src={event.photo_url || sampleImg}
          className={styles.photo}
          layout="responsive"
          height={144}
          width={1050}
          alt="event-image"
        />

        {status === 'confirmed'
          && (
          <Paper className={styles.date_box} Papershadow={3}>
            <div className={styles.date_banner} />
            <div className={styles.date}>{day}</div>
          </Paper>
          )}

        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.details}>
              <Paper className={styles.header} PaperShadow={3}>
                <div className={styles.invite_title}>
                  {event.owner}
                  {' '}
                  invites you to join
                  {' '}
                  {event.name}
                  !
                </div>
                <div className={styles.subtitle}>
                  {status === 'pending'
                  && <div className={styles.status}>Pending</div>}
                  <div>{event.location}</div>
                </div>
              </Paper>
              <Paper className={styles.description} PaperShadow={3}>
                {event.description}
              </Paper>
            </div>
          </div>

          <Paper className={styles.form} PaperShadow={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField disabled={confirmed} id="outlined-basic" label="Name" variant="outlined" className={classes.input} {...register('name', { required: true })} />

              {errors.name && errors.name.type === 'required'
              && <div className={styles.error}>Please enter your name.</div>}

              <TextField disabled={confirmed} id="outlined-basic" label="Email" variant="outlined" type="email" className={classes.input} {...register('email', { required: true })} />

              {errors.email && errors.email.type === 'required'
              && <div className={styles.error}>Please enter your email.</div>}

              {status === 'pending'
              && <Button disabled={confirmed} variant="contained" className={classes.button} onClick={handleOpen}>Add Availability</Button>}
              <Availability
                disabled={confirmed}
                googleClientId={googleClientId}
                windowStart={windowStart}
                windowEnd={windowEnd}
                handleClose={handleClose}
                handleClickOpen={handleOpen}
                open={open}
              />
              <Button disabled={confirmed} type="submit" variant="contained" className={classes.button}>RSVP</Button>
            </form>
          </Paper>

        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const eventData = JSON.stringify({
    options: {
      count: 1,
      where: {
        property: '_id',
        value: context.params.id,
      },
    },
  });

  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/events',
    headers: {
      'Content-Type': 'application/json',
    },
    data: eventData,
  };

  const response = await axios(config);
  const { data } = response;

  if (!data || data.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      event: data,
      googleClientId: process.env.GOOGLE_CLIENT_ID || null,
      windowStart: data[0].window.start,
      windowEnd: data[0].window.end,
    },
  };
}

export default InvitePage;
