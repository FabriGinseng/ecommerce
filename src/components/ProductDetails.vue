<template>
  <v-container class="py-6">
    <!-- Breadcrumbs per la navigazione -->
    <v-breadcrumbs
      :items="breadcrumbs"
      class="mb-4"
    >
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <!-- Sezione principale con immagine e dettagli -->
    <v-card
      elevation="2"
      class="pa-4"
    >
      <v-row>
        <!-- Immagine -->
        <v-col
          cols="12"
          lg="4"
          md="4"
          sm="12"
          class="d-flex align-center"
        >
          <v-img
            :src="product.thumbnail"
            color="light-blue lighten-2"
            alt="Product Image"
            aspect-ratio="1"
            class="rounded"
            cover
          />
        </v-col>

        <!-- Dettagli del prodotto -->
        <v-col
          cols="12"
          md="8"
          lg="8"
          sm="12"
        >
          <h1 class="text-h5 font-weight-bold mb-2">
            {{ product.title }}
          </h1>
          <p class="text-body-1 mb-4">
            {{ product.description }}
          </p>

          <!-- Rating e prezzo -->
          <div class="d-flex align-center mb-4">
            <v-rating
              :model-value="product.rating"
              color="amber"
              density="compact"
              size="small"
              readonly
            />
            <span class="ml-2 text-subtitle-2 font-weight-medium">{{ product.rating }} / 5</span>
          </div>
          <p class="text-h6 font-weight-bold mb-2">
            Prezzo: €{{ product.price.toFixed(2) }}
            <span class="text-subtitle-2 text-red">
              (-{{ product.discountPercentage }}% di sconto)
            </span>
          </p>

          <p class="text-subtitle-1">
            Disponibilità: <strong>{{ product.availabilityStatus }}</strong>
            (Stock: {{ product.stock }})
          </p>

          <p class="text-caption text-grey-darken-1">
            SKU: {{ product.sku }} | Garanzia: {{ product.warrantyInformation }}
          </p>
        </v-col>
      </v-row>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          elevation="2"
          variant="flat"
          @click="useCartStore().addToCart(product)"
        >
          Aggiungi al carrello
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Sezione recensioni -->
    <v-card
      class="mt-6"
      elevation="2"
    >
      <v-card-title class="text-h6 font-weight-bold">
        Recensioni
      </v-card-title>
      <v-divider />
      <v-card-text>
        <!-- Lista recensioni con expander -->
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              Visualizza tutte le recensioni ({{ product.reviews.length }})
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                v-for="(review, index) in product.reviews"
                :key="index"
                class="mb-4"
              >
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                    class="text-center"
                  >
                    <v-rating
                      :model-value="review.rating"
                      color="amber"
                      size="small"
                      readonly
                    />
                    <p class="text-caption text-grey">
                      {{ review.date.split('T')[0] }}
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <p class="font-weight-medium">
                      {{ review.reviewerName }}
                    </p>
                    <p class="text-body-2">
                      {{ review.comment }}
                    </p>
                  </v-col>
                </v-row>
                <v-divider
                  v-if="index < product.reviews.length - 1"
                  class="my-2"
                />
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import {useCartStore} from "@/stores/cartStore.js";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Breadcrumbs array
const breadcrumbs = ref([
  { title: "Home", disabled: false, href: "/" },
  { title: "Categoria: " + props.product.category, disabled: true },
  { title: props.product.title, disabled: true },
]);

onBeforeMount(() => {
  console.log("ProductDetails component mounted", props.product);
});
</script>

<style scoped>
.text-grey {
  color: #757575;
}
</style>
