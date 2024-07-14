const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  console.log(amount, 'amount in server');
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      description: "RedMart",
      payment_method: id,
      confirm: false,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.get('/',(req, res)=>{
  res.status(200).send('Hello')
})

app.listen(process.env.PORT || 4000, () => {
  console.log("Sever is listening on port 4000");
});
