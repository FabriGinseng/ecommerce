<template>
  <v-list-item
    class="my-1"
    title="Questo è il tuo carrello"
    :subtitle="totalPrice + ' €'"
  />
  <v-divider />
  <v-list
    density="compact"
    nav
  >
    <v-list-item
      v-for="product in products"
      :key="product.id"
    >
      <v-row
        dense
        justify="space-around"
        align="center"
      >
        <v-col cols="3">
          <v-avatar
            tile
            size="50"
          >
            <v-img
              :src="product.images[0]"
              :alt="product.name"
            />
          </v-avatar>
        </v-col>
        <v-col cols="6">
          <v-list-item-title>
            {{ product.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ product.price }} €
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2">
          <v-icon
            color="error"
            @click="cartStore.removeFromCart(product.id)"
          >
            mdi-delete
          </v-icon>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>
<script setup>
import { computed} from "vue";
import { useCartStore } from "@/stores/cartStore.js";

const cartStore = useCartStore()

const products = computed(() => cartStore.cartItems)

const totalPrice = computed(() => {
  return cartStore.totalPrice
})

</script>
