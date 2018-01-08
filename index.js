'use strict';

const puppeteer = require('puppeteer');

const browserFetch = require('./app/browser-fetch');
const config = require('config');
const redis = require('./app/redis')(config.get('redisDsn'));

const redisTtl = config.get('redis.ttl');

const processResult = redisClient => async (list) => {
  const result = await redisClient.mget(list);
  const newKeys = list.filter((v, k) => !result[k]);

  if (newKeys.length) {
    const pairs = [];
    list.forEach(v => pairs.push(v, '1'));
    await redisClient.mset(pairs);
    await Promise.all(newKeys.map(i => redisClient.expire(i, redisTtl)));
  }

  return newKeys;
};

(async () => {
  try {
    /*const browser = await puppeteer.launch({
      executablePath: config.get('chromiumPath'),
      args: [
        '--no-sandbox',
        '--start-maximized',
        `--remote-debugging-port=${config.get('chromeDebugPort')}`,
      ],
    });*/
    /*const browser = await puppeteer.launch({
      args: [
        '--no-first-run',
        '--disable-gpu',
        '--disable-translate',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-sync',
        '--metrics-recording-only',
        '--safebrowsing-disable-auto-update',
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
    });*/
    const browser = await puppeteer.launch({
      executablePath: config.get('chromiumPath'),
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-translate',
        '--disable-extensions',
        `--remote-debugging-port=${config.get('chromeDebugPort')}`,
      ],
    });
    const fetch = browserFetch(browser, processResult(redis));
    const result = await Promise.all(config.sites.map(fetch));
    console.info(result);
    await browser.close();
  } catch (e) {
    console.error(e.message);
  }
})();
