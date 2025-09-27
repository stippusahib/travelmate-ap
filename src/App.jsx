import React, { useState, useMemo, useEffect, useRef } from 'react';
import './App.css';
import travelData from './data.json';

// --- Helper Functions & Constants ---
const modeLogos = { 'Bus': '/bus.png', 'Train': '/train.png', 'Car': '/uber.png', 'Auto': '/uber.png', 'Flight': '/plane.png', 'Metro': '/metro.png', 'Community': '/users.png' };

const parseDuration = (timeStr) => {
    if (!timeStr) return 0;
    let totalMinutes = 0;
    const hoursMatch = timeStr.match(/(\d+)\s*(hours|hour|h)/);
    const minutesMatch = timeStr.match(/(\d+)\s*(minutes|minute|m)/);
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);
    return totalMinutes;
};

// --- Child Components ---

const LoadingScreen = () => ( <div className="loading-screen"><img src="/logo.png" alt="Loading..." /></div> );

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};

const SuggestionForm = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would handle form data submission here
        console.log("Form submitted!");
        onClose(); // Close the modal after submission
    };
    return (
        <div className="suggestion-form-container">
            <h3>Suggest a Local Route</h3>
            <p>Your contribution helps everyone travel smarter. Please provide the details of the non-bookable route.</p>
            <form onSubmit={handleSubmit} className="suggestion-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="from">From</label>
                        <input type="text" id="from" placeholder="e.g., Pala" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to">To</label>
                        <input type="text" id="to" placeholder="e.g., Kottayam" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="details">Route Details</label>
                    <input type="text" id="details" placeholder="e.g., Via Main Central Road" />
                </div>
                 <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="time">Typical Time</label>
                        <input type="text" id="time" placeholder="e.g., 45 mins" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost">Estimated Cost (₹)</label>
                        <input type="number" id="cost" placeholder="e.g., 47" required />
                    </div>
                </div>
                <button type="submit" className="submit-suggestion-button">Submit Suggestion</button>
            </form>
        </div>
    );
};


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
        onChange(suggestion); setShowSuggestions(false); setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0)); }
        else if (e.key === 'Enter') { e.preventDefault(); if (highlightedIndex > -1) handleSelect(suggestions[highlightedIndex]); }
        else if (e.key === 'Escape') { setShowSuggestions(false); setHighlightedIndex(-1); }
    };

    return (
        <div className={`input-group ${showSuggestions ? 'is-active' : ''}`} ref={wrapperRef}>
            <label>{label}</label>
            <div className="input-wrapper">
                <input type="text" value={value} onChange={(e) => { onChange(e.target.value); if (!showSuggestions) setShowSuggestions(true); setHighlightedIndex(-1); }} onFocus={() => setShowSuggestions(true)} onKeyDown={handleKeyDown} placeholder={placeholder} className="search-input" autoComplete="off" />
                <span className={`input-arrow ${showSuggestions ? 'open' : ''}`} onClick={() => setShowSuggestions(!showSuggestions)}>&#9660;</span>
            </div>
            {showSuggestions && (
                <div className="autocomplete-suggestions">
                    {suggestions.map((s, i) => ( <div key={i} className={`suggestion-item ${i === highlightedIndex ? 'highlighted' : ''}`} onClick={() => handleSelect(s)} onMouseOver={() => setHighlightedIndex(i)}>{s}</div> ))}
                </div>
            )}
        </div>
    );
};

const FilterControls = ({ onSort, currentSort, onToggleEco, isEco }) => (
    <div className="filter-controls">
        <button onClick={() => onSort('cost')} className={`filter-button ${currentSort === 'cost' ? 'active' : ''}`}>Price: Low to High</button>
        <button onClick={() => onSort('time')} className={`filter-button ${currentSort === 'time' ? 'active' : ''}`}>Fastest</button>
        <button onClick={onToggleEco} className={`filter-button ${isEco ? 'active' : ''}`}>Eco-Friendly</button>
    </div>
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
                    <button type="button" className="swap-button" onClick={handleSwap} title="Swap locations"><span>&#8644;</span></button>
                    <AutocompleteInput label="To" value={to} onChange={setTo} placeholder="Select arrival city" allLocations={allLocations} />
                </div>
                <div className="date-picker-grid">
                     <div className="input-group">
                        <label>Journey Date</label>
                        <input type="date" value={journeyDate} min={new Date().toISOString().split('T')[0]} onChange={e => setJourneyDate(e.target.value)} className="search-input date-input" />
                     </div>
                </div>
                <button type="submit" className="search-button">Search Routes</button>
                {showFilters && ( <FilterControls onSort={onSort} currentSort={currentSort} onToggleEco={onToggleEco} isEco={isEco} /> )}
            </form>
        </section>
    );
};

const handleImageError = (e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; };

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
);

const MultiLegResultCard = ({ result }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
    <div className="multi-leg-card">
        <div className="multi-leg-header" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="header-content">
                <h3>Trip with Connections</h3>
                <div className="multi-leg-summary">
                    <span>Total Time: {result.totalTime}</span>
                    <span>Total Cost: &#8377;{result.totalCost}</span>
                </div>
            </div>
            <span className={`expand-arrow ${isExpanded ? 'open' : ''}`}>&#9660;</span>
        </div>
        {isExpanded && (
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
        )}
    </div>
    );
};

const CommunityResultCard = ({ result }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="community-card">
            <div className="card-content">
                <img src={modeLogos['Community']} alt="Community Suggestion" className="provider-logo" onError={handleImageError} />
                <div className="trip-details">
                    <div className="mode">{result.from} &rarr; {result.to}</div>
                    <div className="sub community-badge">Community Suggestion</div>
                </div>
                <div className="trip-meta">
                     <button className="suggest-button" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Hide Info' : 'Show Info'}</button>
                </div>
            </div>
            {isExpanded && (
                <div className="suggestion-details">
                    <p>This is a non-bookable route reported by the community. It may be a local private bus or other service.</p>
                    <ul>
                        <li><strong>Route:</strong> {result.details.route}</li>
                        <li><strong>Typical Time:</strong> {result.details.time}</li>
                        <li><strong>Estimated Cost:</strong> &#8377;{result.details.cost}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const SuggestRouteCTA = ({ onSuggestClick }) => (
    <section className="suggest-cta-section fade-in-section">
        <h3>Don't see a local route you know?</h3>
        <p>Help other travelers by suggesting non-bookable routes like local buses.</p>
        <button className="suggest-cta-button" onClick={onSuggestClick}>Suggest a Route</button>
    </section>
);


const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{faq.question}</span>
                <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                <p>{faq.answer}</p>
            </div>
        </div>
    );
};

const AppFooter = () => (
    <footer className="app-footer fade-in-section">
        <div className="footer-content">
            <p className="footer-team">TEAM MANDI MASALA</p>
            <p>&copy; {new Date().getFullYear()} TravelMate. All Rights Reserved.</p>
        </div>
    </footer>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [ecoFriendlyOnly, setEcoFriendlyOnly] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const communityData = [ { type: "community", from: "Pala", to: "Kottayam", details: { route: "Pala Bus Stand -> Kottayam KSRTC", time: "Approx. 45 mins", cost: 47 } }, { type: "community", from: "Kanjirappally", to: "Mundakayam", details: { route: "Direct local bus", time: "Approx. 30 mins", cost: 43 } } ];

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 750);
    }, []);
    
    useEffect(() => {
        if (isLoading) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, [isLoading, hasSearched]);

    useEffect(() => { document.body.classList.toggle('light-mode', isLightMode); }, [isLightMode]);

    const allLocations = useMemo(() => {
        const locations = new Set();
        [...travelData, ...communityData].forEach(route => {
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
    }, [communityData]);

    const handleSearch = (from, to) => {
        const fromQuery = from.toLowerCase().trim();
        const toQuery = to.toLowerCase().trim();
        const officialRoutes = travelData.filter(r => r.from.toLowerCase() === fromQuery && r.to.toLowerCase() === toQuery);
        const communityRoutes = communityData.filter(r => r.from.toLowerCase() === fromQuery && r.to.toLowerCase() === toQuery);
        setResults([...officialRoutes, ...communityRoutes]);
        setHasSearched(true);
        setSortBy(null);
        setEcoFriendlyOnly(false);
    };

    const handleSort = (key) => { setSortBy(prev => (prev === key ? null : key)); };

    const processedResults = useMemo(() => {
        if (!results || results.length === 0) return [];
        let allOptions = [];
        results.forEach((route, routeIndex) => {
            if (route.type === 'direct') { route.options.forEach(opt => allOptions.push({ ...opt, type: 'direct', id: `d-${routeIndex}-${opt.name}` })); }
            else if (route.type === 'connected') { allOptions.push({ ...route, type: 'connected', id: `c-${routeIndex}` }); }
            else if (route.type === 'community') { allOptions.push({ ...route, type: 'community', id: `com-${routeIndex}` }); }
        });

        if (ecoFriendlyOnly) { /* ... filtering logic ... */ }
        if (sortBy) {
            allOptions.sort((a, b) => {
                const costA = a.cost || a.totalCost || a.details?.cost || 0;
                const costB = b.cost || b.totalCost || b.details?.cost || 0;
                const timeA = parseDuration(a.time || a.totalTime || a.details?.time);
                const timeB = parseDuration(b.time || b.totalTime || b.details?.time);
                if (sortBy === 'cost') return costA - costB;
                if (sortBy === 'time') return timeA - timeB;
                return 0;
            });
        }
        return allOptions;
    }, [results, sortBy, ecoFriendlyOnly]);

    const faqs = [ { question: "What is TravelMate?", answer: "TravelMate is a multi-modal travel search engine designed to help you find the best route for your journey, combining options like buses, trains, and flights all in one place." }, { question: "Can I book tickets directly through TravelMate?", answer: "Currently, TravelMate helps you find and compare the best routes. The 'Book Now' button will redirect you to the service provider's website where you can complete your booking." }, { question: "What are 'Community Suggestions'?", answer: "These are routes reported by other users, like local private buses, that aren't available for online booking. They are provided to give you more travel options, especially for shorter distances." }, { question: "How is the 'Eco-Friendly' filter determined?", answer: "Routes are marked as eco-friendly based on their carbon footprint per passenger. Public transport like buses and trains are generally considered more eco-friendly than private cars or flights for the same distance." } ];

    if (isLoading) { return <LoadingScreen />; }

    return (
        <div className="app-container">
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <SuggestionForm onClose={() => setIsModalOpen(false)} />
            </Modal>

            <button className="theme-switcher" onClick={() => setIsLightMode(!isLightMode)} title="Toggle Theme"> {isLightMode ? '🌙' : '☀️'} </button>
            <header className="app-header"> <img src="/logo.png" alt="TravelMate Logo" className="app-logo"/> </header>
            <main>
                <SearchForm onSearch={handleSearch} allLocations={allLocations} onSort={handleSort} currentSort={sortBy} onToggleEco={() => setEcoFriendlyOnly(prev => !prev)} isEco={ecoFriendlyOnly} showFilters={results.length > 0} />
                <SuggestRouteCTA onSuggestClick={() => setIsModalOpen(true)} />
                {hasSearched && (
                    <section className="results-section fade-in-section">
                        <h2>Available Options</h2>
                        <div className="results-container">
                            {processedResults.length > 0 ? (
                                processedResults.map((result) => {
                                    if (result.type === 'direct') return <ResultCard key={result.id} result={result} />;
                                    if (result.type === 'connected') return <MultiLegResultCard key={result.id} result={result} />;
                                    if (result.type === 'community') return <CommunityResultCard key={result.id} result={result} />;
                                    return null;
                                })
                            ) : (
                                <div className="result-card"><div className="card-content">No routes found for this journey.</div></div>
                            )}
                        </div>
                    </section>
                )}
                <section className="faq-section fade-in-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-container">
                        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    );
}

export default App;
