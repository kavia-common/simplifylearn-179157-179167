import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Settings page
 * Props:
 *  - prefs: { compactCards: boolean, showAdvancedTips: boolean }
 *  - onChange: (nextPrefs) => void
 */
function Settings({ prefs = {}, onChange = () => {} }) {
  const toggle = (key) => {
    onChange({ ...prefs, [key]: !prefs[key] });
  };

  return (
    <div>
      <div className="topic-title">Settings</div>
      <div className="topic-sub">Adjust how explanations and UI behave.</div>

      <div className="list mt-12">
        <div className="list-item">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700 }}>Compact explanation cards</div>
              <div className="small">Reduce vertical spacing for a denser view.</div>
            </div>
            <div
              className={`switch ${prefs.compactCards ? 'on' : ''}`}
              onClick={() => toggle('compactCards')}
              role="switch"
              aria-checked={!!prefs.compactCards}
              tabIndex={0}
            >
              <div className="switch-thumb" />
            </div>
          </div>
        </div>

        <div className="list-item">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700 }}>Show advanced tips</div>
              <div className="small">Display pro guidance in the sidebar.</div>
            </div>
            <div
              className={`switch ${prefs.showAdvancedTips ? 'on' : ''}`}
              onClick={() => toggle('showAdvancedTips')}
              role="switch"
              aria-checked={!!prefs.showAdvancedTips}
              tabIndex={0}
            >
              <div className="switch-thumb" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
