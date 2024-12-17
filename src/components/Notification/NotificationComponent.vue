<template>
  <v-snackbar
    v-model="notificationStore.show"
    :color="notificationStore.type === 'success' ? 'green' : 'red'"
    timeout="3000"
    location="top"
    multi-line
  >
    {{ notificationStore.message }}
    <template v-slot:action>
      <v-btn
        color="white"
        variant="text"
        @click="notificationStore.hideNotification"
      >
        Chiudi
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useNotificationStore } from "@/stores/notification.js";

export default {
  setup() {
    const notificationStore = useNotificationStore();
    return { notificationStore };
  },
};
</script>
