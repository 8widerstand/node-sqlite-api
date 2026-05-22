const express = require('express');
const app = express();

const products = [
    {id: 1, name: "Clavier", price: 89.99, category: "informatique"},
    {id: 2, name: "Souris", price: 29.99, category: "informatique"},
    {id: 3, name: "Café", price: 12.50, category: "alimentation"},
    {id: 4, name: "Thé", price: 8.75, category: "alimentation"},
    {id: 5, name: "Casque audio", price: 159.00, category: "audio"},
];

app.get('/products', (request, response) => {
    response.json(products);
});

app.get('/products/:id', (request, response) => {
    const productId = parseInt(request.params.id);
    const product = products.find(product => product.id === productId);
    if (!product) {
        response.status(404).send("Product not found");
        return;
    }
    response.send(product);
});

app.get('/products/category/:cat', (request, response) => {
    const category = request.params.cat;
    const categoryProduct = products.filter(product => product.category === category);
    response.json(categoryProduct);
});

app.get('/search', (request, response) => {
    const min = parseFloat(request.query.min);
    const max = parseFloat(request.query.max);
    if (isNaN(min) || isNaN(max)) {
        response.status(400).send("Bad request");
        return;
    }
    const productsInMinAndMax = products.filter(product => product.price >= min && product.price <= max);
    response.send(productsInMinAndMax);
});

app.get('/stats', (request, response) => {
    const totalValue = products.reduce((total, product) => total + product.price, 0);
    const stats = {
        totalProducts: products.length,
        totalPrice:totalValue ,
        averagePrice: parseFloat((totalValue / products.length).toFixed(2)),
    }
    response.send(stats);
});

app.listen(3000, () => {
    console.log('Server started on port  http://localhost:3000');
})