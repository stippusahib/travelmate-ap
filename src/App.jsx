import React, { useState, useMemo, useEffect, useRef } from 'react';
import './App.css';
import travelData from './data.json';

// --- Helper Functions & Constants ---
const modeLogos = { 'Bus': '/bus.png', 'Train': '/train.png', 'Car': '/uber.png', 'Auto': '/uber.png', 'Flight': '/plane.png', 'Metro': '/metro.png', 'Default': '/logo.png' };

const parseDuration = (timeStr) => {
    if (!timeStr) return 0;
    let totalMinutes = 0;
    const hoursMatch = timeStr.match(/(\d+)\s*h/);
    const minutesMatch = timeStr.match(/(\d+)\s*m/);
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);
    return totalMinutes;
};

// --- Child Components ---

const LoadingScreen = () => (
    <div className="loading-screen">
        <img src="/logo.png" alt="Loading..." />
    </div>
);

const AutocompleteInput = ({ value, onChange, placeholder, label, allLocations }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);

    const suggestions = useMemo(() => {
      if (!value) return allLocations;
      return allLocations.filter(loc => loc.toLowerCase().startsWith(value.toLowerCase()));
    }, [value, allLocations]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setShowSuggestions(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (suggestion) => {
        onChange(suggestion);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex > -1) handleSelect(suggestions[highlightedIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setHighlightedIndex(-1);
        }
    };

    return (
<<<<<<< HEAD
        <div className={input-group ${showSuggestions ? 'is-active' : ''}} ref={wrapperRef}>
=======
        // FIX: Wrapped the className expression in backticks (`) to create a valid template literal
        <div className={`input-group ${showSuggestions ? 'is-active' : ''}`} ref={wrapperRef}>
>>>>>>> b0226e92aed8d99a4f30403401b1198ed1182920
            <label>{label}</label>
            <div className="input-wrapper">
                <input
                    type="text" value={value}
                    onChange={(e) => { onChange(e.target.value); if (!showSuggestions) setShowSuggestions(true); setHighlightedIndex(-1); }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder} className="search-input" autoComplete="off"
                />
                <span className={input-arrow ${showSuggestions ? 'open' : ''}} onClick={() => setShowSuggestions(!showSuggestions)}>&#9660;</span>
            </div>
            {showSuggestions && (
                <div className="autocomplete-suggestions">
                    {suggestions.map((s, i) => (
                        <div key={i} className={suggestion-item ${i === highlightedIndex ? 'highlighted' : ''}} onClick={() => handleSelect(s)} onMouseOver={() => setHighlightedIndex(i)}>
                            {s}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

<<<<<<< HEAD
const FilterControls = ({ onSort, currentSort, onToggleEco, isEco }) => ( 
    <div className="filter-controls"> 
        <button onClick={() => onSort('cost')} className={filter-button ${currentSort === 'cost' ? 'active' : ''}}>Cheapest</button> 
        <button onClick={() => onSort('time')} className={filter-button ${currentSort === 'time' ? 'active' : ''}}>Fastest</button> 
        <button onClick={onToggleEco} className={filter-button ${isEco ? 'active' : ''}}>Eco-Friendly</button> 
    </div> 
=======
const FilterControls = ({ onSort, currentSort, onToggleEco, isEco }) => (
    <div className="filter-controls">
        <button onClick={() => onSort('cost')} className={`filter-button ${currentSort === 'cost' ? 'active' : ''}`}>Cheapest</button>
        <button onClick={() => onSort('time')} className={`filter-button ${currentSort === 'time' ? 'active' : ''}`}>Fastest</button>
        <button onClick={onToggleEco} className={`filter-button ${isEco ? 'active' : ''}`}>Eco-Friendly</button>
    </div>
>>>>>>> b0226e92aed8d99a4f30403401b1198ed1182920
);

const SearchForm = ({ onSearch, allLocations, onSort, currentSort, onToggleEco, isEco, showFilters }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [journeyDate, setJourneyDate] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); onSearch(from, to); };
    const handleSwap = () => { setFrom(to); setTo(from); };

    useEffect(() => {
        const today = new Date();
        const offset = today.getTimezoneOffset();
        const localDate = new Date(today.getTime() - (offset*60*1000));
        setJourneyDate(localDate.toISOString().split('T')[0]);
    }, []);

    return (
        <section className="form-section">
            <form onSubmit={handleSubmit}>
                <div className="search-form-grid">
                    <AutocompleteInput label="From" value={from} onChange={setFrom} placeholder="Select departure city" allLocations={allLocations} />
                    <button type="button" className="swap-button" onClick={handleSwap} title="Swap locations">&#8644;</button>
                    <AutocompleteInput label="To" value={to} onChange={setTo} placeholder="Select arrival city" allLocations={allLocations} />
                </div>
                <div className="date-picker-grid">
                     <div className="input-group">
                        <label>Journey Date</label>
                        <input
                            type="date"
                            value={journeyDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setJourneyDate(e.target.value)}
                            className="search-input"
                        />
                     </div>
                </div>
                <button type="submit" className="search-button">Search Routes</button>
                {showFilters && ( <FilterControls onSort={onSort} currentSort={currentSort} onToggleEco={onToggleEco} isEco={isEco} /> )}
            </form>
        </section>
    );
};

const handleImageError = (e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; };

<<<<<<< HEAD
const ResultCard = ({ result }) => ( 
    <div className="result-card"> 
        <div className="card-content"> 
            <img src={modeLogos[result.mode] || modeLogos['Default']} alt={result.mode} className="provider-logo" onError={handleImageError} /> 
            <div className="trip-details"> 
                {/* ENHANCEMENT: Display the specific name (e.g., train name) if available */}
                <div className="mode">{result.name || result.mode}</div> 
                <div className="sub">{result.name ? ${result.mode} • ${result.provider} : result.provider}</div> 
            </div> 
            <div className="trip-meta"> 
                <div className="time">{result.time}</div> 
                <div className="cost">&#8377;{result.cost}</div> 
                <button className="book-button">Book Now</button> 
            </div> 
        </div> 
    </div> 
=======
const ResultCard = ({ result }) => (
    <div className="result-card">
        <div className="card-content">
            <img src={modeLogos[result.mode] || modeLogos['Default']} alt={result.mode} className="provider-logo" onError={handleImageError} />
            <div className="trip-details">
                <div className="mode">{result.name || result.mode}</div>
                <div className="sub">{result.name ? `${result.mode} • ${result.provider}` : result.provider}</div>
            </div>
            <div className="trip-meta">
                <div className="time">{result.time}</div>
                <div className="cost">&#8377;{result.cost}</div>
                <button className="book-button">Book Now</button>
            </div>
        </div>
    </div>
>>>>>>> b0226e92aed8d99a4f30403401b1198ed1182920
);

const MultiLegResultCard = ({ result }) => (
    <div className="multi-leg-card">
        <div className="multi-leg-header">
            <h3>Connected Trip Plan</h3>
            <div className="multi-leg-summary">
                <span>Total Time: {result.totalTime}</span>
                <span>Total Cost: &#8377;{result.totalCost}</span>
            </div>
        </div>
        <div className="multi-leg-body">
            {result.legs.map((leg, index) => (
                <div className="leg" key={index}>
                    <img src={modeLogos[leg.mode] || modeLogos['Default']} alt={leg.mode} className="provider-logo" onError={handleImageError} />
                    <div className="trip-details">
                        <div className="mode">{leg.from} &rarr; {leg.to}</div>
                        <div className="sub">{leg.mode} via {leg.provider}</div>
                    </div>
                    <div className="trip-meta">
                        <div className="time">{leg.time}</div>
                        <div className="cost">&#8377;{leg.cost}</div>
                        {leg.mode !== 'Auto' && <button className="book-button">Book Now</button>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [isLightMode, setIsLightMode] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [ecoFriendlyOnly, setEcoFriendlyOnly] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 750);
    }, []);

    useEffect(() => { document.body.classList.toggle('light-mode', isLightMode); }, [isLightMode]);

    const allLocations = useMemo(() => {
        const locations = new Set();
        travelData.forEach(route => {
            locations.add(route.from);
            locations.add(route.to);
            if(route.type === 'connected') {
                route.legs.forEach(leg => {
                    locations.add(leg.from);
                    locations.add(leg.to);
                });
            }
        });
        return Array.from(locations).sort();
    }, []);

    const handleSearch = (from, to) => {
        const fromQuery = from.toLowerCase().trim();
        const toQuery = to.toLowerCase().trim();
        const foundRoute = travelData.find(r => r.from.toLowerCase() === fromQuery && r.to.toLowerCase() === toQuery);
        setResults(foundRoute || { type: 'none' });
        setSortBy(null);
        setEcoFriendlyOnly(false);
    };

    const handleSort = (key) => { setSortBy(prev => (prev === key ? null : key)); };

    const displayedResults = useMemo(() => {
        if (!results || results.type !== 'direct') { return results; }
        let processedOptions = [...results.options];
        if (ecoFriendlyOnly) { processedOptions = processedOptions.filter(opt => opt.ecoFriendly); }
        if (sortBy === 'cost') { processedOptions.sort((a, b) => a.cost - b.cost); }
        else if (sortBy === 'time') { processedOptions.sort((a, b) => parseDuration(a.time) - parseDuration(b.time)); }
        return { ...results, options: processedOptions };
    }, [results, sortBy, ecoFriendlyOnly]);

    const renderResults = () => {
        if (!displayedResults) return null;
        switch (displayedResults.type) {
            case 'direct': return displayedResults.options.map((option, index) => <ResultCard key={index} result={option} />);
            case 'connected': return <MultiLegResultCard result={displayedResults} />;
            case 'none': return <div className="result-card"><div className="card-content" style={{display:'block', color: 'var(--text-color)'}}>No direct or connected routes found for this journey.</div></div>;
            default: return null;
        }
    };

    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
        <div className="app-container">
            <button className="theme-switcher" onClick={() => setIsLightMode(!isLightMode)} title="Toggle Theme"> {isLightMode ? '🌙' : '☀'} </button>
            <header className="app-header"> <img src="/logo.png" alt="TravelMate Logo" className="app-logo"/> </header>
            <main>
                <SearchForm
                    onSearch={handleSearch}
                    allLocations={allLocations}
                    onSort={handleSort}
                    currentSort={sortBy}
                    onToggleEco={() => setEcoFriendlyOnly(prev => !prev)}
                    isEco={ecoFriendlyOnly}
                    showFilters={results && results.type === 'direct'}
                />
                {results && (
                    <section className="results-section">
                        <h2>Available Options</h2>
                        <div className="results-container"> {renderResults()} </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;