import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import { useLoaderStore } from "@/stores/loader.js";
import { useNotificationStore } from "@/stores/notification.js"; // Import del notification store

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    productsPages: 0,
    categories: [],
    selectedCategory: '',
    searchQuery: '',
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProductsPages(state) {
      return state.productsPages;
    },
    getCategories(state) {
      return state.categories;
    },
  },
  actions: {
    async fetchProducts(category = '', search = '', limit = 10, skip = 0) {
      const loaderStore = useLoaderStore();
      const notificationStore = useNotificationStore();
      try {
        await loaderStore.withLoader(async () => {
          const response = await api.getProducts({ category, search, limit, skip });
          this.productsPages = Math.ceil(response.data.total / response.data.limit) ?? 0;
          this.products = response.data.products;
        }, 'Errore nel recupero dei prodotti.');
      } catch (error) {
        console.error('Errore nel recupero prodotti:', error);
        notificationStore.showError('Errore nel caricamento dei prodotti.');
      }
    },

    async fetchProductById(id) {
      const notificationStore = useNotificationStore();
      try {
        const loaderStore = useLoaderStore();
        let result = null
        await loaderStore.withLoader(async () => {
          const response = await api.getProductById(id);
          result = response.data; // Restituisce il prodotto singolo
        }, 'Errore nel recupero del prodotto.');
        return result;
      } catch (error) {
        console.error('Errore nel recupero prodotto:', error);
        notificationStore.showError('Errore nel recupero del prodotto.');
      }
    },

    async fetchCategories() {
      const loaderStore = useLoaderStore();
      const notificationStore = useNotificationStore();
      try {
        await loaderStore.withLoader(async () => {
          const response = await api.getCategories();
          this.categories = response.data;
        }, 'Errore nel recupero delle categorie.');
      } catch (error) {
        console.error('Errore nel recupero categorie:', error);
        notificationStore.showError('Errore nel caricamento delle categorie.');
      }
    },

    async createProduct(product) {
      const loaderStore = useLoaderStore();
      try {
        await loaderStore.withLoader(async () => {
          try {
            const response = await api.createProduct(product);
            this.products.push(response.data);
            if (response.status === 200) useNotificationStore().showSuccess('Prodotto creato con successo!');
          } catch (error) {
            console.error('Errore nella creazione prodotto:', error);
            useNotificationStore().showError('Errore durante la creazione del prodotto.');
          }
        }, 'Errore nella creazione del prodotto.');
      } catch (error) {
        console.error('Errore nella creazione prodotto:', error);
      }
    },

    async updateProduct(id, productData) {
      const loaderStore = useLoaderStore();
      try {
        await loaderStore.withLoader(async () => {
          await api.updateProduct(id, productData);
          const index = this.products.findIndex((p) => p.id === id);
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...productData };
          }
        }, 'Errore nella modifica del prodotto.');
      } catch (error) {
        console.error('Errore nella modifica prodotto:', error);
      }
    },

    async deleteProduct(id) {
      const loaderStore = useLoaderStore();
      const notificationStore = useNotificationStore();
      try {
        await loaderStore.withLoader(async () => {
            await api.deleteProduct(id);
            this.products = this.products.filter((p) => p.id !== id);
            notificationStore.showSuccess('Prodotto eliminato con successo!');
        }, 'Errore nell’eliminazione del prodotto.');
      } catch (error) {
        console.error('Errore nella cancellazione prodotto:', error);
        notificationStore.showError('Errore nell’eliminazione del prodotto. ');
      }
    },

    async searchProducts(query) {
      this.searchQuery = query;
      await this.fetchProducts('', query);
    },
  },
});
