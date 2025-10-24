import React, { useEffect, useState } from 'react';
import { fetchHistory, fetchTopic, mapApiLevelsToUI } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * History page
 * Props:
 *  - items: Array<{ id, topic, createdAt, preview }>
 *  - onSelect: (item) => void
 */
function History({ items = [], onSelect = () => {} }) {
  const [loading, setLoading] = useState(false);
  const [remote, setRemote] = useState({ items: [], total: 0, limit: 10, offset: 0 });
  const [error, setError] = useState(null);

  const toast = (msg, isError = false) => {
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.position = 'fixed';
    el.style.bottom = '16px';
    el.style.right = '16px';
    el.style.padding = '10px 12px';
    el.style.borderRadius = '10px';
    el.style.color = isError ? '#0f0f10' : '#0f0f10';
    el.style.background = isError ? '#f5f5f5' : '#cccccc';
    el.style.boxShadow = '0 10px 20px rgba(0,0,0,0.45)';
    el.style.fontWeight = '700';
    el.style.zIndex = 1000;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHistory({ limit: 10, offset: 0 });
        if (!active) return;
        setRemote(data);
      } catch (e) {
        if (!active) return;
        setError(e?.message || 'Failed to load history');
        toast(e?.message || 'Failed to load history', true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const openTopic = async (id) => {
    try {
      const topic = await fetchTopic(id);
      const ui = mapApiLevelsToUI(topic.explanations || []);
      const item = {
        id: topic.id,
        topic: topic.title,
        createdAt: topic.created_at,
        preview: ui.ELI5 || '',
      };
      toast('Topic loaded');
      onSelect(item);
    } catch (e) {
      toast(e?.message || 'Failed to load topic', true);
    }
  };

  const hasLocal = items && items.length > 0;

  return (
    <div>
      <div className="topic-title">History</div>
      <div className="topic-sub">Your recent topics from the server. Local items shown first if available.</div>

      {loading && (
        <div className="mt-12 list-item">
          <div className="small">Loading history…</div>
        </div>
      )}
      {error && (
        <div className="mt-12 list-item" style={{ borderColor: 'rgba(255,255,255,0.28)' }}>
          <div className="small" style={{ color: '#f5f5f5' }}>{error}</div>
        </div>
      )}

      <div className="list mt-12">
        {!loading && !hasLocal && (remote.items?.length || 0) === 0 && (
          <div className="list-item">
            <div className="small">No history yet. Generate an explanation to see it here.</div>
          </div>
        )}

        {hasLocal &&
          items.map((it) => (
            <div key={`local-${it.id}`} className="list-item">
              <div style={{ fontWeight: 700 }}>
                {String(it.topic).slice(0, 120)}
                {String(it.topic).length > 120 ? '…' : ''}
              </div>
              <div className="small">On {new Date(it.createdAt).toLocaleString()}</div>
              {it.preview && (
                <div className="small" style={{ marginTop: 6, color: '#c7c7c7' }}>{it.preview}</div>
              )}
              <div style={{ marginTop: 8 }}>
                <button className="btn btn-primary" onClick={() => onSelect(it)}>Open</button>
              </div>
            </div>
          ))}

        {(remote.items || []).map((it) => (
          <div key={`remote-${it.id}`} className="list-item">
            <div style={{ fontWeight: 700 }}>
              {String(it.title).slice(0, 120)}
              {String(it.title).length > 120 ? '…' : ''}
            </div>
            <div className="small">On {new Date(it.created_at).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}>
              <button className="btn btn-primary" onClick={() => openTopic(it.id)}>Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
