import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/books' });

export const fetchBooks = () => API.get('/');
export const addBook = (book) => API.post('/', book);
export const updateShelf = (id, shelf) => API.patch(`/${id}`, { shelf });
export const deleteBook = (id) => API.delete(`/${id}`);
