<template>
  <div class="text-center">
    <v-overlay
      :model-value="loaderStore.isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { useLoaderStore } from "@/stores/loader.js";
const loaderStore = useLoaderStore();
</script>
