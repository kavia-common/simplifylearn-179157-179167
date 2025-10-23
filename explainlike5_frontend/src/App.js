import React, { useState, useMemo } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import History from './pages/History';
import Settings from './pages/Settings';

/**
 * PUBLIC_INTERFACE
 * App: Entry component providing a simple navigation shell and shared state.
 * Pages:
 *  - Home: submit topic and view explanations
 *  - History: scaffold with placeholder entries
 *  - Settings: scaffold with app preferences
 */
function App() {
  // App-wide state for simple navigation without react-router
  const [view, setView] = useState('home');

  // Simple local persistence for demo history
  const [history, setHistory] = useState([]);

  // App preferences
  const [prefs, setPrefs] = useState({
    compactCards: false,
    showAdvancedTips: true,
  });

  // PUBLIC_INTERFACE
  const navigate = (next) => setView(next);

  // PUBLIC_INTERFACE
  const addHistoryItem = (item) => {
    setHistory((prev) => [{ id: Date.now(), ...item }, ...prev].slice(0, 20));
  };

  const page = useMemo(() => {
    switch (view) {
      case 'history':
        return <History items={history} onSelect={(it) => setView('home')} />;
      case 'settings':
        return <Settings prefs={prefs} onChange={setPrefs} />;
      case 'home':
      default:
        return (
          <Home
            onGenerated={(item) => addHistoryItem(item)}
            prefs={prefs}
          />
        );
    }
  }, [view, history, prefs]);

  return (
    <div className="app">
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <div className="brand-badge">E5</div>
            ExplainLike5 <span className="brand-sub">Ocean Pro</span>
          </div>
          <div className="nav-actions">
            <button
              className={`nav-btn ${view === 'home' ? 'active' : ''}`}
              onClick={() => navigate('home')}
            >
              Home
            </button>
            <button
              className={`nav-btn ${view === 'history' ? 'active' : ''}`}
              onClick={() => navigate('history')}
            >
              History
            </button>
            <button
              className={`nav-btn ${view === 'settings' ? 'active' : ''}`}
              onClick={() => navigate('settings')}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      <main className="container">
        {page}
      </main>
    </div>
  );
}

export default App;
