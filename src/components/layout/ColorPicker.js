import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import IconButton from '@material-ui/core/IconButton';
import {
  red, orange, yellow, green, blue, purple,
} from '@material-ui/core/colors';
import FlareIcon from '@material-ui/icons/Flare';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Theme from '../../themes/theme';
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
            <ListItem button key={Math.random()} onClick={() => { setColor(text); }}>
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
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer()}>
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
