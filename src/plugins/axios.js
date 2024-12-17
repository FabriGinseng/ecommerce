// src/plugins/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com', // Base URL per DummyJSON
  timeout: 10000, // Timeout in millisecondi
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor per aggiungere header dinamici (es. autenticazione futura)
apiClient.interceptors.request.use(
  (config) => {
    // Puoi aggiungere token dinamici o altri header qui
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor per gestire errori globali
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Errore API:', error.response);
    } else {
      console.error('Errore di rete:', error.message);
    }
    return Promise.reject(error);
  }
);

// Funzione per registrare tutte le REST API richieste
const api = {
  getProducts({category = '', search = '', limit = 10, skip = 0 } = {}) {
    if (search) {
      return apiClient.get(`/products/search`, {
        params: { q: search, limit, skip },
      });
    }
    const categoryPath = category ? `/category/${category}` : '';
    return apiClient.get(`/products${categoryPath}`, {
      params: { limit, skip },
    });
  },

  getProductById(productId) {
    // Recupera i dettagli di un singolo prodotto
    return apiClient.get(`/products/${productId}`);
  },
  createProduct(productData) {
    // Crea un nuovo prodotto
    return apiClient.post('/products/add', productData);
  },
  updateProduct(productId, productData) {
    // Aggiorna un prodotto esistente
    return apiClient.put(`/products/${productId}`, productData);
  },
  deleteProduct(productId) {
    // Elimina un prodotto
    return apiClient.delete(`/products/${productId}`);
  },
  getCategories() {
    // Recupera l'elenco delle categorie
    return apiClient.get('/products/categories');
  },
};

export default api;
