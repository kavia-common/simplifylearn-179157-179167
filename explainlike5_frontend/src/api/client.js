const DEFAULT_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * PUBLIC_INTERFACE
 * fetchExplanations
 * Placeholder API call to get explanations for a topic.
 * Replace with real backend integration. Uses environment variable REACT_APP_API_BASE_URL.
 *
 * @param {string} topic - The input topic text
 * @returns {Promise<{ ELI5: string, ELI15: string, Expert: string }>}
 */
export async function fetchExplanations(topic) {
  // For now, return mocked data to keep dependencies minimal.
  const short = topic.length > 100 ? topic.slice(0, 97) + '…' : topic;
  return {
    ELI5: `Like you're five: ${short}. Imagine it's a playground rule explained simply.`,
    ELI15: `For a teen: ${short}. We'll separate ideas into clear pieces and logic.`,
    Expert: `With rigor: ${short}. Include precise terms, caveats, and limitations.`,
  };

  // Example shape for future integration:
  // const res = await fetch(`${DEFAULT_BASE_URL}/explain`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ topic }),
  // });
  // if (!res.ok) throw new Error('Failed to fetch explanations');
  // return res.json();
}

/**
 * PUBLIC_INTERFACE
 * getApiBaseUrl
 * Returns the configured API base URL from environment.
 */
export function getApiBaseUrl() {
  return DEFAULT_BASE_URL;
}
