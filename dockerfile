# FROM node:20-alpine 

# COPY ./backend .

# RUN npm install

# CMD [ "node", "index.js" ]


# for frontend part and copy dist in backend part and run in one image

FROM node:20-alpine AS frontend-builder

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

#backend 
FROM node:20-alpine

COPY ./backend /app

WORKDIR  /app

RUN npm install

COPY --from=frontend-builder /app/dist /app/public

CMD [ "node", "index.js" ]