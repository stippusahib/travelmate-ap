import React from 'react';
import ResultCard from './ResultCard.js';
import MultiLegResultCard from './MultiLegResultCard.js';

/**
 * Renders a list of result cards, choosing the correct component
 * based on the result type.
 * @param {object} props - The component props.
 * @param {Array<object>} props.results - An array of travel options.
 */
const ResultsDisplay = ({ results }) => {
  // If there are no results, don't render anything.
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="results-container">
      {results.map((item, index) => {
        // Use a unique and stable key if available, like an item ID.
        const key = item.id || index;

        // Conditionally render the correct card based on the 'type' property.
        if (item.type === 'multi-leg') {
          return <MultiLegResultCard key={key} result={item} />;
        }
        
        // Default to the single, simple result card.
        return <ResultCard key={key} option={item} />;
      })}
    </div>
  );
};

export default ResultsDisplay;


