# Fase 1: Build dell'applicazione
FROM node:lts-alpine AS builder

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione e installa le dipendenze
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copia tutto il codice sorgente
COPY . .

# Costruisce il progetto Vue 3 con Vite
RUN npm run build

# Fase 2: Servizio con Nginx
FROM nginx:alpine AS production

# Copia la build nella cartella di Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA Routing per Vue.js
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Espone la porta 80
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
