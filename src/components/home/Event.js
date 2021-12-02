/* eslint-disable no-undef */
/* eslint-disable camelcase */
import clsx from 'clsx';
import React from 'react';
import { useRouter } from 'next/router';
import { Share, ExpandMore, Edit } from '@material-ui/icons';
import {
  Card, CardContent, CardMedia, Typography,
  makeStyles, CardActions, Collapse, IconButton,
} from '@material-ui/core';

import { copyInviteLink } from '../helpers';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '800px',
  },
  cardContent: {
    padding: '1em',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Event = ({
  name, description, _id, photo_url: photo,
}) => {
  const router = useRouter();

  // const {
  //   name, description, owner, location, duration, status, time, window, rsvps, _id, photo_url,
  // } = props;

  console.log(photo);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card color="primary" className={classes.card}>
      {photo && (
      <CardMedia
        image={photo}
      />
      )}
      <CardContent className={classes.cardContent}>
        <Typography
          variant="h4"
          color="inherit"
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          {/* copyInviteLink returns a click handler */}
          <Share onClick={copyInviteLink(_id)} />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => { router.push(`/event/${_id}`); }}>
          <Edit />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Event;
