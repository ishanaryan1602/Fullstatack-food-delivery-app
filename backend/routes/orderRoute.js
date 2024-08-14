const express = require('express');
const authMiddleware = require('../middleware/auth');
const { placeOrder } = require('../contorllers/orderController');

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);

module.exports = orderRouter;
