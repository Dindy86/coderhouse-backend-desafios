const express = require('express');
const app = express();
const {Router} = express;
const router = Router();
const getRenderProduct = require('../controllers/productControlers');

router.get('/', getRenderProduct);

module.exports = router;