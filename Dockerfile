# Stage 1 (named "builder"): Production React Build 
FROM node:19.6.1-alpine3.16 AS builder 

WORKDIR /app 

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./ 


RUN npm install
RUN npm i sass
RUN npm i leaflet
RUN npm i react-leaflet@4.0.0
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @mui/material @mui/styled-engine-sc styled-components
RUN npm install react-icons --save
RUN npm install react-router-dom@6
RUN npm install --save react-to-print

COPY . ./ 
RUN npm run build 

FROM node:19.6.1-alpine3.16

WORKDIR /app
RUN npm install -g serve 

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-n", "-s", "build", "-l", "3000"]