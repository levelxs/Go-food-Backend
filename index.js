require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000;

//Middleware
app.use(express.json());

//cors package
var cors = require('cors')
app.use(cors())  //for all origine

//app.use({origine:'url of frontend'})

//Import database connection
const connection = require('./Config/db')
connection.connection();

//Route path
app.get('/', (req, res) => {
    res.send('The back end Server is Start')
})

//create user (signup) page api
app.use('/api', require('./Routes/CreateUser'))

//Login user api
app.use('/api', require('./Routes/LoginUser'))

//Display User api
app.use('/api', require('./Routes/DisplayData'))

app.use('/api', require('./Routes/OrderData'))

app.use('/api', require('./Routes/MyOrderData'))
app.use('/api', require('./Routes/FoodData'))




app.listen(port, () => {
    console.log(`The server is upon ${port}`);

})