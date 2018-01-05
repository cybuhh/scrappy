'use strict';

const { debuglog } = require('util');

const debug = debuglog('page');

module.exports = (browser, processFn) => async ({ url, selectorCb, selector, postProcessFn }) => {
  const page = await browser.newPage();
  page.on('console', debug);
  page.setViewport({ width: 1200, height: 800 });
  await page.goto(url, { waitUntil: 'load' });
  const elements = await page.evaluate(selectorCb, selector);
  return processFn(postProcessFn(elements));
};
