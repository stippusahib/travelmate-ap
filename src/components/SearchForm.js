import React, { useState, useMemo, useRef, useEffect } from 'react';
import travelData from '../data.json'; // Import the data source

/**
 * Renders a search form with autocomplete, swap, and filter/sort buttons.
 * @param {object} props - The component props.
 * @param {Function} props.onSearch - Callback for form submission.
 * @param {Function} props.onSortByCost - Callback for sorting by cost.
 * @param {Function} props.onSortByTime - Callback for sorting by time.
 * @param {Function} props.onToggleEcoFriendly - Callback for toggling eco-friendly filter.
 */
const SearchForm = ({
  onSearch,
  onSortByCost,
  onSortByTime,
  onToggleEcoFriendly,
}) => {
  // State for input values
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // State for autocomplete suggestions
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);
  
  const searchFormRef = useRef(null);

  // Memoize the unique list of all locations
  const allLocations = useMemo(() => {
    const locations = new Set();
    travelData.forEach(route => {
      locations.add(route.from);
      locations.add(route.to);
    });
    return Array.from(locations);
  }, []);
  
  // Effect to handle clicks outside the form to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
        setIsFromFocused(false);
        setIsToFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'from') {
      setFrom(value);
      if (value.length >= 2) {
        const filtered = allLocations.filter(loc =>
          loc.toLowerCase().includes(value.toLowerCase())
        );
        setFromSuggestions(filtered);
      } else {
        setFromSuggestions([]);
      }
    } else {
      setTo(value);
      if (value.length >= 2) {
        const filtered = allLocations.filter(loc =>
          loc.toLowerCase().includes(value.toLowerCase())
        );
        setToSuggestions(filtered);
      } else {
        setToSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (suggestion, field) => {
    if (field === 'from') {
      setFrom(suggestion);
      setFromSuggestions([]);
      setIsFromFocused(false);
    } else {
      setTo(suggestion);
      setToSuggestions([]);
      setIsToFocused(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ from, to });
    setFromSuggestions([]);
    setToSuggestions([]);
  };

  const handleSwap = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
  };

  return (
    <div ref={searchFormRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="autocomplete-wrapper">
          <input
            type="text"
            name="from"
            className="search-input"
            placeholder="From"
            value={from}
            onChange={(e) => handleInputChange(e, 'from')}
            onFocus={() => setIsFromFocused(true)}
            autoComplete="off"
            required
          />
          {isFromFocused && fromSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {fromSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion, 'from')}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="swap-button"
          onClick={handleSwap}
          aria-label="Swap from and to locations"
        >
          ⇄
        </button>

        <div className="autocomplete-wrapper">
          <input
            type="text"
            name="to"
            className="search-input"
            placeholder="To"
            value={to}
            onChange={(e) => handleInputChange(e, 'to')}
            onFocus={() => setIsToFocused(true)}
            autoComplete="off"
            required
          />
          {isToFocused && toSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {toSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion, 'to')}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="filter-controls">
        <button type="button" className="filter-button" onClick={onSortByCost}>
          Sort by Cost
        </button>
        <button type="button" className="filter-button" onClick={onSortByTime}>
          Sort by Time
        </button>
        <button type="button" className="filter-button" onClick={onToggleEcoFriendly}>
          Show Eco-Friendly Only
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
