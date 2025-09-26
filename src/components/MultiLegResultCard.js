import React from 'react';

/**
 * Renders a card for a complex, multi-leg journey.
 * @param {object} props - The component props.
 * @param {object} props.result - The multi-leg journey data.
 * @param {string} props.result.totalDuration - Total time for the journey.
 * @param {number} props.result.totalFare - Total cost for the journey.
 * @param {Array<object>} props.result.legs - Array of journey leg objects.
 */
const MultiLegResultCard = ({ result }) => {
  const getIconForMode = (mode) => {
    if (mode.toLowerCase() === 'bus') return '🚌';
    if (mode.toLowerCase() === 'auto') return '🛺';
    return '➡️'; // Default icon
  };

  return (
    <div className="multi-leg-card">
      <div className="multi-leg-header">
        <h3>Your Perfect Journey</h3>
        <div className="multi-leg-summary">
          <div className="summary-item">
            <strong>Total Time:</strong> {result.totalDuration}
          </div>
          <div className="summary-item">
            <strong>Total Fare:</strong> ₹{result.totalFare}
          </div>
        </div>
      </div>
      <div className="multi-leg-body">
        {result.legs.map((leg, index) => (
          <div key={index} className="leg">
            <span className="leg-icon">{getIconForMode(leg.mode)}</span>
            <div className="leg-details">
              <strong>{leg.from} to {leg.to}</strong>
              <span>({leg.mode}) - {leg.duration}, ₹{leg.fare}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiLegResultCard;
