'use strict';

const { DAY } = require('../app/util');

/* eslint-disable max-len */

module.exports = {
  sites: [{
    name: 'freedom-nieruchomosci',
    url: 'http://www.freedom-nieruchomosci.pl/nieruchomosci?_token=g0CpvXpXMMQH5SByIldvyCQRdyswGvi5IrujngTD&location=46215&ln=&market=secondary&type=OM&trans=S&price_from=320000&price_to=410000&totalArea_from=&totalArea_to=&noOfRooms_from=&noOfRooms_to=&priceM2_from=&priceM2_to=&floorNo_from=&floorNo_to=&noOfFloors_from=&noOfFloors_to=&yearBuilt_from=&yearBuilt_to=&buildingType=dowolny&add_date=dowolna',
    selector: '.listing-wrapper .default-offer-listing a',
    selectorCb: selector => Object.values(document.querySelectorAll(selector)).map(i => i.href),
    postProcessFn: elements => elements,
  }],
  redis: {
    ttl: 30 * DAY,
  },
};
