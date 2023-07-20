const db = require("../model/index.model");
const Payment = db.payment;
const Order = db.order;
const OrderItem = db.orderItem;
const Vairant = db.variants;
const Size = db.sizes;

exports.createPayment = async (req, res) => {
  const { amount, payment_method, order_id } = req.body;
  if (!amount) {
    res.status(404).send({
      message: "amount is required...",
    });
  }
  if (!order_id) {
    res.status(404).send({
      message: "Order ID is required...",
    });
  }
  try {
    const order = await Order.findByPk(order_id);
    if (order) {
      const payment = await Payment.create({
        amount: amount,
        paymentMethod: payment_method,
        orderId: order_id,
        userId: req.userId,
      });
      if (payment) {
        const order = await Order.findByPk(order_id);
        if (order) {
          await Order.update(
            {
              status: "Paid",
            },
            {
              where: {
                id: order_id,
              },
            }
          );
          const orderitem = await OrderItem.findAll({
            where: {
              orderId: order.id,
            },
          });
          for (const index in orderitem) {
            if (orderitem[index].variantId) {
              const variant = await Vairant.findByPk(
                orderitem[index].variantId
              );
              const size = await Size.findOne({
                where: {
                  variant_id: variant.id,
                },
              });
              await Size.update(
                {
                  qty: size.qty - orderitem[index].quantity,
                },
                {
                  where: {
                    id: size.id,
                  },
                }
              );
            }
          }
        }
        res.status(200).send({
          message: "Thanks for making payment...",
        });
      }
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};
