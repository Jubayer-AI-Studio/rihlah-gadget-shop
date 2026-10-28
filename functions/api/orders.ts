interface Env {
  RIHLAH_STATS: any;
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;
  try {
    let orders: any[] = [];
    if (env.RIHLAH_STATS) {
      const raw = await env.RIHLAH_STATS.get('customer_orders');
      if (raw) {
        orders = JSON.parse(raw);
      }
    }
    return new Response(JSON.stringify({ success: true, orders }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message, orders: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  try {
    const orderData: any = await request.json();
    let orders: any[] = [];
    if (env.RIHLAH_STATS) {
      const raw = await env.RIHLAH_STATS.get('customer_orders');
      if (raw) {
        orders = JSON.parse(raw);
      }
    }

    orders.unshift(orderData);
    if (orders.length > 500) {
      orders.length = 500;
    }

    if (env.RIHLAH_STATS) {
      await env.RIHLAH_STATS.put('customer_orders', JSON.stringify(orders));
    }

    return new Response(JSON.stringify({ success: true, order: orderData }), {
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
