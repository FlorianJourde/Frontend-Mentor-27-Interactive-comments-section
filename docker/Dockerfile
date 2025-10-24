FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer en mode développement
CMD ["npm", "run", "dev"]