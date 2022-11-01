FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

RUN npm run build -- --configuration production

#Segunda etapa

# FROM nginx:1.17.1-alpine


# RUN apt-get update && \
#     apt-get install -y certbot python-certbot-nginx


# COPY --from=build-step /app/dist/reco-amy-irving /usr/share/nginx/html
