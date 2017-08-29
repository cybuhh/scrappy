'use strict';

const puppeteer = require('puppeteer');

const browserFetch = require('./app/browser-fetch');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const fetch = browserFetch(browser);
  try {
    const result = await Promise.all([
      {
        url: 'http://www.freedom-nieruchomosci.pl/nieruchomosci?locd=małopolskie+Kraków&marketd=secondary&typed=om&transd=s&locm=małopolskie+Kraków&marketm=w&typem=om&transm=s&price_from=200000&price_to=450000&totalArea_from=40&totalArea_to=60&noOfRooms_from=2&noOfRooms_to=&priceM2_from=&priceM2_to=&floorNo_from=&floorNo_to=&noOfFloors_from=&noOfFloors_to=&yearBuilt_from=&yearBuilt_to=&add_date_from=&searchd=wyszukaj',
        selector: '#properties .property-list .properties > li a.more',
      },
    ].map(fetch));
    console.info(result);
  } catch (e) {
    console.error(e.message);
  } finally {
    browser.close();
  }
})();
