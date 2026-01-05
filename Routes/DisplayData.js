const express = require('express')
const router = express.Router()
const FoodItem = require('../Model/FoodItemSchema')



router.get('/foodData', async (req, res) => {
    try {
    //    const data = await FoodItem.find()
       res.send([global.food_items,global.food_category])
    //    return res.status(200).json({success:true,massage:'data fetched',data:data})

    }catch (error) {
        res.status(500).json({ message: "Error fetching users", error })
    }
})

module.exports = router