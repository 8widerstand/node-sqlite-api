const { getAllProduct, getInStockProducts, getTotalInventoryValue, findProductById } = require('./productHelpers');

console.log(getAllProduct());
console.log(findProductById(2));
console.log(getInStockProducts());
console.log(getTotalInventoryValue());