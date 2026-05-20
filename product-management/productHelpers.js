const { products} = require("./productData");


module.exports.getAllProducts = () => {
    return products;
};

module.exports.findProductById = (productId) => {
    return products.find((product) => product.id === productId);
};

module.exports.getInStockProducts = () => {
    return products.filter((product) => product.stock > 0);
}

module.exports.getTotalInventoryValue = () => {
    return products.reduce((total, product) => total +(product.price* product.stock), 0);
}