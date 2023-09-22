# Start with the official Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app


# RUN mkdir /app/node_modules

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json .

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script
CMD ["npm", "run", "start"]
