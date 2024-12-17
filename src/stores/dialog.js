import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialogStore', {
  state: () => ({
    isOpen: false,
    title: 'Conferma Azione', // Titolo predefinito
    message: 'Sei sicuro di voler procedere?', // Messaggio predefinito
    confirmText: 'Conferma', // Testo pulsante conferma
    cancelText: 'Annulla',   // Testo pulsante annulla
    onConfirm: null, // Callback per conferma
    onCancel: null,  // Callback per annulla
  }),
  actions: {
    openDialog({ title, message, confirmText, cancelText, onConfirm, onCancel }) {
      this.isOpen = true;
      this.title = title || 'Conferma Azione';
      this.message = message || 'Sei sicuro di voler procedere?';
      this.confirmText = confirmText || 'Conferma';
      this.cancelText = cancelText || 'Annulla';
      this.onConfirm = onConfirm || null;
      this.onCancel = onCancel || null;
    },
    closeDialog() {
      this.isOpen = false;
      this.onConfirm = null;
      this.onCancel = null;
    },
  },
});
