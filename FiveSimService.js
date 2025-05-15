// services/fivesimService.js
const axios = require('axios');

class FiveSimService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://5sim.net/v1';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
  }

  async getCountries() {
    try {
      const response = await this.client.get('/guest/countries');
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  async getProducts(country, operator) {
    try {
      const response = await this.client.get(`/guest/products/${country}/${operator}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async buyNumber(userId, country, operator, product) {
    try {
      const response = await this.client.get(`/user/buy/activation/${country}/${operator}/${product}`);
      return response.data;
    } catch (error) {
      console.error('Error buying number:', error);
      throw error;
    }
  }

  async checkOrder(orderId) {
    try {
      const response = await this.client.get(`/user/check/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking order:', error);
      throw error;
    }
  }
}

module.exports = FiveSimService;
