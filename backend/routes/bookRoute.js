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

module.exports = router