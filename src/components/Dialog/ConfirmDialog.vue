<template>
  <v-dialog v-model="isOpen" persistent max-width="400px">
    <v-card>
      <!-- Titolo Dialog -->
      <v-card-title class="text-h6">{{ title }}</v-card-title>

      <!-- Contenuto Dialog -->
      <v-card-text>{{ message }}</v-card-text>

      <!-- Pulsanti Azione -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="handleCancel">{{ cancelText }}</v-btn>
        <v-btn color="green" @click="handleConfirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialog.js';

// Usa lo store Pinia
const dialogStore = useDialogStore();
const { isOpen, title, message, confirmText, cancelText, onConfirm, onCancel } = storeToRefs(dialogStore);

// Gestione dei pulsanti
const handleConfirm = () => {
  if (onConfirm.value) onConfirm.value();
  dialogStore.closeDialog();
};

const handleCancel = () => {
  if (onCancel.value) onCancel.value();
  dialogStore.closeDialog();
};
</script>

<style scoped>
.v-card {
  text-align: center;
}
</style>
