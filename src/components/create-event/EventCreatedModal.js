/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
  Typography,
} from '@mui/material';

export const EventCreatedModal = ({ setConfirmed, confirmed, form }) => {

  return (
    <Dialog onClose={()=>setConfirmed(false)} aria-labelledby="created-title" open={confirmed}>
      <DialogTitle id="created-title" onClose={()=>setConfirmed(false)}>
        <Typography variant="h6">Event Created</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Event:
          {' '}
          <b>{form.name}</b>
          {' '}
          will be held at
          {' '}
          <b>{form.location}</b>
          !
        </Typography>
        <Typography gutterBottom>
          Please send the invitation to your guests now.
        </Typography>
        <Button><Link href="/home">Return Home</Link></Button>
      </DialogContent>
    </Dialog>
  )
}