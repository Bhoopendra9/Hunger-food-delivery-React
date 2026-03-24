
# Base image
FROM node:18-alpine

# App directory
WORKDIR /backend

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# # Optional: if using TypeScript / build step
# RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "src/server.js"]