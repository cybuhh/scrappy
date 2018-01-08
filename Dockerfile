FROM node:9-alpine

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.7/main" > /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/v3.7/community" >> /etc/apk/repositories && \
  apk update && \
  apk add --update --no-cache chromium xvfb dbus xorg-server ttf-freefont wait4ports mesa-dri-swrast

# RUN rc-update add dbus

WORKDIR /app

ADD . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser
ENV CHROME_DEBUGGING_PORT 9222
ENV DISPLAY :99.0
ENV GEOMETRY 1280x800x16

#RUN adduser -D userapp

RUN npm i --production

ENTRYPOINT ["sh", "/app/xvfb.sh"]

CMD ["npm", "start"]
