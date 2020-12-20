# Docker imae which is used as foundation to create
#a custom Docker Image with this Dockerfile
FROM node:latest 
#RUN npm install -g yarn
# A directory witin the virtualization Docker environment 
# Becomes more relevant when using Docker Composer later 
WORKDIR /app 

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copies packages.json and packages-lock.json to Docker environment 
COPY package*.json ./ 
RUN yarn --pure-lockfile
# Install a node packages
RUN yarn 
# Copy everything to Docker environment
COPY . . 
# Uses port which is used to the actual application
EXPOSE 3000 

# Finally run the application
CMD ["yarn", "start"]