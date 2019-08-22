module.exports = function () {
    var faker = require("faker");
    var _ = require("lodash");
    return {
      products: _.times(25, function (n) {
        return {
          id: n,
          name: faker.company.bsNoun(),
          category: faker.company.bsAdjective(),
          price: faker.commerce.price()
        }
      })
    }
}
