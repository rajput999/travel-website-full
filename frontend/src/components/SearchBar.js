import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styles from './SearchBar.module.css';

const useGoogleMapsScript = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        setLoaded(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return loaded;
};

const carOptions = ['Sedan', 'SUV', 'Truck', 'Convertible', 'Coupe', 'Minivan'];

const SearchBar = () => {
  const isLoaded = useGoogleMapsScript();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [selectedCar, setSelectedCar] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectFrom = async (address) => {
    setFrom(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected From:', address, latLng);
  };

  const handleSelectTo = async (address) => {
    setTo(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected To:', address, latLng);
  };

  const estimate = () => {
    // Placeholder logic for estimation, replace with actual logic
    const distance = '100 miles';
    const price = '$150';
    setEstimatedDistance(distance);
    setEstimatedPrice(price);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.fullSearch}>
      <div className={styles.searchBar}>
        <div className={styles.inputGroup}>
          <label>From:</label>
          <PlacesAutocomplete
            value={from}
            onChange={setFrom}
            onSelect={handleSelectFrom}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: 'Enter departure location' })} />
                <div className={styles.autocompleteDropdown}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? styles.suggestionItemActive : styles.suggestionItem;
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className={styles.inputGroup}>
          <label>To:</label>
          <PlacesAutocomplete
            value={to}
            onChange={setTo}
            onSelect={handleSelectTo}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: 'Enter destination location' })} />
                <div className={styles.autocompleteDropdown}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? styles.suggestionItemActive : styles.suggestionItem;
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className={styles.inputGroup}>
          <label>Date:</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="dd/mm/yyyy"
          />
        </div>
        <div className={styles.inputGroup} ref={dropdownRef}>
          <label>Car Type:</label>
          <div className={styles.autocompleteDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={toggleDropdown}
              aria-expanded={showDropdown}
              aria-haspopup="true"
            >
              {selectedCar ? selectedCar : 'Select a car'}
            </button>
            <div className={`${styles.dropdownList} ${showDropdown ? styles.show : styles.hide}`}>
              {carOptions.map((car) => (
                <div
                  key={car}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setSelectedCar(car);
                    setShowDropdown(false);
                  }}
                >
                  {car}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.searchBar2}>
        <div className={styles.estimate}>
          <button className={styles.estimateButton} onClick={estimate}>
            Estimate
          </button>
        </div>
        <div className={styles.inputGroup}>
          <input value={estimatedDistance} placeholder="Estimated Distance" readOnly />
        </div>
        <div className={styles.inputGroup}>
          <input value={estimatedPrice} placeholder="Estimated Price" readOnly />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
