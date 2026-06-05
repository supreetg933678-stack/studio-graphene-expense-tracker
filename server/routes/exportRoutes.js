const express = require('express');
const router = express.Router();
const { exportCsv } = require('../controllers/exportController');

router.get('/', exportCsv);

module.exports = router;
