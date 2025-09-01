const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/subscribeController');


router.post('/', subscribeNewsletter);

module.exports = router;
