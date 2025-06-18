import paypal from "@paypal/checkout-server-sdk";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import client from "../../helpers/paypal.js"; // Importing PayPal client

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId
    } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2)
          },
          description: "E-commerce Order Payment"
        }
      ],
      application_context: {
        return_url: "https://speedcom.netlify.app/shop/paypal-return",
        cancel_url: "https://speedcom.netlify.app/shop/paypal-cancel"
      }
    });

    const response = await client.execute(request);

    if (!response || !response.result) {
      return res.status(500).json({
        success: false,
        message: "Error while creating PayPal order"
      });
    }

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: response.result.id // PayPal order ID
    });

    await newlyCreatedOrder.save();

    const approvalURL = response.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!"
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found"
      });
    }

    const request = new paypal.orders.OrdersCaptureRequest(paymentId);
    request.requestBody({});

    const captureResponse = await client.execute(request);

    if (!captureResponse || !captureResponse.result) {
      return res.status(500).json({
        success: false,
        message: "Error capturing PayPal payment"
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.payerId = captureResponse.result.payer.payer_id;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${item.title}`
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!"
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!"
      });
    }

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!"
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!"
    });
  }
};

export { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
