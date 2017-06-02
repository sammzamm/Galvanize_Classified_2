'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// YOUR CODE HERE

// READ
router.get('/', (req, res, next) => {
  knex('classifieds')
  .select('id', 'title', 'description', 'price', 'item_image')
  .then(results => {
    // console.log(results);
    res.send(results)
  })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('classifieds')
  .select('id', 'title', 'description', 'price', 'item_image')
  .where('id', id)
  .then(results => {
    // console.log(results);
    res.send(results[0])
  })
})

// CREATE
router.post('/', (req, res, next) => {
  knex('classifieds')
  .insert({title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image})
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .then((results) => {
    res.json(results[0]);
  })
  .catch((err) => {
    res.send(err);
    // console.log(results[0]);
  })
})

// UPDATE
router.patch('/:id', (req, res, next) => {
  // console.log("body: ", req.body);
  // console.log("params: ", req.params);
  knex('classifieds')
  .where('id', req.params.id)
  .update(req.body)
  .returning('*')
  .then((results) => {
    delete results[0].created_at;
    delete results[0].updated_at;
    res.json(results[0])
  })
  .catch((err) => {
    res.send(err)
  })
})

// DELETE
router.delete('/:id', (req, res, next) => {
  let id = +req.params.id
      knex('classifieds')
        .where('id', id)
        .returning('*')
        .del()
        .then((results) => {
          delete results[0].created_at;
          delete results[0].updated_at;
          console.log(results)
          let id = results[0].id
          let name = results[0].name
          let message = results[0].message
          // console.log(id, title, description, price, item_image);
          res.send(results[0])
        })
        .catch((err) => {
          res.send(err)
  })
})


module.exports = router;
