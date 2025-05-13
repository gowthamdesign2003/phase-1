const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.updateShelf = async (req, res) => {
  const { id } = req.params;
  const { shelf } = req.body;
  const updated = await Book.findByIdAndUpdate(id, { shelf }, { new: true });
  res.json(updated);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book removed' });
};
