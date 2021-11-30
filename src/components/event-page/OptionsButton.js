import Button from '@material-ui/core/Button';
import React from 'react';
import styles from '../../styles/Event.module.css';

const OptionsButton = ({ time, handleSetTime }) => {
  const parsedTime = new Date(parseInt(time, 10));
  return (
    <Button value={time} variant="contained" component="span" className={styles.test} onClick={handleSetTime}>
      {parsedTime.toLocaleString()}
    </Button>
  );
};

export default OptionsButton;
