const axios = require('axios');

const SHOP = process.env.SHOPIFY_STORE;
const ADMIN_API_KEY = process.env.SHOPIFY_API_KEY;
const ADMIN_API_SECRET = process.env.SHOPIFY_API_SECRET;
const API_VERSION = '2023-01';

const shopifyAxios = axios.create({
  baseURL: `https://${SHOP}.myshopify.com/admin/api/${API_VERSION}/`,
  auth: {
    username: ADMIN_API_KEY,
    password: ADMIN_API_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getOrder(orderId) {
  try {
    const response = await shopifyAxios.get(`orders/${orderId}.json`);
    return response.data.order;
  } catch (err) {
    return null;
  }
}

async function getProduct(productId) {
  try {
    const response = await shopifyAxios.get(`products/${productId}.json`);
    return response.data.product;
  } catch (err) {
    return null;
  }
}

async function createRefund(orderId, refundData) {
  try {
    const response = await shopifyAxios.post(`orders/${orderId}/refunds.json`, refundData);
    return response.data.refund;
  } catch (err) {
    return null;
  }
}

module.exports = { getOrder, getProduct, createRefund };