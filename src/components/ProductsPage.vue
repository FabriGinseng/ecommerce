<template>
  <v-container
    fluid
  >
    <v-responsive>
      <v-toolbar color="transparent">
        <v-toolbar-title>
          Prodotti
        </v-toolbar-title>
        <v-spacer />
        <v-row
          dense
          no-gutters
          justify="end"
        >
          <v-col cols="2">
            <!-- Filtri -->
            <v-dialog
              width="auto"
              scrollable
            >
              <template #activator="{ props: activatorProps }">
                <v-btn
                  color="primary"
                  icon="mdi-filter"
                  v-bind="activatorProps"
                />
              </template>

              <template #default="{ isActive }">
                <v-card
                  prepend-icon="mdi-filter"
                  title="Seleziona la categoria"
                >
                  <v-divider class="mt-3" />

                  <v-card-text
                    class="px-4"
                    style="height: 300px;"
                  >
                    <v-radio-group
                      v-model="selectedCategory"
                      column
                    >
                      <v-radio
                        v-for="(item, index) in categories"
                        :key="index"
                        :label="item.name"
                        :value="item.slug"
                        @click="isActive.value = false"
                      />
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
          <v-col cols="2">
            <v-btn
              color="primary"
              icon="mdi-refresh"
              @click="productStore.fetchProducts()"
            />
          </v-col>
          <v-col cols="2">
            <v-btn
              color="primary"
              icon="mdi-plus"
              @click="dialogForm = true"
            />
            <!-- Creazione prodotto -->
            <v-dialog
              v-if="dialogForm"
              v-model="dialogForm"
              persistent
              scrollable
            >
              <CreateProduct
                :data-model="selectedProduct"
                @close-dialog="closeFormDialog"
              />
            </v-dialog>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-chip
        v-if="selectedCategory"
        class="ml-1"
        closable
        color="primary"
        prepend-icon="mdi-filter"
        @click:close="resetCategory"
      >
        {{ selectedCategory }}
      </v-chip>

      <v-row class="pa-1">
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          xl="2"
          lg="3"
          md="6"
          sm="6"
        >
          <v-card
            elevation="3"
            rounded
            class="pa-0"
          >
            <v-img
              style="cursor: pointer"
              color="light-blue lighten-2"
              max-height="200"
              class="mx-auto"
              :src="getImage(product)"
              @click="router.push({ name: 'ProductDetails', params: { id: product.id } })"
            />
            <v-card-title>
              {{ product.title }}
            </v-card-title>
            <v-card-subtitle>
              ci sono ancora {{ product.stock }} pezzi disponibili
            </v-card-subtitle>
            <v-spacer />
            <v-card-text class="justify-end">
              <div class="d-flex justify-space-between align-center">
                <div class="price-container">
                  <span
                    v-if="product.discountPercentage"
                    class="old-price"
                  > {{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}€ </span>
                  <span class="discount-price">{{ product.price }}€</span>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                icon="mdi-pencil"
                color="primary"
                size="small"
                @click="openFormDialog(product)"
              />
              <v-btn
                icon="mdi-delete"
                color="error"
                size="small"
                @click="deleteProduct(product)"
              />
              <v-spacer />
              <v-btn
                color="primary"
                variant="flat"
                icon="mdi-cart-plus"
                @click="addProductToCart(product)"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>

    <v-pagination
      v-model="currentPage"
      total-visible="5"
      :length="productsPages"
      rounded="circle"
      @update:model-value="onPageChange"
    />
  </v-container>
</template>

<script setup>
import { ref, watch, computed, onMounted} from 'vue'
import { useProductsStore } from "@/stores/productsStore.js";
import CreateProduct from "@/components/Form/CreateProduct.vue";
import {useDialogStore} from "@/stores/dialog.js";
import {useCartStore} from "@/stores/cartStore.js";
import router from "@/router/index.js";

const productStore = useProductsStore()

const selectedCategory = ref('')
const currentPage = ref(1)
const selectedProduct = ref(null)
const dialogForm = ref(false)


onMounted(async() => {
  await productStore.fetchProducts()
  await productStore.fetchCategories()
})

const products = computed(() => productStore.getProducts);
const categories = computed(() => productStore.getCategories);
const productsPages = computed(() => productStore.getProductsPages);


watch(() => selectedCategory.value, async() => {
  await productStore.fetchProducts(selectedCategory.value)
})

// Carica i prodotti ogni volta che cambia la pagina
const onPageChange = async (page) => {
  currentPage.value = page;
  await productStore.fetchProducts(selectedCategory.value,'', 10, page - 1);
};

const resetCategory = () => {
  selectedCategory.value = '';
};

const getImage = (product) => {
  if (product.thumbnail) {
    const imageUrl = product.thumbnail;

    // Verifica se l'URL è in formato Base64
    const base64Pattern = /^data:image\/(png|jpg|jpeg|gif|bmp);base64,/;

    if (base64Pattern.test(imageUrl)) {
      const base64Data = imageUrl.split(',')[1];

      // Decodifica Base64 in un array di byte
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      // Converte i byte in un array di byte
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      // Crea un Blob con il tipo MIME dell'immagine
      const blob = new Blob(byteArrays, { type: 'image/jpeg' });
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      return URL.createObjectURL(file); // Crea un URL oggetto per l'immagine
    } else {
      return imageUrl;
    }
  }

  return 'https://dummyjson.com/image/150';
};

const openFormDialog = (product) => {
  selectedProduct.value = product
  dialogForm.value = true
}

const closeFormDialog = () => {
  dialogForm.value = false
  selectedProduct.value = null
}
const deleteProduct = async (product) => {
  const dialogStore = useDialogStore();
  dialogStore.openDialog({
    title: 'Elimina Prodotto',
    message: 'Sei sicuro di voler eliminare questo prodotto?',
    confirmText: 'Sì, elimina',
    cancelText: 'Annulla',
    onConfirm: async () => {
      await productStore.deleteProduct(product.id);
    },
    onCancel: () => {
      console.log('Eliminazione annullata.');
    },
  });
}

const addProductToCart = (product) => {
  useCartStore().addToCart(product);
}
</script>
<style scoped>
.price-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

.old-price {
  font-size: 0.8rem;
  color: #b0b0b0; /* Colore grigio per il prezzo precedente */
  text-decoration: line-through; /* Linea sopra il prezzo precedente */
  position: absolute;
  top: -10px;
  left: 0;
}

.discount-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff5722; /* Colore accattivante per il prezzo scontato */
}
</style>
