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

module.exports = { createBook, getBooks }