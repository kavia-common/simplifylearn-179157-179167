const DEFAULT_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Build a URL with optional query params
 */
function buildUrl(path, params) {
  const url = new URL(path.startsWith('http') ? path : `${DEFAULT_BASE_URL}${path}`);
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

/**
 * Handle JSON responses and throw on !ok
 */
async function handleJson(res) {
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // ignore parse error; will throw generic below
  }
  if (!res.ok) {
    const detail = data?.detail || res.statusText || 'Request failed';
    const err = new Error(detail);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

/**
 * PUBLIC_INTERFACE
 * getApiBaseUrl
 * Returns the configured API base URL from environment.
 */
export function getApiBaseUrl() {
  return DEFAULT_BASE_URL;
}

/**
 * PUBLIC_INTERFACE
 * createExplanations
 * Calls POST /explanations to create topic and generate explanations.
 * @param {{topic_title: string, topic_content: string, levels?: ('ELI5'|'ELI15'|'EXPERT')[]}} payload
 * @returns {Promise<{topic: any, explanations: any[]}>}
 */
export async function createExplanations(payload) {
  const res = await fetch(buildUrl('/explanations'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

/**
 * PUBLIC_INTERFACE
 * fetchHistory
 * Calls GET /history to list topics.
 * @param {{limit?: number, offset?: number}} params
 * @returns {Promise<{items: any[], total: number, limit: number, offset: number}>}
 */
export async function fetchHistory(params = {}) {
  const res = await fetch(buildUrl('/history', params));
  return handleJson(res);
}

/**
 * PUBLIC_INTERFACE
 * fetchTopic
 * Calls GET /topics/{id} to fetch topic with explanations.
 * @param {number|string} id
 * @returns {Promise<any>}
 */
export async function fetchTopic(id) {
  const res = await fetch(buildUrl(`/topics/${id}`));
  return handleJson(res);
}

/**
 * PUBLIC_INTERFACE
 * regenerateExplanation
 * Calls POST /explanations/{topic_id}/regenerate?level=ELI5|ELI15|EXPERT
 * @param {number|string} topicId
 * @param {'ELI5'|'ELI15'|'EXPERT'} level
 * @returns {Promise<{topic_id: number, explanation: any}>}
 */
export async function regenerateExplanation(topicId, level) {
  const res = await fetch(buildUrl(`/explanations/${topicId}/regenerate`, { level }), {
    method: 'POST',
  });
  return handleJson(res);
}

/**
 * PUBLIC_INTERFACE
 * mapApiLevelsToUI
 * Backend uses EXPERT; UI uses 'Expert'. Convert to UI keys.
 * @param {Array<{level: 'ELI5'|'ELI15'|'EXPERT', text: string}>} explanations
 * @returns {{ELI5?: string, ELI15?: string, Expert?: string}}
 */
export function mapApiLevelsToUI(explanations = []) {
  const out = {};
  for (const e of explanations) {
    const key = e.level === 'EXPERT' ? 'Expert' : e.level;
    out[key] = e.text;
  }
  return out;
}
