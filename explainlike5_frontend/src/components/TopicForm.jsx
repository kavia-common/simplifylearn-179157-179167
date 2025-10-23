import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TopicForm component
 * Props:
 *  - onSubmit: (topic: string) => void
 */
function TopicForm({ onSubmit = () => {} }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = topic.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <div className="topic-card">
      <div className="topic-title">Paste a topic to simplify</div>
      <div className="topic-sub">We’ll progressively explain it at different levels: ELI5, ELI15, and Expert.</div>
      <form onSubmit={handleSubmit} className="input-wrap">
        <textarea
          className="textarea"
          placeholder="Paste a complex paragraph, problem, or description..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div className="controls">
          <span className="hint">Tip: Paste 1–3 paragraphs for best results.</span>
          <div>
            <button type="button" className="btn btn-secondary" onClick={() => setTopic('What is quantum entanglement and why does it matter?')}>
              Sample
            </button>
            <button type="submit" className="btn btn-primary" style={{ marginLeft: 8 }}>
              Generate
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TopicForm;
