# Usa Node.js versione 20 su una base Linux leggera (Alpine)
FROM node:20-alpine

# Imposta la cartella di lavoro nel container
WORKDIR /app

# Copia solo i file delle dipendenze per velocizzare la cache
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del codice sorgente
COPY . .

# Espone la porta di Next.js
EXPOSE 3000

# Avvia l'app in modalità sviluppo (con Hot Reload)
CMD ["npm", "run", "dev"]
