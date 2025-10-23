import React from 'react';

/**
 * PUBLIC_INTERFACE
 * History page
 * Props:
 *  - items: Array<{ id, topic, createdAt, preview }>
 *  - onSelect: (item) => void
 */
function History({ items = [], onSelect = () => {} }) {
  return (
    <div>
      <div className="topic-title">History</div>
      <div className="topic-sub">Recent topics you generated (local only in this demo).</div>
      <div className="list mt-12">
        {items.length === 0 && (
          <div className="list-item">
            <div className="small">No history yet. Generate an explanation to see it here.</div>
          </div>
        )}
        {items.map((it) => (
          <div key={it.id} className="list-item">
            <div style={{ fontWeight: 700 }}>{it.topic.slice(0, 120)}{it.topic.length > 120 ? '…' : ''}</div>
            <div className="small">On {new Date(it.createdAt).toLocaleString()}</div>
            {it.preview && <div className="small" style={{ marginTop: 6, color: '#374151' }}>{it.preview}</div>}
            <div style={{ marginTop: 8 }}>
              <button className="btn btn-primary" onClick={() => onSelect(it)}>Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
