import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>Travel.</div>
      <nav className={isOpen ? styles.open : ''}>
        <ul>
          <Link to='/'><li>Home</li></Link>
          <li>Packages</li>
          <li>About</li>
          <li>Pages</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div>
        <Link to='signup'>
          <button className={styles.signUp}>Sign Up</button>
        </Link>
        <button className={styles.bookNow}>BOOK NOW</button>
      </div>
      
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
};

export default Navbar;
