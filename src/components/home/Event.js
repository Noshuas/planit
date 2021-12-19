/* eslint-disable no-undef */
/* eslint-disable camelcase */

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Share from '@mui/icons-material/Share'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import EventHeader from 'components/invite-page/EventHeader';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { copyInviteLink } from '../helpers';

const Event = function ({ _id, info, i, removeEvent }) {
  const { title, description, imageUrl } = info;
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteEvent = () => {
    const isSerious = confirm('Are you sure you want to delete this event?\n\nThis action is irreversible and will affect you and anyone you\'ve invited to the event.')

    if (isSerious)
      axios.delete('/api/events', {data: { id: _id }})
        .then(() => { removeEvent(i) })
        .catch(console.log)
  }

  return (
    <Card color="primary">
      <CardMedia
        image={imageUrl}
        sx={{ minHeight: '100px' }}
      />
      <CardContent>
        <Typography variant="h5">
          {title}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip title="Edit" >
          <IconButton onClick={() => { router.push(`/event/${_id}`); }}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title='Copy Invite Link'>
          <IconButton onClick={copyInviteLink(_id)}>
            <Share />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" >
          <IconButton onClick={deleteEvent}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Expand" >
          <IconButton onClick={handleExpandClick}>
            <ExpandMore />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse in={expanded}>
        <EventHeader {...info} />
        <Card>
          <CardContent>
            <Typography variant="body1">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Collapse>
    </Card>
  );
};

export default Event;
