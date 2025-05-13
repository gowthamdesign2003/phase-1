const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.patch('/:id', bookController.updateShelf);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
