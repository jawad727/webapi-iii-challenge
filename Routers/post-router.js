const express = require('express')

const postDB = require('../data/helpers/postDb')

const router = express.Router();


router.get('/', (req, res) => {
postDB
    .get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(400).json({
            error: "couldnt get items"
        })
    })

})

router.get('/:id', (req, res) => {
    const id = req.params.id;
postDB
    .getById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(400).json({
            error: "couldnt get items by id"
        })
    })
})


router.post('/', (req, res) => {
    const body = req.body

    postDB
    .insert(body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(400).json({
            error: "couldnt post item"
        })
    })
}) 





module.exports = router