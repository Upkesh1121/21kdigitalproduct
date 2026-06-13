import { cashfreeBaseUrl, cashfreeHeaders, getOrder, json, requireConfig, updateOrder, upsertBuyer } from '../_shared.js'

const fetchCashfreeOrder = async (env, orderId) => {
  const response = await fetch(`${cashfreeBaseUrl(env)}/orders/${encodeURIComponent(orderId)}`, {
    headers: cashfreeHeaders(env),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Could not verify payment with Cashfree.')
  }

  return data
}

export async function onRequestGet({ request, env }) {
  try {
    requireConfig(env, ['CASHFREE_APP_ID', 'CASHFREE_SECRET_KEY', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    const url = new URL(request.url)
    const orderId = url.searchParams.get('order_id')
    if (!orderId) return json({ error: 'Missing order_id.' }, 400)

    const localOrder = await getOrder(env, orderId)
    if (!localOrder) return json({ error: 'Order not found.' }, 404)

    if (localOrder.status === 'paid') {
      await upsertBuyer(env, localOrder.email, 'buyer')
      return json({ paid: true, unlocked: true, email: localOrder.email })
    }

    const cashfreeOrder = await fetchCashfreeOrder(env, orderId)
    const orderStatus = String(cashfreeOrder.order_status || '').toUpperCase()

    if (orderStatus !== 'PAID') {
      await updateOrder(env, orderId, { status: orderStatus ? orderStatus.toLowerCase() : 'pending' })
      return json({ paid: false, unlocked: false, status: orderStatus || 'PENDING' })
    }

    await updateOrder(env, orderId, {
      status: 'paid',
      cf_payment_id: cashfreeOrder.cf_payment_id ? String(cashfreeOrder.cf_payment_id) : null,
    })
    await upsertBuyer(env, localOrder.email, 'buyer')

    return json({ paid: true, unlocked: true, email: localOrder.email })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestPost = () => json({ error: 'Method not allowed' }, 405)
