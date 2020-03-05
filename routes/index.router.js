const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper')

router.post('/register', userCtrl.register);
router.post('/authenticate', userCtrl.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, userCtrl.userProfile);
router.get('/chartData', jwtHelper.verifyJwtToken, userCtrl.getChartData);

module.exports = router;
