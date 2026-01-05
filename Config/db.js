const mongoose = require('mongoose')
const connection = (async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connecction successfully' + mongoose.connection.readyState);

        // Fetch food items
        const foodItem = mongoose.connection.db.collection('fooditems');
        const data = await foodItem.find({}).toArray();

        // Fetch food category
        const foodCategory = mongoose.connection.db.collection('foodCategory')
        const categorydata = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.food_category = categorydata;


        // console.log("Fetched data: ", global.food_items);
        // console.log("Fetched data: ", global.food_category);


    } catch (err) {
        console.log(err);
        console.log('connection failed to database' + mongoose.connection.readyState);

    }
})

module.exports = { connection }