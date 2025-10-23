import React, { useState } from 'react';
import TopicForm from '../components/TopicForm';
import ExplanationTabs from '../components/ExplanationTabs';
import {
  createExplanations,
  regenerateExplanation,
  mapApiLevelsToUI,
} from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Home page: allows topic submission and displays explanations
 * Props:
 *  - onGenerated: (historyItem) => void
 *  - prefs: { compactCards: boolean, showAdvancedTips: boolean }
 */
function Home({ onGenerated = () => {}, prefs = {} }) {
  const [active, setActive] = useState('ELI5');
  const [explanations, setExplanations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [regenLoading, setRegenLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topicMeta, setTopicMeta] = useState(null); // { id, title, content, created_at }

  const toast = (msg, isError = false) => {
    // Simple toast using alert-like non-blocking pattern
    // In a real app, replace with a proper toast system
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.position = 'fixed';
    el.style.bottom = '16px';
    el.style.right = '16px';
    el.style.padding = '10px 12px';
    el.style.borderRadius = '10px';
    el.style.color = isError ? '#fff' : '#111827';
    el.style.background = isError ? '#EF4444' : '#F59E0B';
    el.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
    el.style.fontWeight = '700';
    el.style.zIndex = 1000;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  };

  const handleSubmit = async (topic) => {
    setLoading(true);
    setError(null);
    setExplanations(null);
    try {
      const payload = {
        topic_title: topic.slice(0, 60),
        topic_content: topic,
        levels: ['ELI5', 'ELI15', 'EXPERT'],
      };
      const resp = await createExplanations(payload);
      const uiMap = mapApiLevelsToUI(resp.explanations);
      setExplanations({
        ELI5: uiMap.ELI5 || '',
        ELI15: uiMap.ELI15 || '',
        Expert: uiMap.Expert || '',
      });
      setTopicMeta(resp.topic);
      setActive('ELI5');
      onGenerated({
        topic: resp.topic.title || topic,
        createdAt: resp.topic.created_at || new Date().toISOString(),
        preview: uiMap.ELI5 || '',
        id: resp.topic.id,
      });
      toast('Explanations generated');
    } catch (e) {
      setError(e?.message || 'Failed to generate explanation');
      toast(e?.message || 'Failed to generate explanation', true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!topicMeta?.id) return;
    setRegenLoading(true);
    try {
      const level = active === 'Expert' ? 'EXPERT' : active;
      const resp = await regenerateExplanation(topicMeta.id, level);
      const lvl = resp?.explanation?.level;
      const key = lvl === 'EXPERT' ? 'Expert' : lvl;
      const text = resp?.explanation?.text || '';
      setExplanations((prev) => ({ ...(prev || {}), [key]: text }));
      toast(`Regenerated ${key}`);
    } catch (e) {
      toast(e?.message || 'Failed to regenerate', true);
    } finally {
      setRegenLoading(false);
    }
  };

  return (
    <div className="hero">
      <div>
        <TopicForm onSubmit={handleSubmit} />
        {loading && (
          <div className="mt-16 sample-card">
            <div className="topic-title">Generating…</div>
            <div className="small">Please wait while we simplify your topic.</div>
          </div>
        )}
        {error && !loading && (
          <div className="mt-16 sample-card" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            <div className="topic-title" style={{ color: '#EF4444' }}>Error</div>
            <div className="small">{error}</div>
          </div>
        )}
        {explanations && !loading && (
          <div className="mt-16">
            <div className="controls" style={{ marginBottom: 8 }}>
              <span className="hint">
                Topic ID: {topicMeta?.id} • Created {topicMeta?.created_at ? new Date(topicMeta.created_at).toLocaleString() : 'now'}
              </span>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleRegenerate}
                  disabled={regenLoading}
                  title="Regenerate the current level"
                >
                  {regenLoading ? 'Regenerating…' : `Regenerate ${active}`}
                </button>
              </div>
            </div>
            <ExplanationTabs
              active={active}
              onChange={setActive}
              data={{
                ELI5: explanations.ELI5,
                ELI15: explanations.ELI15,
                Expert: explanations.Expert,
              }}
            />
          </div>
        )}
        {!explanations && !loading && (
          <div className="mt-16 sample-card">
            <div className="topic-title">No output yet</div>
            <div className="small">
              Paste a topic and click Generate, or press Sample to try a prefilled prompt.
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="sample-card">
          <div className="topic-title">What is ExplainLike5?</div>
          <div className="topic-sub">
            Progressive explanations with increasing depth:
          </div>
          <ul className="small" style={{ marginTop: 8 }}>
            <li>ELI5: Analogy-first, plain language</li>
            <li>ELI15: Structured details and dependencies</li>
            <li>Expert: Precise terms, caveats and breadth</li>
          </ul>
          {prefs?.showAdvancedTips && (
            <div className="mt-12 small">
              Pro tip: Provide context (use-case, audience, constraints) to tailor the explanation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
