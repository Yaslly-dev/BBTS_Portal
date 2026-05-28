# 1. Define a imagem base (ex: Node 18 leve)
FROM node:18-alpine

# 2. Define a pasta de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o restante do código do projeto
COPY . .

# 6. Expõe a porta que a sua aplicação usa (ex: 3000, 8080, etc)
EXPOSE 3000

# 7. Comando para iniciar o projeto
CMD ["npm", "run", "dev"]