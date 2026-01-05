const express = require('express');
const router = express.Router();
const Order = require('../Model/Order');

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({orderData:myData})
    } catch (error) {
        res.send("Error",error.message)
    }

})
    
module.exports = router