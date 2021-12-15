/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { Edit, ExpandMore, Share } from '@mui/icons-material';
import {
  Card, CardActions, CardContent,
  CardMedia, Collapse,
  IconButton, Tooltip, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { copyInviteLink } from '../helpers';

const Event = function ({ _id, info }) {
  const { title, description, imageUrl } = info;
  const router = useRouter();

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <Tooltip title='Copy Invite Link'>
          <IconButton onClick={copyInviteLink(_id)}>
            <Share />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" >
          <IconButton onClick={() => { router.push(`/event/${_id}`); }}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Expand" >
          <IconButton onClick={handleExpandClick}>
            <ExpandMore />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse in={expanded}>
        <CardContent>
          <Typography variant="body1">
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Event;
