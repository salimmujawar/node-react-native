const express = require('express');

const router = express.Router();
const {getStock, createStock} = require('../controllers/stock');

router.get('/stock', getStock);
router.post('/stock', createStock);

module.exports = router;