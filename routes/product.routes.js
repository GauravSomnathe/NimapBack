const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE
router.post('/', (req, res) => {
  const { product_name, category_id } = req.body;
  db.query(
    'INSERT INTO products (product_name, category_id) VALUES (?, ?)',
    [product_name, category_id],
    res.send.bind(res)
  );
});

// READ WITH PAGINATION
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const offset = (page - 1) * size;

  const query = `
    SELECT 
      p.product_id,
      p.product_name,
      c.category_id,
      c.category_name
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    LIMIT ? OFFSET ?
  `;

  db.query(query, [size, offset], (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  db.query(
    'UPDATE products SET product_name=?, category_id=? WHERE product_id=?',
    [req.body.product_name, req.body.category_id, req.params.id],
    res.send.bind(res)
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM products WHERE product_id=?',
    [req.params.id],
    res.send.bind(res)
  );
});

module.exports = router;
