FROM node:latest

RUN apt update && apt upgrade -y
WORKDIR /jpi
COPY ./jpi /jpi
EXPOSE 3000

CMD [ "npm", "start" ]