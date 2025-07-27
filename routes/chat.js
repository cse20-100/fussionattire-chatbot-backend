const express = require('express');
const router = express.Router();
const { getAIReply } = require('../ai/openai');
const { getOrder, getProduct, createRefund } = require('../shopify/shopify');

// Basic intent detection (expand or improve as needed)
function detectIntent(message) {
  if (/order status|track order|where.*order/i.test(message)) return 'order_status';
  if (/refund|money back|return/i.test(message)) return 'refund';
  if (/product|item|stock/i.test(message)) return 'product';
  return 'chat';
}

router.post('/', async (req, res) => {
  const { message, order_id, product_id } = req.body;
  const intent = detectIntent(message || '');

  try {
    if (intent === 'order_status' && order_id) {
      const order = await getOrder(order_id);
      if (order) {
        return res.json({
          reply: `Order #${order.order_number} is currently ${order.fulfillment_status || 'pending fulfillment'}.`
        });
      } else {
        return res.json({ reply: 'Sorry, I could not find that order.' });
      }
    }

    if (intent === 'refund' && order_id) {
      // NOTE: You should validate if the order is eligible for refund before proceeding!
      const refund = await createRefund(order_id, {}); // Pass required refundData here
      if (refund) {
        return res.json({ reply: 'Your refund request has been processed successfully.' });
      } else {
        return res.json({ reply: 'Could not process refund at the moment.' });
      }
    }

    if (intent === 'product' && product_id) {
      const product = await getProduct(product_id);
      if (product) {
        return res.json({ reply: `Product: ${product.title}, Price: ${product.variants[0].price}` });
      } else {
        return res.json({ reply: 'Sorry, I could not find that product.' });
      }
    }

    // Fallback to AI
    const aiReply = await getAIReply(message);
    return res.json({ reply: aiReply });
  } catch (err) {
    return res.status(500).json({ reply: "Internal server error." });
  }
});

module.exports = router;