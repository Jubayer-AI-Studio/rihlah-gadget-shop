interface Env {
  RIHLAH_STATS: any;
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;
  try {
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dhaka' });
    let stats = {
      totalVisits: 0,
      todayVisits: 0,
      lastDate: todayStr,
      pwaInstalls: 0,
      addToCart: 0,
      whatsappClicks: 0
    };

    if (env.RIHLAH_STATS) {
      const raw = await env.RIHLAH_STATS.get('stats_summary');
      if (raw) {
        stats = { ...stats, ...JSON.parse(raw) };
      }
    }

    if (stats.lastDate !== todayStr) {
      stats.todayVisits = 0;
      stats.lastDate = todayStr;
      if (env.RIHLAH_STATS) {
        await env.RIHLAH_STATS.put('stats_summary', JSON.stringify(stats));
      }
    }

    return new Response(JSON.stringify({ success: true, stats }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  try {
    const body: any = await request.json().catch(() => ({}));
    const event = body.event; // 'visit' | 'install' | 'cart' | 'whatsapp'
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dhaka' });

    let stats = {
      totalVisits: 0,
      todayVisits: 0,
      lastDate: todayStr,
      pwaInstalls: 0,
      addToCart: 0,
      whatsappClicks: 0
    };

    if (env.RIHLAH_STATS) {
      const raw = await env.RIHLAH_STATS.get('stats_summary');
      if (raw) {
        stats = { ...stats, ...JSON.parse(raw) };
      }
    }

    if (stats.lastDate !== todayStr) {
      stats.todayVisits = 0;
      stats.lastDate = todayStr;
    }

    if (event === 'visit') {
      stats.totalVisits = (stats.totalVisits || 0) + 1;
      stats.todayVisits = (stats.todayVisits || 0) + 1;
    } else if (event === 'install') {
      stats.pwaInstalls = (stats.pwaInstalls || 0) + 1;
    } else if (event === 'cart') {
      stats.addToCart = (stats.addToCart || 0) + 1;
    } else if (event === 'whatsapp') {
      stats.whatsappClicks = (stats.whatsappClicks || 0) + 1;
    }

    if (env.RIHLAH_STATS) {
      await env.RIHLAH_STATS.put('stats_summary', JSON.stringify(stats));
    }

    return new Response(JSON.stringify({ success: true, stats }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
