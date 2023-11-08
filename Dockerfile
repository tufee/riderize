# Use an official Node.js runtime as the base image
FROM node:alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json .env /prisma ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Use a smaller base image for production
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/.env /app/.env

# Install only production dependencies
RUN npm ci --production

# RUN apk add git openssh
# RUN apt-get update -y && apt-get install -y openssl

# Expose the application port (replace 3000 with your desired port)
EXPOSE 3000

# Start the application
CMD ["node", "dist/infra/server.js"]
