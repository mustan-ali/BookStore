const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookController')


//Method: POST
//Route: /
//Description: Create a new book
router.post('/', controller.createBook)


//Method: GET
//Route: /
//Description: Get all books
router.get('/', controller.getBooks)


//Method: GET
//Route: /:id
//Description: Get a book by id
router.get('/:id', controller.getBookById)


//Method: PUT
//Route: /:id
//Description: Update a book
router.put('/:id', controller.updateBook)


//Method: DELETE
//Route: /:id
//Description: Delete a book
router.delete('/:id', controller.deleteBook)


module.exports = router