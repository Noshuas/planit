import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import IconButton from '@mui/material/IconButton';
import {
  red, orange, yellow, green, blue, purple,
} from '@mui/material/colors';
import FlareIcon from '@mui/icons-material/Flare';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Theme from '../themes/theme';
import PlanitIcon from './PlanitIcon';

const useStyles = makeStyles({
  list: {
    width: 75,
  },
  fullList: {
    width: 'auto',
  },
  light: { fill: '#000' },
  dark: { fill: '#000' },
  red: { fill: red.A700 },
  orange: { fill: orange.A700 },
  yellow: { fill: yellow.A700 },
  green: { fill: green.A700 },
  blue: { fill: blue.A700 },
  violet: { fill: purple.A700 },
});

// eslint-disable-next-line react/function-component-definition
const ColorPicker = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);
  const { setColor } = useContext(Theme);

  const toggleDrawer = () => (event) => {
    if (event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!isOpen);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {['light', 'dark', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'].map((text, index) => (
          <>
            <ListItem button key={text} onClick={() => { setColor(text); }}>
              <ListItemIcon>
                {text === 'light' && <FlareIcon className={classes[text]} fontSize="large" />}
                {text === 'dark' && <Brightness3Icon className={classes[text]} fontSize="large" />}
                {index > 1 && <CheckBoxOutlineBlankRoundedIcon className={classes[text]} fontSize="large" />}
              </ListItemIcon>
              <br />
              <br />
              <br />
            </ListItem>
            <Divider varient="middle" key={text} light />
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer()}
        size="large"
      >
        <PlanitIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
        color="Inherit"
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default ColorPicker;
