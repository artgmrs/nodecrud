const express = require('express');
const router = express.Router();

// mongoose model
// @todo - colocar caminho direto
const Employee = require('../models/employee.model');
const { generateCrudMethods } = require('../services');
const employeeCrud = generateCrudMethods(Employee);
const { validateDbId, raiseRecord404Error } = require('../middlewares')

router.get('/', (req, res, next) => {
  employeeCrud.getAll()
    .then(data => res.send(data))
    .catch(err => next(err));
});

router.get('/:id', validateDbId, (req, res, next) => {
  employeeCrud.getById(req.params.id)
    .then(data => {
      console.log(req.params.id);
      if (data)
        res.send(data);
      else
        raiseRecord404Error(req, res);
    })
    .catch(err => next(err));
})

router.post('/', (req, res, next) => {
  employeeCrud.create(req.body)
    .then(data => res.send(data))
    .catch(err => next(err));
})

router.put('/:id', validateDbId, (req, res, next) => {
  employeeCrud.update(req.params.id, req.body)
    .then(data => {
      if (!data) raiseRecord404Error(req, res);
      
      res.send(data);
    })
    .catch(err => next(err));
})

module.exports = router;