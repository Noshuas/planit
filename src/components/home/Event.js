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

  const copyToClipBoard = () => {
    const link = document.createElement('input');
    document.body.appendChild(link);
    link.value = `http://localhost:3000/invite-page/${_id}`;
    link.focus();
    link.select();
    const result = document.execCommand('copy');
    if (result) {
      console.log('success');
      link.remove();
    }
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
          <Share onClick={copyToClipBoard} />
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
