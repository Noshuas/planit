import React from 'react';
import styles from '../../styles/Login.module.css';

export const LoginLayout = ({ children }) => (
  <div className={styles.parentContainer}>
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

