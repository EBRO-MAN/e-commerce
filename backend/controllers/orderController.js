import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Chapa } from "chapa-nodejs";

//AB
// const Chapa = require("chapa");

let myChapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_kEY,
});

const customerInfo = {
  amount: "100",
  currency: "ETB",
  email: "abebe@bikila.com",
  first_name: "Abebe",
  last_name: "Bikila",
  // tx_ref: 'tx-x12345', // if autoRef is set in the options we dont't need to provide reference, instead it will generate it for us
  callback_url: "https://chapa.co", // your callback URL
  customization: {
    title: "I love e-commerce",
    description: "It is time to pay",
  },
};

myChapa
  .initialize(customerInfo, { autoRef: true })
  .then((response) => {
    /*
    response:
      {
        message: 'Hosted Link',
        status: 'success' || 'failed',
        data: {
          checkout_url: 'https://checkout.chapa.co/checkout/payment/:token'
        },
        tx_ref: 'generated-token' // this will be the auto generated reference
      }
    */
    console.log(response);
    // saveReference(response.tx_ref)
  })
  .catch((e) => console.log(e)); // catch errors

// // async/await
// let response = await myChapa.initialize(customerInfo, { autoRef: true });

// myChapa
//   .verify("txn-reference")
//   .then((response) => {
//     console.log(response); // if success
//   })
//   .catch((e) => console.log(e)); // catch errors

// // async/await
// let response = await myChapa.verify("txn-reference");

// //initialize Chapa
// const chapa = new Chapa({
//   secretKey: process.env.CHAPA_SECRETE_kEY,
// });
// // Generate transaction reference using our utility method or provide your own

// const generateChapaTransaction = async () => {
//   try {
//     const tx_ref = await chapa.genTxRef();
//     const response = await chapa.initialize({
//       first_name: "John",
//       last_name: "Doe",
//       email: "john@gmail.com",
//       phone_number: "0911121314",
//       currency: "ETB",
//       amount: "200",
//       tx_ref: tx_ref,
//       callback_url: "https://www.google.com/callback",
//       return_url: "https://example.com/",
//       customization: {
//         title: "Test Title",
//         description: "Test Description",
//       },
//     });
//     console.log(response);

//     return response;
//   } catch (error) {
//     console.error("Error generating Chapa transaction: ", error);
//     throw new Error(error.message);
//   }
// };

// Verify Chapa transaction
// const verifyChapaTransaction = async (tx_ref) => {
//   try {
//     const verifyResponse = await chapa.verify({ tx_ref });
//     return verifyResponse;
//   } catch (error) {
//     console.error("Error verifying Chapa transaction: ", error);
//     throw new Error(error.message);
//   }
// };
// //global variables
// const currency = "ETB";
// const deliveryCharge = 10;

// //gateway initialize
// const chapa = new Chapa(process.env.CHAPA_SECRETE_kEY);

//Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// //Placing orders using Chapa Method
// const placeOrderChapa = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const { origin } = req.headers;

//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Chapa",
//       payment: false,
//       date: Date.now(),
//     };
//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));
//     line_items.push({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: deliveryCharge * 100,
//       },
//       quantity: 1,
//     });

//     const session = await chapa.checkout.sessions.create({
//       success_url: `${origin}/verify?success= true&orderId=${newOrder._id}`,
//       cancel_url: `${origin}/verify?success= false&orderId=${newOrder._id} `,
//       line_items,
//       mode: "payment",
//     });
//     res.json({ success: true, session_url: session_url });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //Placing orders using Stripe Method
// const placeOrderStripe = async (req, res) => {};

// //Placing orders using Razorpay Method
// const placeOrderRazorpay = async (req, res) => {};

//All orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User order data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  // placeOrderStripe,
  // placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
