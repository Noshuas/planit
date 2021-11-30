import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

const LoginNav = ({ currentPage }) => {
  const links = [
    {
      href: '/login',
      label: 'Log in',
    },
    {
      href: '/signup',
      label: 'Sign up',
    }];

  // map through our array of link info
  const linksHTML = links.map(({ label, href }) => {
    if (currentPage === href) {
      return <h3 key={`link_${label}`}>{label}</h3>;
    }
    return (
      <Link key={`link_${label}`} href={href}>
        <a href={href}><h3>{label}</h3></a>
      </Link>
    );
  });

  return (
    <div className={styles.navContainer}>
      {linksHTML}
    </div>
  );
};

export default LoginNav;
