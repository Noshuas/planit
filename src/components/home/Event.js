/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React from 'react';
import { useRouter } from 'next/router';
import { Share, ExpandMore, Edit } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Collapse,
  IconButton,
} from '@mui/material';
import { copyInviteLink } from '../helpers';

/*
{
  "_id" : ObjectId("61aeecfbdb33e6debebf5016"),
  "owner" : {
          "name" : "Noshua Setzer",
          "email" : "noshuas@gmail.com",
          "image" : "https://lh3.googleusercontent.com/a/AATXAJzDE-Y2ww4JKqrnjCv6jucwHiV9VEagSGxZJyaZ5g=s96-c"
  },
  "event" : {
          "name" : "The \"format the event\" event...",
          "status" : "pending",
          "description" : "I should probably provide something nice and bouncy here. There isn't likely to ever be anyone to actually fill out this entire text field, so we'll just have to do our best. \n\nI hope that this makes working with this data easy, and is quite pretty as well.",
          "location" : "my computer screen",
          "image" : "https://res.cloudinary.com/du60eiu3e/image/upload//c_fill,g_auto,h_150,w_1050/v1638853884/mpmusb4ngsvozaxcwmqs.jpg",
          "time" : {
                  "createdAt" : 1638853883450,
                  "time" : null,
                  "duration" : 7200,
                  "window" : {
                          "start" : "2021-12-06T08:00:00.000Z",
                          "end" : "2021-12-07T08:00:00.000Z"
                  }
          }
  },
  "attendees" : [ ]
}
*/
const Event = ({
  _id, owner, event, attendees
}) => {
  const { name, status, description, location, image, time } = event;

  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card color="primary">
      {image && (
        <CardMedia
          image={image}
        />
      )}
      <CardContent >
        <Typography
          variant="h4"
          color="inherit"
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" size="large">
          {/* copyInviteLink returns a click handler */}
          <Share onClick={copyInviteLink(_id)} />
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
