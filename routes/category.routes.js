const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE
router.post('/', (req, res) => {
  db.query(
    'INSERT INTO categories (category_name) VALUES (?)',
    [req.body.category_name],
    res.send.bind(res)
  );
});

// READ
router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, data) => res.json(data));
});

// UPDATE
router.put('/:id', (req, res) => {
  db.query(
    'UPDATE categories SET category_name=? WHERE category_id=?',
    [req.body.category_name, req.params.id],
    res.send.bind(res)
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM categories WHERE category_id=?',
    [req.params.id],
    res.send.bind(res)
  );
});

module.exports = router;
