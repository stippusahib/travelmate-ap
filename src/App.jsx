import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- Global Styles Component ---
// This component now holds all the CSS, making the file self-contained and fixing the error.
const GlobalStyles = () => {
  useEffect(() => {
    const css = `
      :root {
          --primary-color: #0052D4;
          --accent-color: #10B981; 
          --background-color: #F0F4F8;
          --background-gradient-end: #C5D9E8;
          --text-color: #1A202C;
          --text-color-light: #718096;
          --card-background: #FFFFFF;
          --card-shadow: rgba(45, 55, 72, 0.12);
          --border-color: #E2E8F0;
          --focus-shadow: rgba(0, 82, 212, 0.2);
      }
      body.dark-mode {
          --primary-color: #3B82F6;
          --accent-color: #10B981;
          --background-color: #1A202C;
          --background-gradient-end: #333C4A;
          --text-color: #E2E8F0;
          --text-color-light: #A0AEC0;
          --card-background: #2D3748;
          --card-shadow: rgba(0, 0, 0, 0.3);
          --border-color: #4A5568;
          --focus-shadow: rgba(59, 130, 246, 0.3);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
          font-family: 'Inter', sans-serif;
          background-color: var(--background-color);
          background-image: linear-gradient(135deg, var(--background-color) 0%, var(--background-gradient-end) 100%);
          color: var(--text-color);
          line-height: 1.6;
          transition: background-color 0.3s ease, color 0.3s ease;
          overflow-x: hidden;
          min-height: 100vh;
      }

      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

      .app-container { max-width: 800px; margin: 0 auto; padding: 24px; text-align: center; position: relative; }
      .app-header { display: block; margin-bottom: 24px; }
      .app-logo { height: 120px; width: auto; margin-bottom: 24px; }

      .theme-switcher { 
        position: absolute;
        top: 32px;
        right: 32px;
        background: rgba(0, 0, 0, 0.1); 
        backdrop-filter: blur(5px); 
        border: 1px solid rgba(0, 0, 0, 0.1); 
        color: var(--text-color); 
        width: 40px; height: 40px; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        cursor: pointer; 
        transition: all 0.2s ease; 
        z-index: 10;
      }
      .theme-switcher:hover { background: rgba(0, 0, 0, 0.2); transform: scale(1.1); }
      body.dark-mode .theme-switcher { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); color: white; }

      .form-section { background: var(--card-background); border-radius: 16px; padding: 32px; box-shadow: 0 10px 40px var(--card-shadow); text-align: left; animation: fadeInUp 0.5s ease; }
      .search-form-grid { display: grid; grid-template-columns: 1fr; gap: 0; margin-bottom: 16px; position: relative; }
      .input-group { position: relative; text-align: left; z-index: 1; }
      .input-group:first-of-type { margin-bottom: 32px; }
      .input-group label { display: block; font-weight: 500; font-size: 0.9rem; margin-bottom: 8px; color: var(--text-color-light); }
      .search-input { width: 100%; padding: 12px; font-size: 1rem; border: 1px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-color); transition: all 0.2s ease-in-out; }
      .search-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px var(--focus-shadow); }
      
      .swap-button { 
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: -14px;
        height: 40px; 
        width: 40px; 
        cursor: pointer; 
        border-radius: 50%; 
        border: 1px solid var(--border-color); 
        background: var(--card-background); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        transition: all 0.2s ease;
        z-index: 5;
      }
      .swap-button:hover { transform: translate(-50%, -50%) rotate(180deg); background: var(--primary-color); color: white; }
      
      .date-picker-grid { display: grid; grid-template-columns: 1fr; margin-bottom: 24px; }
      .search-button { width: 100%; padding: 16px; font-size: 1.1rem; font-weight: 600; color: #fff; background: var(--primary-color); border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s ease-in-out; box-shadow: 0 4px 12px rgba(0, 82, 212, 0.2); }
      .search-button:hover { background-color: #003E9E; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0, 82, 212, 0.3); }

      .filter-controls { display: flex; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); flex-wrap: wrap; }
      .filter-button { padding: 8px 16px; border: 1px solid var(--border-color); background: transparent; color: var(--text-color-light); cursor: pointer; border-radius: 20px; transition: all 0.2s ease; font-weight: 500; }
      .filter-button:hover { background: var(--primary-color); color: #fff; border-color: var(--primary-color); transform: translateY(-2px); }
      .filter-button.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); box-shadow: 0 2px 8px var(--focus-shadow); }

      .autocomplete-suggestions { position: absolute; background: var(--card-background); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 4px 12px var(--card-shadow); max-height: 150px; overflow-y: auto; z-index: 10; width: 100%; margin-top: 4px; }
      .suggestion-item { padding: 12px; cursor: pointer; text-align: left; }
      .suggestion-item:hover { background: var(--background-color); }

      .results-section { margin-top: 40px; text-align: left; }
      .results-section h2 { font-size: 1.5rem; margin-bottom: 16px; color: var(--text-color); }
      .results-container { display: flex; flex-direction: column; gap: 16px; }

      .result-card, .multi-leg-card { background: var(--card-background); border-radius: 12px; box-shadow: 0 4px 16px var(--card-shadow); border: 1px solid var(--border-color); transition: all 0.3s ease; animation: fadeInUp 0.5s ease backwards; }
      .result-card:hover, .multi-leg-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px var(--card-shadow); border-color: var(--primary-color); }

      .card-content { display: grid; grid-template-columns: auto 1fr auto; align-items: center; padding: 16px; gap: 16px; }
      .provider-logo { width: 40px; height: 40px; object-fit: contain; flex-shrink: 0; border-radius: 8px; }
      body.dark-mode .provider-logo { background-color: #fff; padding: 4px; }

      .trip-details { text-align: left; }
      .trip-details .mode { font-weight: 600; }
      .trip-details .sub { font-size: 0.9rem; color: var(--text-color-light); }
      .trip-meta { text-align: right; }
      .trip-meta .cost { font-weight: 700; font-size: 1.2rem; color: var(--accent-color); }
      .trip-meta .time { font-size: 0.9rem; color: var(--text-color-light); margin-bottom: 8px; }

      .book-button { font-size: 0.9rem; font-weight: 600; color: #fff; background-color: var(--accent-color); border: none; border-radius: 6px; cursor: pointer; padding: 8px 16px; transition: all 0.2s ease; }
      .book-button:hover { background-color: #0d8a6a; transform: scale(1.05); }

      .multi-leg-header { padding: 16px; border-bottom: 1px solid var(--border-color); }
      .multi-leg-header h3 { font-size: 1.2rem; text-align: left; }
      .multi-leg-summary { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-color-light); margin-top: 4px; }
      .multi-leg-body { padding: 16px; display: flex; flex-direction: column; gap: 16px; }

      .leg { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px; }
      .leg-timeline, .leg-icon { display: none; }

      @media (min-width: 768px) {
        .app-logo { height: 200px; }
        .search-form-grid { grid-template-columns: 1fr auto 1fr; }
        .input-group:first-of-type { margin-bottom: 0; }
        .swap-button { position: static; margin: 28px 0 0 0; transform: none; }
        .swap-button:hover { transform: rotate(180deg); }
      }

      @media (max-width: 767px) {
        .app-header { margin-bottom: 16px; text-align: center; }
        .form-section { padding: 24px; }
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

// --- Data ---
// The data structure has been updated to include a 'provider' for the new UI.
const travelData = [
  {
    "type": "direct",
    "from": "Trivandrum",
    "to": "Kochi",
    "options": [
      { "mode": "Train", "time": "3 hours 15 minutes", "cost": 150, "provider": "Indian Railways", "ecoFriendly": true },
      { "mode": "Bus", "time": "5 hours", "cost": 300, "provider": "KSRTC", "ecoFriendly": true },
      { "mode": "Flight", "time": "1 hour", "cost": 2200, "provider": "Air India", "ecoFriendly": false },
      { "mode": "Car", "time": "4 hours 30 minutes", "cost": 3500, "provider": "Uber", "ecoFriendly": false }
    ]
  },
  {
    "type": "direct",
    "from": "Kochi",
    "to": "Munnar",
    "options": [
      { "mode": "Bus", "time": "4 hours 30 minutes", "cost": 250, "provider": "KSRTC", "ecoFriendly": true },
      { "mode": "Car", "time": "3 hours 45 minutes", "cost": 2500, "provider": "Uber", "ecoFriendly": false }
    ]
  },
  {
    "type": "direct",
    "from": "Trivandrum",
    "to": "Bangalore",
    "options": [
        { "mode": "Train", "time": "16 hours", "cost": 750, "provider": "Indian Railways", "ecoFriendly": true },
        { "mode": "Bus", "time": "14 hours", "cost": 1200, "provider": "KSRTC", "ecoFriendly": true },
        { "mode": "Flight", "time": "1 hour 15 minutes", "cost": 4500, "provider": "Air India", "ecoFriendly": false }
    ]
  },
  {
    "type": "connected",
    "from": "Trivandrum Central",
    "to": "Technopark",
    "totalTime": "55 minutes",
    "totalCost": 62,
    "legs": [
      { "mode": "Bus", "provider": "KSRTC", "time": "25 minutes", "cost": 12, "from": "Trivandrum Central", "to": "Pattom" },
      { "mode": "Auto", "provider": "Uber", "time": "15 minutes", "cost": 50, "from": "Pattom", "to": "Technopark" }
    ]
  },
  {
    "type": "connected",
    "from": "Kochi",
    "to": "Wonderla",
    "totalTime": "1 hour 15 minutes",
    "totalCost": 120,
    "legs": [
      { "mode": "Train", "provider": "Indian Railways", "time": "45 minutes", "cost": 40, "from": "Kochi", "to": "Aluva" },
      { "mode": "Bus", "provider": "KSRTC", "time": "30 minutes", "cost": 80, "from": "Aluva", "to": "Wonderla" }
    ]
  }
];

// --- Helper Function ---
const parseDuration = (timeStr) => {
  if (!timeStr) return 0;
  let totalMinutes = 0;
  const hoursMatch = timeStr.match(/(\d+)\s*hour/);
  const minutesMatch = timeStr.match(/(\d+)\s*minute/);
  if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;
  if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);
  return totalMinutes;
};

// --- Mock Logos ---
const modeLogos = {
    'KSRTC': 'https://placehold.co/40x40/FF0000/FFFFFF?text=KSRTC',
    'Indian Railways': 'https://placehold.co/40x40/0000FF/FFFFFF?text=IR',
    'Air India': 'https://placehold.co/40x40/D80027/FFFFFF?text=AI',
    'Uber': 'https://placehold.co/40x40/000000/FFFFFF?text=U',
    'Default': 'https://placehold.co/120x120/EBF8FF/1A202C?text=TravelMate' 
};

// --- Child Components ---
const AutocompleteInput = ({ value, onChange, placeholder, label, suggestions, onKeyDown }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (suggestion) => {
        onChange(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="input-group" ref={wrapperRef}>
            <label>{label}</label>
            <input
                type="text" value={value}
                onChange={(e) => { onChange(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
              onKeyDown={onKeyDown}
                placeholder={placeholder} className="search-input" autoComplete="off"
            />
            {showSuggestions && value && suggestions.length > 0 && (
                <div className="autocomplete-suggestions">
                    {suggestions.map((s, i) => <div key={i} className="suggestion-item" onClick={() => handleSelect(s)}>{s}</div>)}
                </div>
            )}
        </div>
    );
};

const FilterControls = ({ onSort, currentSort, onToggleEco, isEco }) => (
    <div className="filter-controls">
        <button onClick={() => onSort('cost')} className={`filter-button ${currentSort === 'cost' ? 'active' : ''}`}>Cheapest</button>
        <button onClick={() => onSort('time')} className={`filter-button ${currentSort === 'time' ? 'active' : ''}`}>Fastest</button>
        <button onClick={onToggleEco} className={`filter-button ${isEco ? 'active' : ''}`}>Eco-Friendly</button>
    </div>
);

const SearchForm = ({ onSearch, allLocations, onSort, currentSort, onToggleEco, isEco, showFilters }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [journeyDate, setJourneyDate] = useState('');

    const fromSuggestions = useMemo(() => from ? allLocations.filter(l => l.toLowerCase().includes(from.toLowerCase()) && l.toLowerCase() !== from.toLowerCase()) : [], [from, allLocations]);
    const toSuggestions = useMemo(() => to ? allLocations.filter(l => l.toLowerCase().includes(to.toLowerCase()) && l.toLowerCase() !== to.toLowerCase()) : [], [to, allLocations]);
    
    const today = new Date().toISOString().split('T')[0];
    useEffect(() => {
        setJourneyDate(today);
    }, [today]);
    
    const handleKeyDown = (e, field) => {
        if (e.key === 'Enter') {
            const suggestions = field === 'from' ? fromSuggestions : toSuggestions;
            if (suggestions.length > 0) {
                e.preventDefault();
                const setter = field === 'from' ? setFrom : setTo;
                setter(suggestions[0]);
                e.target.blur(); 
            }
        }
    };
    
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onSearch(from, to); 
    };

    const handleSwap = () => { setFrom(to); setTo(from); };
    
    return (
        <section className="form-section">
            <form onSubmit={handleSubmit}>
                <div className="search-form-grid">
                    <AutocompleteInput label="From" value={from} onChange={setFrom} placeholder="Enter city" suggestions={fromSuggestions} onKeyDown={(e) => handleKeyDown(e, 'from')} />
                    <button type="button" className="swap-button" onClick={handleSwap} title="Swap locations">&#8644;</button>
                    <AutocompleteInput label="To" value={to} onChange={setTo} placeholder="Enter city" suggestions={toSuggestions} onKeyDown={(e) => handleKeyDown(e, 'to')} />
                </div>
                <div className="date-picker-grid">
                    <div className="input-group">
                        <label>Journey Date</label>
                        <input type="date" value={journeyDate} min={today} onChange={e => setJourneyDate(e.target.value)} className="search-input"/>
                    </div>
                </div>
                <button type="submit" className="search-button">Search Routes</button>
                {showFilters && (
                    <FilterControls onSort={onSort} currentSort={currentSort} onToggleEco={onToggleEco} isEco={isEco}/>
                )}
            </form>
        </section>
    );
};

const handleImageError = (e) => {
  e.currentTarget.src = modeLogos['Default'];
  e.currentTarget.onerror = null;
};

const ResultCard = ({ result }) => (
    <div className="result-card">
        <div className="card-content">
            <img 
              src={modeLogos[result.provider] || modeLogos['Default']} 
              alt={result.provider} 
              className="provider-logo" 
              onError={handleImageError}
            />
            <div className="trip-details">
                <div className="mode">{result.mode}</div>
                <div className="sub">{result.provider}</div>
            </div>
            <div className="trip-meta">
                <div className="time">{result.time}</div>
                <div className="cost">&#8377;{result.cost}</div>
                <button className="book-button">Book Now</button>
            </div>
        </div>
    </div>
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
                    <img 
                      src={modeLogos[leg.provider] || modeLogos['Default']} 
                      alt={leg.provider} 
                      className="provider-logo"
                      onError={handleImageError}
                    />
                    <div className="trip-details">
                         <div className="mode">{leg.from} &rarr; {leg.to}</div>
                         <div className="sub">{leg.mode} via {leg.provider}</div>
                    </div>
                    <div className="trip-meta">
                        <div className="time">{leg.time}</div>
                        <div className="cost">&#8377;{leg.cost}</div>
                        <button className="book-button">Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ResultsDisplay = ({ results }) => {
    if (!results) return null;

    const renderContent = () => {
        switch (results.type) {
            case 'direct':
                return results.options.map((option, index) => <ResultCard key={index} result={option} />);
            case 'connected':
                return <MultiLegResultCard result={results} />;
            case 'none':
                return <div className="result-card"><div className="card-content" style={{display:'block'}}>No direct or connected routes found for this journey.</div></div>;
            default:
                return null;
        }
    };

    return (
        <div className="results-container">
            {renderContent()}
        </div>
    );
};


// --- Main Application Component ---
function App() {
    const [results, setResults] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [ecoFriendlyOnly, setEcoFriendlyOnly] = useState(false);

    useEffect(() => { document.body.classList.toggle('dark-mode', isDarkMode); }, [isDarkMode]);
    
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
        return Array.from(locations);
    }, []);
    
    const handleSearch = (from, to) => {
        const fromQuery = from.toLowerCase().trim();
        const toQuery = to.toLowerCase().trim();
        const foundRoute = travelData.find(r => r.from.toLowerCase() === fromQuery && r.to.toLowerCase() === toQuery);
        setResults(foundRoute || { type: 'none' });
        setSortBy(null);
        setEcoFriendlyOnly(false);
    };

    const handleSort = (key) => {
        setSortBy(prev => (prev === key ? null : key));
    };

    const displayedResults = useMemo(() => {
        if (!results || results.type !== 'direct') {
            return results;
        }

        let processedOptions = [...results.options];
        if (ecoFriendlyOnly) {
            processedOptions = processedOptions.filter(opt => opt.ecoFriendly);
        }
        if (sortBy === 'cost') {
            processedOptions.sort((a, b) => a.cost - b.cost);
        } else if (sortBy === 'time') {
            processedOptions.sort((a, b) => parseDuration(a.time) - parseDuration(b.time));
        }
        
        return { ...results, options: processedOptions };

    }, [results, sortBy, ecoFriendlyOnly]);

    return (
        <div className="app-container">
            <GlobalStyles />
            <button className="theme-switcher" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle Theme">
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            <header className="app-header">
                <img src={modeLogos['Default']} alt="TravelMate Logo" className="app-logo"/>
            </header>
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
                        <ResultsDisplay results={displayedResults} />
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;

