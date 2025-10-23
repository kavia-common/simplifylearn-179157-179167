import React, { useState } from 'react';
import TopicForm from '../components/TopicForm';
import ExplanationTabs from '../components/ExplanationTabs';

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

  const generatePlaceholder = (topic) => {
    // Simulated generation for demo; replace with API call later
    const short = topic.length > 80 ? topic.slice(0, 77) + '…' : topic;
    return {
      ELI5: `Imagine you're five: ${short}. Think of it like a simple story with familiar objects.`,
      ELI15: `For a curious teen: ${short}. Let's break it down into clear steps, causes, and effects.`,
      Expert: `For experts: ${short}. We'll delve into definitions, assumptions, and trade-offs. Consider edge cases and formal terminology where appropriate.`,
    };
  };

  const handleSubmit = async (topic) => {
    setLoading(true);
    try {
      // Placeholder: simulate latency
      await new Promise((r) => setTimeout(r, 350));
      const data = generatePlaceholder(topic);
      setExplanations({ topic, ...data });
      onGenerated({ topic, createdAt: new Date().toISOString(), preview: data.ELI5 });
    } catch (e) {
      // In a later iteration, show toast; for now, simple alert
      // eslint-disable-next-line no-alert
      alert('Failed to generate explanation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero">
      <div>
        <TopicForm onSubmit={handleSubmit} />
        {explanations && (
          <div className="mt-16">
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
        {!explanations && (
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
