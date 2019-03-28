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
            error: "couldnt get posts"
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
            error: "couldnt get posts by id"
        })
    })
})



router.post('/', (req, res) => {
    const postbod = req.body;

    postDB
    .insert(postbod)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(400).json({
            error: "couldnt post item"
        })
    })
}) 



router.delete('/:id', (req, res) => {
    const id = req.params.id;

        
    postDB
        .remove(id)

        .then(users => {
                res.status(204).end();   
        })
        .catch(error => {
            res.status(500).json({
                error: "post cant be removed"
            })
        }) 

})



router.put('/:id', (req, res) => {

    const id = req.params.id
    const changed = req.body

    
    postDB
        .update(id, changed)

        .then(updated => {
            if (updated == 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.status(200).json(updated)
            }

        })

        .catch(error => {
            res.status(500).json({
                error: "The post information could not be modified."
            });
        })
    
})



module.exports = router