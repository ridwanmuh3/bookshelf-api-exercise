/* eslint-disable no-tabs */
/* eslint-disable indent */
// {{ ⏎ }}
const { addBook, getAllBook, getDetailBookById, updateDetailBookById, deleteBookById } = require('./handler')

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBook
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBook
	},
	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: getDetailBookById
	},
	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: updateDetailBookById
	},
	{
		method: 'DELETE',
		path: '/books/{bookId}',
		handler: deleteBookById
	}
]
module.exports = { routes }
