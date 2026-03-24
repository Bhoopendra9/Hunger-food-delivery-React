
# 1️⃣ Build stage
FROM node:18-alpine AS builder

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 2️⃣ Production stage (Nginx)
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from builder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# # production frontend
# CMD ["nginx", "-g", "daemon off;"]

#Node.js apps / React dev server
CMD ["npm", "start"]
