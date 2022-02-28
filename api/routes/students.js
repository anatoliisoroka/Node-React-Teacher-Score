const express = require('express');
const router = express.Router();
const studentsService = require('../services/studentsService');

/* GET students */
router.get('/', async function(req, res, next) {
  try {
    res.json(await studentsService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
});

/* POST student */
router.post('/', async function(req, res, next) {
  try {
    res.json(await studentsService.create(req.body));
  } catch (err) {
    console.error(`Error while creating student`, err.message);
    next(err);
  }
});

/* PUT student */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await studentsService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating student`, err.message);
    next(err);
  }
});

/* DELETE student */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await studentsService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting student`, err.message);
    next(err);
  }
});

module.exports = router;
