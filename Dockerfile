FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
npx prisma migrate deploy

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "run", "dev"]