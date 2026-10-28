// Client-side analytics tracker for Rihlah Gadget Shop

export async function trackEvent(event: 'visit' | 'install' | 'cart' | 'whatsapp') {
  if (typeof window === 'undefined') return;

  // For visits, deduplicate within same browser tab/session
  if (event === 'visit') {
    const sessionTracked = sessionStorage.getItem('rihlah_visited');
    if (sessionTracked) return;
    sessionStorage.setItem('rihlah_visited', 'true');
  }

  // Update local counter fallback
  try {
    const local = JSON.parse(localStorage.getItem('rihlah_local_stats') || '{}');
    local[event] = (local[event] || 0) + 1;
    localStorage.setItem('rihlah_local_stats', JSON.stringify(local));
  } catch (e) {}

  // Post to Cloudflare Pages edge function
  try {
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event }),
    }).catch(() => {});
  } catch (err) {}
}

export async function getLiveStats() {
  const defaultStats = {
    totalVisits: 0,
    todayVisits: 0,
    pwaInstalls: 0,
    addToCart: 0,
    whatsappClicks: 0,
  };

  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    if (data.success && data.stats) {
      return data.stats;
    }
  } catch (err) {
    console.warn('Failed to fetch live stats from server:', err);
  }

  // Fallback to local stats if server not reachable
  try {
    const local = JSON.parse(localStorage.getItem('rihlah_local_stats') || '{}');
    return {
      totalVisits: local.visit || 0,
      todayVisits: local.visit || 0,
      pwaInstalls: local.install || 0,
      addToCart: local.cart || 0,
      whatsappClicks: local.whatsapp || 0,
    };
  } catch (e) {}

  return defaultStats;
}
