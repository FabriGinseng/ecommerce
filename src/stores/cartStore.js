import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    cartSidebarOpen: false,
  }),
  getters: {
    totalPrice: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    },
    totalItems: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
  actions: {
    toggleCartSidebar() {
      this.cartSidebarOpen = !this.cartSidebarOpen;
    },
    addToCart(product) {
      const existingItem = this.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
        this.cartSidebarOpen = true;
      }
    },
    removeFromCart(productId) {
      const existingItem = this.cartItems.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          this.cartItems = this.cartItems.filter((item) => item.id !== productId);
        }
      }
    },
    clearCart() {
      this.cartItems = [];
    },
  },
});
