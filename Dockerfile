FROM node:9-slim

RUN apt update && apt -y install libx11-6 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxi6 libxtst6 \
libglib2.0-0 libnss3 libgtk-3-0 libxss1 gconf-service libasound2

WORKDIR /app

RUN groupadd -r pptruser && useradd -d /app -r -g pptruser pptruser \
    && chown -R pptruser:pptruser /app

# Run user as non privileged.
USER pptruser

ADD . .
RUN npm i --production
CMD ["node", "index.js"]
