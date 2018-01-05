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
    const browser = await puppeteer.launch({
      headless: false,
    });
    const fetch = browserFetch(browser, processResult(redis));
    const result = await Promise.all(config.sites.map(fetch));
    console.info(result);
    browser.close();
  } catch (e) {
    console.error(e.message);
  }
})();
