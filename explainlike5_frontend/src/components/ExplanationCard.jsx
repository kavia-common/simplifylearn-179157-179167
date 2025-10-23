import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ExplanationCard
 * Props:
 *  - level: 'ELI5' | 'ELI15' | 'Expert'
 *  - text: string
 */
function ExplanationCard({ level, text }) {
  return (
    <div className="explain-card">
      <div className="explain-header">
        <div className="explain-level">{level}</div>
      </div>
      <div className="explain-body">{text}</div>
    </div>
  );
}

export default ExplanationCard;
