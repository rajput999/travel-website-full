import React from 'react';
import styles from './PopularDestinationsCard.module.css';

const Card = ({ destination }) => {
  return (
    <div className={styles.card}>
      <img src={destination.image} alt={destination.name} className={styles.image} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.id}>{destination.id < 10 ? `0${destination.id}` : destination.id}</h3>
          <span className={styles.dot}></span>
        </div>
        <p className={styles.name}>{destination.name}</p>
      </div>
    </div>
  );
}

export default Card;
