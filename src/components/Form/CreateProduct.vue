<template>
  <v-card
    class="pa-5"
    elevation="3"
  >
    <v-card-title class="text-h5">
      Inserisci un Prodotto
    </v-card-title>

    <v-form
      ref="form"
      @submit.prevent="onSubmit"
    >
      <v-row justify="center">
        <v-col cols="6">
          <!-- Title -->
          <v-text-field
            v-model="title"
            prepend-icon="mdi-format-title"
            :error-messages="errors.title"
            label="Titolo"
            placeholder="Inserisci il titolo del prodotto"
            required
          />
        </v-col>
        <v-col cols="6">
          <!-- price -->
          <v-text-field
            v-model.number="price"
            prepend-icon="mdi-currency-eur"
            :error-messages="errors.price"
            label="Prezzo"
            min="0"
            placeholder="Inserisci il prezzo"
            required
            type="number"
          />
        </v-col>
        <v-col cols="12">
          <!-- Description -->
          <v-textarea
            v-model="description"
            prepend-icon="mdi-format-title"
            :error-messages="errors.description"
            label="Descrizione"
            placeholder="Inserisci la descrizione del prodotto"
            required
          />
        </v-col>
        <v-col cols="6">
          <!-- Image Upload -->
          <v-file-input
            :error-messages="image"
            accept="image/*"
            label="Immagine del prodotto"
            required
            @change="onImageChange"
          />
          <v-img
            v-if="imagePreview"
            :src="imagePreview"
            class="mt-2"
            max-height="200"
            max-width="200"
          />
        </v-col>
        <v-col cols="6">
          <!-- Stock -->
          <v-text-field
            v-model.number="stock"
            prepend-icon="mdi-format-title"
            :error-messages="errors.stock"
            label="Quantità in Stock"
            min="0"
            placeholder="Inserisci la quantità disponibile"
            required
            type="number"
          />
        </v-col>
      </v-row>
      <!-- Submit Button -->
      <v-btn
        class="mt-3"
        color="primary"
        type="submit"
      >
        Salva Prodotto
      </v-btn>
      <v-btn
        class="mt-3 ml-2"
        color="error"
        @click="emit('closeDialog')"
      >
        Chiudi
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {onMounted, ref, onUnmounted} from "vue";
import {useProductsStore} from "@/stores/productsStore.js";
import {useNotificationStore} from "@/stores/notification.js";

const props = defineProps({
  dataModel: Boolean
});
const emit = defineEmits(['closeDialog'])

onMounted(() => {
  if (props.dataModel) {
    title.value = props.dataModel.title;
    description.value = props.dataModel.description;
    stock.value = props.dataModel.stock;
    price.value = props.dataModel.price;
    if (props.dataModel.images) {
      imagePreview.value = props.dataModel.images[0];
  }
  }
});

onUnmounted(() => {
  imagePreview.value = '';
  imageFile.value = null;
  title.value = '';
  description.value = '';
  stock.value = '';
  price.value = '';
});

// Schema di validazione con Yup
const schema = yup.object({
  title: yup
    .string()
    .required("Il titolo è obbligatorio.")
    .min(3, "Il titolo deve contenere almeno 3 caratteri."),
  description: yup
    .string()
    .required("La descrizione è obbligatoria.")
    .min(10, "La descrizione deve contenere almeno 10 caratteri."),
  image: yup
    .mixed()
    .test(
      "file-size",
      "L'immagine deve essere inferiore a 500KB",
      (value) => !value || (value.size <= 500 * 1024) // 500 KB
    ),
  stock: yup
    .number()
    .required("La quantità in stock è obbligatoria.")
    .min(0, "La quantità deve essere maggiore o uguale a 0."),
  price: yup
    .number()
    .required("Il prezzo è obbligatorio.")
    .min(0, "Il prezzo deve essere maggiore di 0.")
});

// VeeValidate: useForm per validazione
const {handleSubmit, errors} = useForm({validationSchema: schema});

// Campi della form
const {value: title} = useField("title");
const {value: description} = useField("description");
const {value: stock} = useField("stock");
const {value: price} = useField("price");
const {value: image} = useField("image");
const imageFile = ref(null);
const imagePreview = props?.dataModel?.thumbnail ? ref(props.dataModel.thumbnail) : ref("");

// Gestione del caricamento immagine
const onImageChange = (file) => {
  if (file && file.target?.files[0]) {

    const reader = new FileReader();
    reader.onloadend = () => {
      imageFile.value = reader.result
    };
    toBase64(file.target?.files[0]).then((data) => {
      imageFile.value = data
    }).catch((error) => {
      console.error(error)
      imageFile.value = ''
    });
    imagePreview.value = URL.createObjectURL(file.target?.files[0]);
  }
};
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
// Submit Handler
const onSubmit = handleSubmit((values) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("stock", values.stock);
  formData.append("thumbnail", imageFile.value);
  formData.append("price", values.price);
  const productStore = useProductsStore();
  if(props.dataModel) {
    productStore.updateProduct(props.dataModel.id, formData).then(()=> {
      useNotificationStore().showSuccess("Prodotto aggiornato con successo");
      emit('closeDialog')
    }).catch((error) => {
      useNotificationStore().showError("Errore durante l'aggiornamento del prodotto");
      console.error(error);
    });
    return;
  }
  productStore.createProduct(formData).then(()=> {
    useNotificationStore().showSuccess("Prodotto creato con successo");
    emit('closeDialog')
  }).catch((error) => {
    useNotificationStore().showError("Errore durante la creazione del prodotto");
    console.error(error);
  });
});
</script>

<style scoped>
.v-img {
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
