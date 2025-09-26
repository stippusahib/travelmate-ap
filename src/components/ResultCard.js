import React from 'react';

/**
 * Renders a card for a single, simple travel option.
 * @param {object} props - The component props.
 * @param {object} props.option - The travel option data.
 * @param {string} props.option.mode - The mode of travel (e.g., "Train").
 * @param {string} props.option.name - The name of the service.
 * @param {string} props.option.time - The travel duration.
 * @param {number} props.option.cost - The travel cost.
 */
const ResultCard = ({ option }) => {
  return (
    <div className="result-card">
      <div className="result-card-header">
        <span className="result-card-mode">{option.mode}</span>
      </div>
      <div className="result-card-body">
        <p className="result-card-name">{option.name}</p>
        <div className="result-card-details">
          <span>Duration: {option.time}</span>
          <span className="result-card-cost">Fare: ₹{option.cost}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
