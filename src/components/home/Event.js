/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { Edit, ExpandMore, Share } from '@mui/icons-material';
import {
  Card, CardActions, CardContent,
  CardMedia, Collapse,
  IconButton, Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { copyInviteLink } from '../helpers';

const Event = ({
  _id, owner, info, attendees
}) => {
  const { title, description, location, imageUrl, time } = info;
  console.log(imageUrl);
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card color="primary">
      {imageUrl && (
        <CardMedia
          image={imageUrl}
          sx={{minHeight: '100px'}}
        />
      )}
      <CardContent >
        <Typography
          variant="h4"
          color="inherit"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" size="large" onClick={copyInviteLink(_id)}>
          {/* copyInviteLink returns a click handler */}
          <Share />
        </IconButton>
        <IconButton
          aria-label="edit"
          onClick={() => { router.push(`/event/${_id}`); }}
          size="large">
          <Edit />
        </IconButton>
        <IconButton
          // className={clsx(null, {
          //   [classes.expandOpen]: expanded,
          // })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="large">
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
