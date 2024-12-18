import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import ProductsPage from "@/components/ProductsComponent.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import {useProductsStore} from "@/stores/productsStore.js";

const routes = [
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: (route) => ({ product: route.meta.product }),
    beforeEnter: async (to, from, next) => {
      try {
        to.meta.product = await useProductsStore().fetchProductById(to.params.id);
        next(); // Procedi alla pagina
      } catch (error) {
        console.error('Errore nel caricamento del prodotto:', error);
        }
      }
    },
  {
    path: '/',
    name: 'Home',
    component: ProductsPage
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
