const express = require('express')

const userDB = require('../data/helpers/userDb')

const router = express.Router();


//custom middleware
function toCap(req, res, next) {
    const name = req.body.name.toUpperCase();
    req.body.name = name;
    next();
}



router.get('/', (req, res) => {
    userDB
        .get()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(400).json({
                error: "couldnt get users"
            })
        })
    
})
    
    
    
router.get('/:id', (req, res) => {
        const id = req.params.id;
    userDB
        .getById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(400).json({
                error: "couldnt get users by id"
            })
        })
})
    
    
    
router.post('/', toCap, (req, res) => {
        const postbod = req.body;
    
        userDB
        .insert(postbod)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(400).json({
                error: "couldnt post user"
            })
        })
}) 
    
    
    
router.delete('/:id', (req, res) => {
        const id = req.params.id;
    
            
        userDB
            .remove(id)
    
            .then(users => {
                    res.status(204).end();   
            })
            .catch(error => {
                res.status(500).json({
                    error: "user cant be removed"
                })
            }) 
    
})
    
    
    
router.put('/:id', (req, res) => {
    
        const id = req.params.id
        const name = req.body.name
    
        
        userDB
            .update(id, name)
    
            .then(updated => {
                if (updated == 0) {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist."
                    })
                } else {
                    res.status(200).json(updated)
                    
                }
    
            })
    
            .catch(error => {
                res.status(500).json({
                    error: "The user information could not be modified."
                });
            })
        
})
    


module.exports = router