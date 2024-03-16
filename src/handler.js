/* eslint-disable no-tabs */
/* eslint-disable indent */

const { books } = require('./books')
const { nanoid } = require('nanoid')
const { trimProperty } = require('./function_utility')

const addBook = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading
	} = request.payload

	const id = nanoid(16)
	const finished = readPage === pageCount
	const insertedAt = new Date().toISOString()
	const updatedAt = insertedAt

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt
	}

	if (name === '' || name === undefined || name === null) {
		return h
			.response({
				status: 'fail',
				message: 'Gagal menambahkan buku. Mohon isi nama buku'
			})
			.code(400)
	}

	if (readPage > pageCount) {
		return h
			.response({
				status: 'fail',
				message:
					'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
			})
			.code(400)
	}

	books.push(newBook)

	const isSuccess = books.filter((book) => book.id === id).length > 0

	if (isSuccess) {
		return h
			.response({
				status: 'success',
				message: 'Buku berhasil ditambahkan',
				data: { bookId: id }
			})
			.code(201)
	}

	return h
		.response({
			status: 'fail',
			message: 'Gagal menambahkan buku'
		})
		.code(500)
}

const getAllBook = (request, h) => {
	const params =
		request.query.reading ||
		request.query.finished ||
		request.query.name ||
		null

	const booksInfo = []

	if (books.length > 0) {
		if (request.query.reading) {
			if (Number(params) === 0) {
				trimProperty(
					books.filter((b) => b.reading === Boolean(Number(params))),
					booksInfo
				)

				return h
					.response({
						status: 'success',
						data: {
							books: booksInfo
						}
					})
					.code(200)
			}
			trimProperty(
				books.filter((b) => b.reading === Boolean(Number(params))),
				booksInfo
			)

			return h
				.response({
					status: 'success',
					data: {
						books: booksInfo
					}
				})
				.code(200)
		}

		if (request.query.finished) {
			if (Number(params) === 0) {
				trimProperty(
					books.filter((b) => b.finished === Boolean(Number(params))),
					booksInfo
				)

				return h
					.response({
						status: 'success',
						data: {
							books: booksInfo
						}
					})
					.code(200)
			}

			trimProperty(
				books.filter((b) => b.finished === Boolean(Number(params))),
				booksInfo
			)

			return h
				.response({
					status: 'success',
					data: {
						books: booksInfo
					}
				})
				.code(200)
		}

		if (request.query.name) {
			if (params) {
				const regexCheckName = new RegExp(params, 'gi')

				trimProperty(
					books.filter((b) => b.name.match(regexCheckName) !== null),
					booksInfo
				)

				return h
					.response({
						status: 'success',
						data: {
							books: booksInfo
						}
					})
					.code(200)
			}
		}

		if (params === null) {
			trimProperty(books, booksInfo)

			return h
				.response({
					status: 'success',
					data: {
						books: booksInfo
					}
				})
				.code(200)
		}
	}

	return h
		.response({
			status: 'fail',
			message: 'Buku tidak ditemukan'
		})
		.code(404)
}

const getDetailBookById = (request, h) => {
	const params =
		request.params.bookId ?? request.params.bookIdWithFinishedReading

	const book = books.filter((b) => b.id === params)[0]
	if (params !== null && book !== undefined) {
		if (book.finished === true) {
			return {
				status: 'success',
				message: 'Buku yang telah selesai dibaca berhasil ditampilkan',
				data: { book }
			}
		}
		if (book.finished === false) {
			return {
				status: 'success',
				message: 'Buku berhasil ditampilkan',
				data: {
					book
				}
			}
		}
	}

	return h
		.response({
			status: 'fail',
			message: 'Buku tidak ditemukan'
		})
		.code(404)
}

const updateDetailBookById = (request, h) => {
	const { bookId } = request.params
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading
	} = request.payload

	const updatedAt = new Date().toISOString()
	const index = books.findIndex((b) => b.id === bookId)

	if (name === '' || name === undefined || name === null) {
		return h
			.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Mohon isi nama buku'
			})
			.code(400)
	}

	if (readPage > pageCount) {
		return h
			.response({
				status: 'fail',
				message:
					'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
			})
			.code(400)
	}

	if (index === -1) {
		return h
			.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Id tidak ditemukan'
			})
			.code(404)
	}

	books[index] = {
		...books[index],
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		finished: readPage === pageCount,
		updatedAt
	}

	return h
		.response({
			status: 'success',
			message: 'Buku berhasil diperbarui'
		})
		.code(200)
}

const deleteBookById = (request, h) => {
	const params = request.params.bookId

	const index = books.findIndex((b) => b.id === params)

	if (index === -1) {
		return h
			.response({
				status: 'fail',
				message: 'Buku gagal dihapus. Id tidak ditemukan'
			})
			.code(404)
	}

	if (books[index].finished === true) {
		books.splice(index, 1)
		return h
			.response({
				status: 'success',
				message: 'Buku berhasil dihapus'
			})
			.code(200)
	}

	books.splice(index, 1)
	return h
		.response({
			status: 'success',
			message: 'Buku berhasil dihapus'
		})
		.code(200)
}

module.exports = {
	addBook,
	getAllBook,
	getDetailBookById,
	updateDetailBookById,
	deleteBookById
}
