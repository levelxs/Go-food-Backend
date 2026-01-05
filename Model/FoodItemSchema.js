const mongoose = require('mongoose')
const FoodItemSchema = new mongoose.Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: 
        {
            small: Number,
            medium: Number,
            full: Number
        }
})

module.exports=mongoose.model('fooditem',FoodItemSchema)