import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NavBar component
 * Props:
 *  - active: 'home' | 'history' | 'settings'
 *  - onNavigate: (view: string) => void
 */
function NavBar({ active = 'home', onNavigate = () => {} }) {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-badge">E5</div>
          ExplainLike5 <span className="brand-sub">Ocean Pro</span>
        </div>
        <div className="nav-actions">
          <button
            className={`nav-btn ${active === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-btn ${active === 'history' ? 'active' : ''}`}
            onClick={() => onNavigate('history')}
          >
            History
          </button>
          <button
            className={`nav-btn ${active === 'settings' ? 'active' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
