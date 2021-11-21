FROM node:16-alpine as base
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
#RUN apk --no-cache --virtual add python g++
RUN yarn --pure-lockfile

COPY public/ ./public/
COPY src/ ./src/

FROM base as build
RUN GENERATE_SOURCEMAP=false INLINE_RUNTIME_CHUNK=false yarn build

FROM node:16-alpine as cleanup
COPY --from=build /usr/src/app/build ./build

FROM nginx:alpine as release
RUN rm -rf /usr/share/nginx/html/*
COPY --from=cleanup build /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]