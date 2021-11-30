/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import axios from 'axios';
import { Image, Script } from 'next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button, Dialog, MuiDialogTitle, MuiDialogContent,
  Paper, Typography, makeStyles, withStyles,
  TextField,
} from '@material-ui/core/';

import styles from '../../../styles/invite-page.module.css';
import Availability from '../../../components/invite-page/Availability';

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
const DialogTitle = withStyles(modalStyles)(({
  children, classes, onClose, ...other
}) => (
  <MuiDialogTitle disableTypography className={classes.root} {...other}>
    <Typography variant="h6">{children}</Typography>
  </MuiDialogTitle>
));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const InvitePage = ({
  event, googleClientId, windowStart, windowEnd,
}, ...props) => {
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
    console.log(avail);
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

  const handleClose = (e, newAvail) => {
    setOpen(false);
    setAvail(newAvail ?? avail);
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
  console.log('the error is on line 323');
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
