const express = require('express')
const router = express.Router()
const ApiResponse = require('../utils/ApiResponse')
const errorParser = require('../utils/ErrorParser')
const { Books, BookSeller } = require('../models/index')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

router.use((request, response, next) => {
    if (request.user.type == 'Seller') {
        next()
    }
    else {
        response.status(500).json(new ApiResponse(false, "Unauthorized Access !", null, "Only Seller allowed !"))
    }
})


//book_name,publisher_name,author_name,selling_price,rental_price,image,isoldbook,trans_type,category
router.post("/", async (request, response) => {
    try {
        const uploadFile = request.files.image;
        if (uploadFile == null || uploadFile == undefined) {
            response.status(500).json(new ApiResponse(false, "Book image not uploaded !", null, null))
        }
        else {
            if (uploadFile.mimetype.includes('image/')) {
                const name = uuidv4() + path.extname(uploadFile.name)
                const filePath = './uploads/' + name
                uploadFile.mv(filePath)
                const seller = await BookSeller.findOne({ where: { user: request.user.userid } })
                const book_data = { ...request.body, status: true,image :name ,seller: seller.id }
                const book = await Books.create(book_data);
                response.status(200).json(new ApiResponse(true,"Book Saved !",book,null))
            }
            else {
                response.status(500).json(new ApiResponse(false, "Book image Wrong Format !", null, null))
            }
        }
    }
    catch (err) {
        response.status(500).json(new ApiResponse(false, "Book not Saved !", null, errorParser(err)))
    }

})
//book_name,publisher_name,author_name,selling_price,rental_price,image,isoldbook,trans_type,category
// router.put("/:id", async (request, response) => {
//     const reqData = request.body;
//     const id = request.params.id
//     const { book_name, publisher_name, author_name, selling_price, rental_price, image, isoldbook, trans_type, category } = reqData
//     try {
//         const book = await Books.update({ book_name, publisher_name, author_name, selling_price, rental_price, image, isoldbook, trans_type, category }, { where: { id } })
//         if (book[0] > 0) {
//             response.status(200).json(new ApiResponse(true, "Book Updated !", book, null))
//         }
//         else {
//             response.status(500).json(new ApiResponse(false, "Book not found !", null, null))
//         }
//     }
//     catch (err) {
//         response.status(500).json(new ApiResponse(false, "Book not updated !", null, errorParser(err)))
//     }
// })
router.patch("/:id", async (request,response) => {
    const id = request.params.id
    try {
        var book = await Books.findOne({ where: { id } })
        if (book == null) {
            response.status(500).json(new ApiResponse(false, "Book not found !", null, null))
        }
        else {
            book.status = !book.status
            book.save()
            response.status(200).json(new ApiResponse(true, "Book Status Changed !", null, null))
        }
    }
    catch (err) {
        response.status(500).json(new ApiResponse(false, "Book Status Unchanged !", null, errorParser(err)))
    }
})

module.exports = router