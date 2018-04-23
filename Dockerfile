FROM node:8

WORKDIR /usr/src/app

# Because we install package for test, we don't seperate COPY package.json and install seperatly for docker caching.
COPY . .
RUN npm install -g && npm install -g mocha

# CREATE test folder
RUN cd .. \
    && mkdir test \
    && cd test \
    && npm init -y \
    && npm install chai mz sequelize \
    && mkdir migrations config

COPY config/config-docker.json ./test/config/config.json
COPY test-migrations ./test/migrations


RUN chmod +x ./test/test.sh

CMD ["./test/test.sh"]