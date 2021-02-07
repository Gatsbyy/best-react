const { generateUrl } = require('../routerHelper');

test('generateUrl', () => {
  expect(generateUrl({
    symbol: 'BTC',
    address: 'address',
    tab: 'address'
  }))
    .toBe('/detail/BTC/address/address')
});