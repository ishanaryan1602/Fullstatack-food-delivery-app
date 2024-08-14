const stripe = require("stripe");
const { default: orderModel } = require("../models/orderModel");
const userMdoel = require("../models/userModel");

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

    const frontend_url = "https://localhost:5173"

    try{
        const newOrder = new orderModel({
            userId : req.body.userId,
            item:req.body.items,
            amount : req.body.amount,
            address : req.body.address
        })

        await newOrder.save();
        await userMdoel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
             price_data:{
                 currency:"inr",
                 product_data:{
                     name:"Delivery Fee",
                 },
                 unit_amount:2*100*80
             },
             quantity:1
        })

        const session = await Stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&order_id=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&order_id=${newOrder._id}`,
        });

        res.json({sucess:true,session_url})

    }catch(err){
        console.log(err.message);
        res.json({sucess:false,message:"Error"})
    }
}

module.exports = {placeOrder};