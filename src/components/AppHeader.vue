<template>
  <v-app-bar
    app
    flat
    dark
    elevation="2"
  >
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
      :label="$t('searchProducts')"
      :placeholder="$t('searchPlacheholder')"
      prepend-inner-icon="mdi-magnify"
      variant="solo"
      hide-details
      hide-no-data
      clearable
      @update:model-value="onProductSelect"
      @update:search="handleSearchInput"
    />
    <!-- Icone -->
    <template #append>
      <v-btn
        color="primary"
        icon="mdi-magnify"
        @click="searchVisible = !searchVisible"
      />
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>
          {{ isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
        </v-icon>
      </v-btn>

      <v-btn
        icon
        color="primary"
        @click="toggleLanguage"
      >
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          <span v-if="currentLocale === 'en'">
            Italian
          </span>
          <span v-else>
            English
          </span>
        </v-tooltip>
        <v-icon>
          {{ currentLocale === 'en' ? 'mdi-flag' : 'mdi-flag-outline' }}
        </v-icon>
      </v-btn>
      <v-btn
        color="primary"
        icon="mdi-cart"
        @click="openCartSidebar"
      />
    </template>
  </v-app-bar>
</template>


<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cartStore.js";
import { useProductsStore } from "@/stores/productsStore.js";
import router from "@/router/index.js";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";

const theme = useTheme();
const { locale } = useI18n();

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

// Apri il carrello
const openCartSidebar = () => {
  cartStore.toggleCartSidebar();
};

// Stato per verificare se il tema attuale è scuro
const isDark = computed(() => theme.global.name.value === "dark");

// Funzione per alternare tra temi scuro e chiaro
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};

// Stato corrente della lingua
const currentLocale = computed(() => locale.value);

// Funzione per alternare la lingua
const toggleLanguage = () => {
  locale.value = currentLocale.value === "en" ? "it" : "en";
};
</script>

<style scoped>
.v-autocomplete {
  max-width: 300px;
}
</style>
