const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  {
    id: 1,
    name: 'Wireless Mouse',
    price: 25.99,
    description: 'A smooth, responsive wireless mouse.'
  },
  {
    id: 2,
    name: 'Gaming Keyboard',
    price: 75.49,
    description: 'Mechanical RGB keyboard for gaming.'
  },
  {
    id: 3,
    name: 'HD Monitor',
    price: 149.99,
    description: '24-inch full HD monitor with HDMI input.'
  }
];

let nextId = 4;

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});

app.post('/products', (req, res) => {
  const { name, price, description } = req.body;

  if (!name || typeof price !== 'number' || !description) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    description,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const { name, price, description } = req.body;

  if (!name || typeof price !== 'number' || !description) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  products[productIndex] = { id, name, price, description };
  res.status(200).json(products[productIndex]);
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.status(200).json({ message: 'Product deleted', product: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
