'use strict';

const cheerio = require('cheerio');
const { debuglog } = require('util');

const debug = debuglog('page');

function querySelectorAll(selector) {
  const el = document.querySelectorAll(selector);
  const list = [];
  el.forEach(i => {
    list.push(i.href);
  });
  return list;
}

module.exports = browser => async ({ url, selector }) => {
  const page = await browser.newPage();
  page.on('console', debug);
  page.setViewport({ width: 1200, height: 800 });
  await page.goto(url, { waitUntil: 'load' });
  const result = await page.evaluate(querySelectorAll, selector);
  /*return result && cheerio.load(result, {
    ignoreWhitespace: true,
    xmlMode: true,
  });*/
  return result;
};
