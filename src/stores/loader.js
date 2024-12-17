// stores/loaderStore.js
import { defineStore } from 'pinia';
import {useNotificationStore} from "@/stores/notification.js";

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: false, // Stato del loader
  }),
  getters: {
    isLoading: (state) => state.loading, // Getter per accedere allo stato
  },
  actions: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    },
    async withLoader(callback, errorMessage = '') {
      const notificationStore = useNotificationStore();
      // Funzione helper per eseguire operazioni con loader
      this.startLoading();
      try {
        await callback();
      } catch (error) {
        console.error('Errore durante l’operazione con loader:', error);
        notificationStore.showError(errorMessage);
      } finally {
        this.stopLoading();
      }
    },
  },
});
