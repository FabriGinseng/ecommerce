import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: '',          // Messaggio della notifica
    type: 'success',      // Tipo: 'success' o 'error'
    show: false,          // Controlla la visualizzazione della notifica
  }),
  actions: {
    // Mostra un messaggio di successo
    showSuccess(message) {
      this.message = message;
      this.type = 'success';
      this.show = true;
    },
    // Mostra un messaggio di errore
    showError(message) {
      this.message = message;
      this.type = 'error';
      this.show = true;
    },
    // Nasconde la notifica
    hideNotification() {
      this.show = false;
      this.message = '';
    },
  },
});
