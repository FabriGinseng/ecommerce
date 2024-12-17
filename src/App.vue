<template>
  <v-app theme="light">
    <AppHeader/>
    <v-main>
      <v-navigation-drawer
        v-model="openCartSide"
        location="right"
        mobile
        touchless
      >

        <v-divider></v-divider>
        <Cart />
      </v-navigation-drawer>
      <Loader v-if="useLoaderStore().isLoading" />
      <NotificationComponent />
      <ConfirmDialog />
      <router-view/>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import {useLoaderStore} from "@/stores/loader.js";
import {useCartStore} from "@/stores/cartStore.js";
import { computed } from "vue";

const openCartSide = computed(() => useCartStore().cartSidebarOpen);
</script>
