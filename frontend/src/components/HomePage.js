import React from 'react';
import styles from './HomePage.module.css';
import SearchBar from './SearchBar';
import backimg from '../images/background.jpg';
import PopularDestinations from './PopularDestinations';
import RecommendedPlaces from './RecommendedPlaces';

const HomePage = () => {
  return (
    <div className={styles.fullhome}>
      <div className={styles.home}>
        <div className={styles.upperhome}>
          <img src={backimg} className={styles.img} alt="background" />
          <div className={styles.centeredText}>
            <div className={styles.title}>
              PLAN YOUR TRIP WITH LAXMAN TOUR AND TRAVELS
            </div>

          </div>
        </div>
        <div className={styles.lowerhome}>
          {/* Empty div to allow lowerhome to take space */}
        </div>
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.popularDestination}>
        <RecommendedPlaces />
      </div>

      <div className={styles.popularDestination}>
        <PopularDestinations />
      </div>
    </div>

  );
}

export default HomePage;
