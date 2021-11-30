import React from 'react';
import styles from '../../styles/Login.module.css';

const LoginLayout = ({ children }) => (
  <div className={styles.parentContainer}>
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

export default LoginLayout;
