import React from 'react';
import ExplanationCard from './ExplanationCard';

/**
 * PUBLIC_INTERFACE
 * ExplanationTabs
 * Props:
 *  - active: 'ELI5' | 'ELI15' | 'Expert'
 *  - onChange: (level: string) => void
 *  - data: { ELI5: string, ELI15: string, Expert: string }
 */
function ExplanationTabs({ active = 'ELI5', onChange = () => {}, data }) {
  const levels = ['ELI5', 'ELI15', 'Expert'];
  const currentText = data?.[active] || 'No explanation yet.';

  return (
    <div>
      <div className="tabs">
        {levels.map((lvl) => (
          <button
            key={lvl}
            className={`tab ${active === lvl ? 'active' : ''}`}
            onClick={() => onChange(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>
      <ExplanationCard level={active} text={currentText} />
    </div>
  );
}

export default ExplanationTabs;
