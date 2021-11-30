import React from 'react';
import helpers from './tempHelp';
import OptionsButton from './OptionsButton';
import styles from '../../styles/Event.module.css';

const Options = ({ handleSetTime, data }) => {
  const availability = helpers.CheckAvail(data.window, data.rsvps, data.duration / 3600);
  const rsvpNum = data.rsvps.length;
  const temp = Object.keys(availability).sort((a, b) => b - a);
  if (temp.length === 0) {
    return (
      <span>No one can attend the event, try decreasing the length or wait for more RSVPs</span>
    );
  }
  if (availability[rsvpNum]) {
    return (
      <>
        <span className={styles.info}>All RSVPers can attend at: </span>
        <div className={styles.buttonlist}>
          {availability[rsvpNum].map((time) => (
            <OptionsButton time={time} key={time} handleSetTime={handleSetTime} />
          ))}
        </div>
      </>
    );
  }
  if (temp.length < 2) {
    return (
      <>
        <div className={styles.info}>
          <p>
            {rsvpNum}
            {' '}
            people have responded to the event!
          </p>
          <span>
            {' '}
            {temp[0]}
            {' '}
            can make it at:
          </span>
        </div>
        <div className={styles.buttonlist}>

          {availability[temp[0]].map((time) => (
            <OptionsButton time={time} key={time} handleSetTime={handleSetTime} />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.info}>
        <p>
          {rsvpNum}
          {' '}
          people have responded to the event!
        </p>
        <span>
          {' '}
          {temp[0]}
          {' '}
          can make it at:
        </span>
      </div>

      <div className={styles.buttonlist}>
        {availability[temp[0]].map((time) => (
          <OptionsButton time={time} key={time} handleSetTime={handleSetTime} />
        ))}
      </div>

      <span className={styles.info}>
        {' '}
        {temp[1]}
        {' '}
        can make it at:
      </span>

      <div className={styles.buttonlist}>
        {availability[temp[1]].map((time) => (
          <OptionsButton time={time} key={time} handleSetTime={handleSetTime} />
        ))}
      </div>
    </>
  );
};

export default Options;
