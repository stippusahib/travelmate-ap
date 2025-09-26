import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- Global Styles Component ---
// Injects all necessary CSS into the document's head for a self-contained component.
const GlobalStyles = () => {
  useEffect(() => {
    // The Font and full CSS are now embedded here.
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      
      :root {
        --primary-color: #5E5CE6;
        --primary-color-light: rgba(94, 92, 230, 0.15);
        --accent-color: #00C7BE;
        --accent-color-light: #00A9A1;
        --text-color: #FFFFFF;
        --text-color-dark: #222B45;
        --text-color-muted: #E0E0E0;
        --card-background: rgba(255, 255, 255, 0.1);
        --card-border: rgba(255, 255, 255, 0.25);
        --card-shadow: rgba(0, 0, 0, 0.1);
        --background-start: #191970;
        --background-end: #000033;
        --focus-shadow: rgba(94, 92, 230, 0.5);
      }
      
      body.light-mode {
        --primary-color: #0052D4;
        --primary-color-light: rgba(0, 82, 212, 0.1);
        --accent-color: #10B981;
        --accent-color-light: #0d8a6a;
        --text-color: #1A202C;
        --text-color-dark: #1A202C;
        --text-color-muted: #718096;
        --card-background: rgba(255, 255, 255, 0.8);
        --card-border: rgba(0, 0, 0, 0.1);
        --card-shadow: rgba(45, 55, 72, 0.1);
        --background-start: #F0F4F8;
        --background-end: #D9E2EC;
        --focus-shadow: rgba(0, 82, 212, 0.25);
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }
      
      body {
        font-family: 'Poppins', sans-serif;
        background-color: var(--background-start);
        background-image: linear-gradient(135deg, var(--background-start) 0%, var(--background-end) 100%);
        color: var(--text-color);
        line-height: 1.6;
        transition: background-color 0.3s ease, color 0.3s ease;
        overflow-x: hidden;
        min-height: 100vh;
      }

      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }

      .loading-screen { display: flex; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999; background: var(--background-start); }
      .loading-screen img { width: 250px; height: auto; animation: pulse 2s infinite ease-in-out; }

      .app-container { max-width: 800px; margin: 0 auto; padding: 24px; text-align: center; position: relative; }
      .app-header { display: block; margin-bottom: 32px; }
      .app-logo { height: 180px; width: auto; margin-bottom: 16px; }

      .theme-switcher { position: absolute; top: 32px; right: 32px; background: var(--card-background); backdrop-filter: blur(10px); border: 1px solid var(--card-border); color: var(--text-color); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; z-index: 100; }
      .theme-switcher:hover { background: rgba(0,0,0,0.2); transform: scale(1.1); }

      .form-section { background: var(--card-background); border-radius: 24px; padding: 32px; box-shadow: 0 10px 40px var(--card-shadow); text-align: left; animation: fadeInUp 0.5s ease; backdrop-filter: blur(15px); border: 1px solid var(--card-border); }
      .search-form-grid { display: grid; grid-template-columns: 1fr; gap: 0; margin-bottom: 16px; position: relative; }
      .input-group { position: relative; text-align: left; } 
      .input-group:first-of-type { margin-bottom: 32px; }
      .input-group label { display: block; font-weight: 500; font-size: 0.9rem; margin-bottom: 8px; color: var(--text-color-muted); }
      
      .input-wrapper { position: relative; }
      .search-input { width: 100%; padding: 14px 45px 14px 14px; font-size: 1rem; border: 1px solid var(--card-border); border-radius: 12px; background-color: var(--primary-color-light); color: var(--text-color); transition: all 0.2s ease-in-out; caret-color: var(--primary-color); }
      .search-input::placeholder { color: var(--text-color-muted); opacity: 0.7; }
      .search-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 4px var(--focus-shadow); }
      .input-arrow { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--text-color-muted); transition: transform 0.2s ease; font-size: 20px; }
      .input-arrow.open { transform: translateY(-50%) rotate(180deg); }

      .swap-button { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-top: -14px; height: 40px; width: 40px; cursor: pointer; border-radius: 50%; border: 1px solid var(--card-border); background: var(--card-background); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; z-index: 5; color: var(--text-color); }
      .swap-button:hover { transform: translate(-50%, -50%) rotate(180deg) scale(1.1); background: var(--primary-color); color: white; }
      
      .date-picker-grid { display: grid; grid-template-columns: 1fr; margin-bottom: 24px; }
      
      .search-button { width: 100%; padding: 16px; font-size: 1.1rem; font-weight: 600; color: #fff; background-image: linear-gradient(to right, var(--primary-color), var(--accent-color)); background-size: 200% auto; border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0, 0.2); }
      .search-button:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0, 0.3); }

      .filter-controls { display: flex; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--card-border); flex-wrap: wrap; }
      .filter-button { padding: 8px 16px; border: 1px solid var(--card-border); background: transparent; color: var(--text-color-muted); cursor: pointer; border-radius: 20px; transition: all 0.2s ease; font-weight: 500; }
      .filter-button:hover, .filter-button.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); transform: translateY(-2px); box-shadow: 0 2px 8px var(--focus-shadow); }
      
      .autocomplete-suggestions { animation: fadeInUp 0.2s ease; position: absolute; background: var(--card-background); backdrop-filter: blur(15px); border: 1px solid var(--card-border); border-radius: 12px; box-shadow: 0 8px 24px var(--card-shadow); max-height: 180px; overflow-y: auto; z-index: 100; width: 100%; margin-top: 8px; }
      .suggestion-item { padding: 14px 16px; cursor: pointer; text-align: left; color: var(--text-color); }
      .suggestion-item.highlighted, .suggestion-item:hover { background-color: var(--primary-color-light); }

      .results-section { margin-top: 40px; text-align: left; }
      .results-section h2 { font-size: 1.5rem; margin-bottom: 16px; color: var(--text-color); }
      .results-container { display: flex; flex-direction: column; gap: 16px; }

      .result-card, .multi-leg-card { background: var(--card-background); backdrop-filter: blur(10px); border-radius: 16px; box-shadow: 0 4px 16px var(--card-shadow); border: 1px solid var(--card-border); transition: all 0.3s ease; animation: fadeInUp 0.5s ease backwards; }
      .result-card:hover, .multi-leg-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px var(--card-shadow); border-color: var(--primary-color); }

      .card-content { display: grid; grid-template-columns: auto 1fr auto; align-items: center; padding: 16px; gap: 16px; }
      .provider-logo { width: 45px; height: 45px; object-fit: contain; flex-shrink: 0; border-radius: 12px; }

      .trip-details { text-align: left; }
      .trip-details .mode { font-weight: 600; font-size: 1.05rem; color: var(--text-color);}
      .trip-details .sub { font-size: 0.9rem; color: var(--text-color-muted); }
      .trip-meta { text-align: right; }
      .trip-meta .cost { font-weight: 700; font-size: 1.25rem; color: var(--accent-color); }
      .trip-meta .time { font-size: 0.9rem; color: var(--text-color-muted); margin-bottom: 8px; }

      .book-button { font-size: 0.9rem; font-weight: 600; color: #fff; background-color: var(--accent-color); border: none; border-radius: 8px; cursor: pointer; padding: 8px 16px; transition: all 0.2s ease; }
      .book-button:hover { background-color: var(--accent-color-light); transform: scale(1.05); }

      .multi-leg-header { padding: 16px 20px; border-bottom: 1px solid var(--card-border); }
      .multi-leg-header h3 { font-size: 1.2rem; text-align: left; color: var(--text-color); }
      .multi-leg-summary { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-color-muted); margin-top: 4px; }
      .multi-leg-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 16px; }

      .leg { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px; }

      @media (min-width: 768px) {
        .app-logo { height: 200px; }
        .search-form-grid { grid-template-columns: 1fr auto 1fr; }
        .input-group:first-of-type { margin-bottom: 0; }
        .swap-button { position: static; margin-top: 28px; transform: none; }
      }
      
      @media (max-width: 767px) {
        .app-header { margin-bottom: 16px; text-align: center; }
        .form-section { padding: 24px; }
        .search-form-grid { grid-template-columns: 1fr; grid-template-rows: auto auto auto; row-gap: 16px; }
        .input-group:nth-of-type(1) { grid-row: 1; margin-bottom: 0; }
        .swap-button { grid-row: 2; justify-self: center; margin: -24px 0; transform: none; }
        .swap-button:hover { transform: rotate(180deg) scale(1.1); }
        .input-group:nth-of-type(2) { grid-row: 3; }
        .card-content { grid-template-columns: 1fr; text-align: left; }
        .trip-meta { text-align: left; margin-top: 8px; }
        .leg { grid-template-columns: auto 1fr; row-gap: 8px; }
        .leg .trip-details, .leg .trip-meta { grid-column: 2; text-align: left; }
      }
    `;
    const styleElement = document.createElement('style');
    styleElement.id = 'app-styles';
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
    return () => { document.head.removeChild(styleElement); };
  }, []);
  return null;
};

// --- Mock Data (replace with fetch from data.json) ---
const travelData = [ { "type": "direct", "from": "Trivandrum", "to": "Kochi", "options": [ { "mode": "Train", "time": "3 hours 15 minutes", "cost": 150, "provider": "Indian Railways", "ecoFriendly": true }, { "mode": "Bus", "time": "5 hours", "cost": 300, "provider": "KSRTC", "ecoFriendly": true }, { "mode": "Flight", "time": "1 hour", "cost": 2200, "provider": "Air India", "ecoFriendly": false }, { "mode": "Car", "time": "4 hours 30 minutes", "cost": 3500, "provider": "Uber", "ecoFriendly": false } ] }, { "type": "direct", "from": "Kochi", "to": "Munnar", "options": [ { "mode": "Bus", "time": "4 hours 30 minutes", "cost": 250, "provider": "KSRTC", "ecoFriendly": true }, { "mode": "Car", "time": "3 hours 45 minutes", "cost": 2500, "provider": "Uber", "ecoFriendly": false } ] }, { "type": "direct", "from": "Trivandrum", "to": "Bangalore", "options": [ { "mode": "Train", "time": "16 hours", "cost": 750, "provider": "Indian Railways", "ecoFriendly": true }, { "mode": "Bus", "time": "14 hours", "cost": 1200, "provider": "KSRTC", "ecoFriendly": true }, { "mode": "Flight", "time": "1 hour 15 minutes", "cost": 4500, "provider": "Air India", "ecoFriendly": false } ] }, { "type": "connected", "from": "Trivandrum Central", "to": "Technopark", "totalTime": "55 minutes", "totalCost": 62, "legs": [ { "mode": "Bus", "provider": "KSRTC", "time": "25 minutes", "cost": 12, "from": "Trivandrum Central", "to": "Pattom" }, { "mode": "Auto", "provider": "Uber", "time": "15 minutes", "cost": 50, "from": "Pattom", "to": "Technopark" } ] }, { "type": "connected", "from": "Kochi", "to": "Wonderla", "totalTime": "1 hour 35 minutes", "totalCost": 150, "legs": [ { "mode": "Metro", "provider": "Kochi Metro", "time": "20 minutes", "cost": 30, "from": "Kochi", "to": "Aluva" }, { "mode": "Bus", "provider": "KSRTC", "time": "30 minutes", "cost": 80, "from": "Aluva", "to": "Wonderla" } ] } ];

const modeLogos = { 'Bus': '/bus.png', 'Train': '/train.png', 'Car': '/uber.png', 'Auto': '/uber.png', 'Flight': '/plane.png', 'Metro': '/metro.png', 'Default': '/logo.png' };

const parseDuration = (timeStr) => { if (!timeStr) return 0; let totalMinutes = 0; const hoursMatch = timeStr.match(/(\d+)\s*hour/); const minutesMatch = timeStr.match(/(\d+)\s*minute/); if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60; if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10); return totalMinutes; };

// --- Child Components ---

const LoadingScreen = () => ( <div className="loading-screen"> <img src="/logo.png" alt="Loading..." /> </div> );

const AutocompleteInput = ({ value, onChange, placeholder, label, allLocations }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);

    const suggestions = useMemo(() => {
      if (!value) return allLocations;
      return allLocations.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
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
        <div className="input-group" ref={wrapperRef}>
            <label>{label}</label>
            <div className="input-wrapper">
                <input
                    type="text" value={value}
                    onChange={(e) => { onChange(e.target.value); if (!showSuggestions) setShowSuggestions(true); setHighlightedIndex(-1); }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder} className="search-input" autoComplete="off"
                />
                <span className={`input-arrow ${showSuggestions ? 'open' : ''}`} onClick={() => setShowSuggestions(!showSuggestions)}>&#9660;</span>
            </div>
            {showSuggestions && (
                <div className="autocomplete-suggestions">
                    {suggestions.map((s, i) => (
                        <div key={i} className={`suggestion-item ${i === highlightedIndex ? 'highlighted' : ''}`} onClick={() => handleSelect(s)} onMouseOver={() => setHighlightedIndex(i)}>
                            {s}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FilterControls = ({ onSort, currentSort, onToggleEco, isEco }) => ( <div className="filter-controls"> <button onClick={() => onSort('cost')} className={`filter-button ${currentSort === 'cost' ? 'active' : ''}`}>Cheapest</button> <button onClick={() => onSort('time')} className={`filter-button ${currentSort === 'time' ? 'active' : ''}`}>Fastest</button> <button onClick={onToggleEco} className={`filter-button ${isEco ? 'active' : ''}`}>Eco-Friendly</button> </div> );

const SearchForm = ({ onSearch, allLocations, onSort, currentSort, onToggleEco, isEco, showFilters }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [journeyDate, setJourneyDate] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); onSearch(from, to); };
    const handleSwap = () => { setFrom(to); setTo(from); };
    useEffect(() => { setJourneyDate(new Date().toISOString().split('T')[0]); }, []);
    
    return (
        <section className="form-section">
            <form onSubmit={handleSubmit}>
                <div className="search-form-grid">
                    <AutocompleteInput label="From" value={from} onChange={setFrom} placeholder="Select departure city" allLocations={allLocations} />
                    <button type="button" className="swap-button" onClick={handleSwap} title="Swap locations">&#8644;</button>
                    <AutocompleteInput label="To" value={to} onChange={setTo} placeholder="Select arrival city" allLocations={allLocations} />
                </div>
                <div className="date-picker-grid">
                     <div className="input-group"> <label>Journey Date</label> <input type="date" value={journeyDate} min={new Date().toISOString().split('T')[0]} onChange={e => setJourneyDate(e.target.value)} className="search-input" /> </div>
                </div>
                <button type="submit" className="search-button">Search Routes</button>
                {showFilters && ( <FilterControls onSort={onSort} currentSort={currentSort} onToggleEco={onToggleEco} isEco={isEco} /> )}
            </form>
        </section>
    );
};

const handleImageError = (e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; };

const ResultCard = ({ result }) => ( <div className="result-card"> <div className="card-content"> <img src={modeLogos[result.mode] || modeLogos['Default']} alt={result.mode} className="provider-logo" onError={handleImageError} /> <div className="trip-details"> <div className="mode">{result.mode}</div> <div className="sub">{result.provider}</div> </div> <div className="trip-meta"> <div className="time">{result.time}</div> <div className="cost">&#8377;{result.cost}</div> <button className="book-button">Book Now</button> </div> </div> </div> );

const MultiLegResultCard = ({ result }) => ( <div className="multi-leg-card"> <div className="multi-leg-header"> <h3>Connected Trip Plan</h3> <div className="multi-leg-summary"> <span>Total Time: {result.totalTime}</span> <span>Total Cost: &#8377;{result.totalCost}</span> </div> </div> <div className="multi-leg-body"> {result.legs.map((leg, index) => ( <div className="leg" key={index}> <img src={modeLogos[leg.mode] || modeLogos['Default']} alt={leg.mode} className="provider-logo" onError={handleImageError} /> <div className="trip-details"> <div className="mode">{leg.from} &rarr; {leg.to}</div> <div className="sub">{leg.mode} via {leg.provider}</div> </div> <div className="trip-meta"> <div className="time">{leg.time}</div> <div className="cost">&#8377;{leg.cost}</div> {leg.mode !== 'Auto' && <button className="book-button">Book Now</button>} </div> </div> ))} </div> </div> );

function App() {
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [isLightMode, setIsLightMode] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [ecoFriendlyOnly, setEcoFriendlyOnly] = useState(false);

    // Simulate fetching data for loading screen
    useEffect(() => {
      setTimeout(() => {
        // When you get data.json, replace `travelData` with the fetch result
        // const response = await fetch('/data.json');
        // const data = await response.json();
        // setAllData(data);
        setAllData(travelData);
        setIsLoading(false);
      }, 1500); // Simulating 1.5 second load time
    }, []);

    useEffect(() => { document.body.classList.toggle('light-mode', isLightMode); }, [isLightMode]);
    
    const allLocations = useMemo(() => { const locations = new Set(); allData.forEach(route => { locations.add(route.from); locations.add(route.to); if(route.type === 'connected') { route.legs.forEach(leg => { locations.add(leg.from); locations.add(leg.to); }); } }); return Array.from(locations).sort(); }, [allData]);
    
    const handleSearch = (from, to) => { const fromQuery = from.toLowerCase().trim(); const toQuery = to.toLowerCase().trim(); const foundRoute = allData.find(r => r.from.toLowerCase() === fromQuery && r.to.toLowerCase() === toQuery); setResults(foundRoute || { type: 'none' }); setSortBy(null); setEcoFriendlyOnly(false); };
    
    const handleSort = (key) => { setSortBy(prev => (prev === key ? null : key)); };
    
    const displayedResults = useMemo(() => { if (!results || results.type !== 'direct') { return results; } let processedOptions = [...results.options]; if (ecoFriendlyOnly) { processedOptions = processedOptions.filter(opt => opt.ecoFriendly); } if (sortBy === 'cost') { processedOptions.sort((a, b) => a.cost - b.cost); } else if (sortBy === 'time') { processedOptions.sort((a, b) => parseDuration(a.time) - parseDuration(b.time)); } return { ...results, options: processedOptions }; }, [results, sortBy, ecoFriendlyOnly]);
    
    const renderResults = () => { if (!displayedResults) return null; switch (displayedResults.type) { case 'direct': return displayedResults.options.map((option, index) => <ResultCard key={index} result={option} />); case 'connected': return <MultiLegResultCard result={displayedResults} />; case 'none': return <div className="result-card"><div className="card-content" style={{display:'block', color: 'var(--text-color)'}}>No direct or connected routes found for this journey.</div></div>; default: return null; } };

    if (isLoading) {
      return (
        <>
          <GlobalStyles />
          <LoadingScreen />
        </>
      );
    }
    
    return (
        <div className="app-container">
            <GlobalStyles />
            <button className="theme-switcher" onClick={() => setIsLightMode(!isLightMode)} title="Toggle Theme"> {isLightMode ? '🌙' : '☀️'} </button>
            <header className="app-header"> <img src="/logo.png" alt="TravelMate Logo" className="app-logo"/> </header>
            <main>
                <SearchForm onSearch={handleSearch} allLocations={allLocations} onSort={handleSort} currentSort={sortBy} onToggleEco={() => setEcoFriendlyOnly(prev => !prev)} isEco={ecoFriendlyOnly} showFilters={results && results.type === 'direct'} />
                {results && ( <section className="results-section"> <h2>Available Options</h2> <div className="results-container"> {renderResults()} </div> </section> )}
            </main>
        </div>
    );
}

export default App;
