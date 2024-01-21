const Book = require('../models/bookModel')
const mongoose = require('mongoose')


//Create a new book
const createBook = async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Required fields are missing!" })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


//Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).send(books)
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


//Get a book by id
const getBookById = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID!" })
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).send({ message: "Book not found!" })
    }

    return res.status(200).send(book)
}


//Update a book
const updateBook = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID!" })
    }

    try {
        const book = await Book.findById(id)

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Required fields are missing!" })
        }
        else {
            const updatedBook = await Book.findByIdAndUpdate(id, req.body)

            if (!updatedBook) {
                return res.status(404).send({ message: "Book not found!" })
            }
            else {
                return res.status(200).send(updatedBook)
            }
        }
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


//Delete a book
const deleteBook = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID!" })
    }

    try {
        const book = await Book.findByIdAndDelete(id)

        if (!book) {
            return res.status(404).send({ message: "Book not found!" })
        }
        else {
            return res.status(200).send({ message: "Book deleted successfully!" })
        }
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook }