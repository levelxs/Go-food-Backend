// const express = require('express')
// const router = express.Router()
// const Order = require('../Model/Order')

// router.post('/orderData',async(req,res)=>{
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_data:req.body.order_data})

//     let eId=await Order.findOne({'email':req.body.email})
//     console.log(eId)
//     //if new user order first time
//     if(eId===null){
//         try{
//             await Order.create({
//                 email:req.body.email,
//                 order_data:[data]
//             }).then(()=>{
//                 res.json({success:true})
//             })

//         }catch(error){
//             console.log(error.massage);
//             res.send('server error',error.massage)
            
//         }
//     }

//     //already user exist
//     else{
//         try{
//             await Order.findByIdAndUpdate({email:req.body.email},
//                 {$push:{order_data:data}}).then(()=>{
//                     res.json({success:true})
//                 })
//         }catch(error){
//             res.send('server error',error.massage)
//         }
//     }
// })
// module.exports = router

const express = require('express');
const router = express.Router();
const Order = require('../Model/Order');

router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        console.log("Email:", email);
        console.log("Order Data:", order_data);

        if (!email || !order_data) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // check if user exists
        let existingOrder = await Order.findOne({ email });

        // If first order
        if (!existingOrder) {
            await Order.create({
                email,
                order_data: [{
                    items: order_data,
                    date: order_date
                }]
            });

            return res.status(200).json({ success: true });
        }

        // If user already exists → push new order
        await Order.updateOne(
            { email },
            {
                $push: {
                    order_data: {
                        items: order_data,
                        date: order_date
                    }
                }
            }
        );

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
