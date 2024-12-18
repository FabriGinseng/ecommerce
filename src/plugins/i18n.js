import { createI18n } from 'vue-i18n';

// Definisci le traduzioni
const messages = {
  en: {
    products: "Products",
    selectCategory: "Select a category",
    stockMessage: "There are still {count} items available",
    deleteDialog: {
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      confirmText: "Delete",
      cancelText: "Cancel"
    },
    searchProducts: "Search products...",
    searchPlacheholder: "type to search...",
    insertProduct: "Insert a product",
    title: 'Title',
    placeholderTitle: 'Enter the product title',
    price: 'Price',
    placeholderPrice: 'Enter the product price',
    stockQuantity: 'Stock Quantity',
    stockPlaceholder: 'Enter the stock quantity',
    productImage: 'Product Image',
    save: 'Save',
    close: 'Close',
    cartTitle: 'This is your cart',
    subTotalCart: 'Cart subtotal {price} $',
    productInTheCart: 'The product is already in the cart',
    addToCart: 'Add to cart',
    description: 'Description',
    placeholderDescription: 'Enter the product description',
    validation: {
      titleRequired: "Title is required.",
      titleMinLength: "Title must be at least 3 characters long.",
      descriptionRequired: "Description is required.",
      descriptionMinLength: "Description must be at least 10 characters long.",
      imageSize: "Image must be less than 500KB.",
      stockRequired: "Stock quantity is required.",
      stockMin: "Stock quantity must be greater than or equal to 0.",
      priceRequired: "Price is required.",
      priceMin: "Price must be greater than 0."
    }
  },
  it: {
    products: "Prodotti",
    selectCategory: "Seleziona una categoria",
    stockMessage: "Ci sono ancora {count} articoli disponibili",
    deleteDialog: {
      title: "Elimina Prodotto",
      message: "Sei sicuro di voler eliminare questo prodotto?",
      confirmText: "Elimina",
      cancelText: "Annulla"
    },
    searchProducts: "Cerca prodotti...",
    searchPlacheholder: "digita per cercare...",
    insertProduct: "Inserisci un prodotto",
    title: 'Titolo',
    placeholderTitle: 'Inserisci il titolo del prodotto',
    price: 'Prezzo',
    placeholderPrice: 'Inserisci il prezzo del prodotto',
    stockQuantity: 'Quantità in magazzino',
    stockPlaceholder: 'Inserisci la quantità in magazzino',
    productImage: 'Immagine del prodotto',
    save: 'Salva',
    close: 'Chiudi',
    cartTitle: 'Questo è il tuo carrello',
    subTotalCart: 'Subtotale carrello {price} €',
    productInTheCart: 'Il prodotto è già nel carrello',
    addToCart: 'Aggiungi al carrello',
    description: 'Descrizione',
    placeholderDescription: 'Inserisci la descrizione del prodotto',
    validation: {
      titleRequired: "Il titolo è obbligatorio.",
      titleMinLength: "Il titolo deve contenere almeno 3 caratteri.",
      descriptionRequired: "La descrizione è obbligatoria.",
      descriptionMinLength: "La descrizione deve contenere almeno 10 caratteri.",
      imageSize: "L'immagine deve essere inferiore a 500KB.",
      stockRequired: "La quantità in stock è obbligatoria.",
      stockMin: "La quantità deve essere maggiore o uguale a 0.",
      priceRequired: "Il prezzo è obbligatorio.",
      priceMin: "Il prezzo deve essere maggiore di 0."
    }
  },
};

// Crea un'istanza di I18n
const i18n = createI18n({
  locale: 'en', // Lingua predefinita
  fallbackLocale: 'en', // Lingua di fallback
  messages, // Oggetto con le traduzioni
});

export default i18n;
