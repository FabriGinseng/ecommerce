<template>
  <v-app-bar app flat dark elevation="2">
    <!-- Logo cliccabile -->
    <template #prepend>
      <v-img
        style="cursor: pointer"
        height="50"
        width="50"
        src="https://img.logoipsum.com/332.svg"
        @click="router.push({ name: 'Home' })"
      />
    </template>
    <v-app-bar-title>E-Commerce</v-app-bar-title>
    <v-autocomplete
      v-if="searchVisible"
      v-model="searchQuery"
      :items="searchResults"
      class="mt-2"
      density="comfortable"
      menu-icon=""
      label="Cerca un prodotto..."
      placeholder="Digita per cercare..."
      prepend-inner-icon="mdi-magnify"
      variant="solo"
      hide-details
      hide-no-data
      clearable
      @update:model-value="onProductSelect"
      @update:search="handleSearchInput"
    ></v-autocomplete>
    <!-- Icona Carrello -->
    <template #append>
      <v-btn
        color="primary"
        icon="mdi-magnify"
        @click="searchVisible = !searchVisible" />
      <v-btn
        color="primary"
        icon="mdi-cart"
        @click="openCartSidebar"
      />
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/cartStore.js";
import { useProductsStore } from "@/stores/productsStore.js";
import router from "@/router/index.js";

const cartStore = useCartStore();
const productsStore = useProductsStore();

const searchQuery = ref(""); // Valore dell'input nella barra di ricerca
const searchResults = ref([]); // Array con i risultati della ricerca
const searchVisible = ref(false);
// Funzione per gestire l'input con debounce
let debounceTimeout;
const handleSearchInput = (query) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    const results = await productsStore.searchProducts(query);
    searchResults.value = results || [];
  }, 300); // 300ms debounce
};

// Naviga alla pagina del prodotto selezionato
const onProductSelect = (product) => {
  if (product?.id) {
    router.push({ name: "ProductDetails", params: { id: product.id } });
    searchQuery.value = ""; // Resetta il campo di ricerca
    searchResults.value = [];
  }
};

// Apri il carrello
const openCartSidebar = () => {
  cartStore.toggleCartSidebar();
};
</script>

<style scoped>
.v-autocomplete {
  max-width: 300px;
}
</style>
