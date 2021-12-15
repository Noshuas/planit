import React from 'react';
import styles from '../../styles/Login.module.css';

export var LoginLayout = function ({ children }) {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};
