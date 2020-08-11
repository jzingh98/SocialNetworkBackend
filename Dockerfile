FROM node:14.7.0

WORKDIR /usr/src/SocialNetworkBackend

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]