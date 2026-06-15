FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run prisma:migrate

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "run", "dev"]