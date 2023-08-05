const db = require("../model/index.model");
const notificationCon = require("./notification.controller");
const Order = db.order;
const { Sequelize, Op } = require("sequelize");

const DeliveryAddress = db.deliveryAddress;
const OrderItem = db.orderItem;
const Size = db.sizes;
const Variant = db.variants;
const OrderStatus = db.orderStatus;
const getPagination = require("../utils/pagination");
const getPagingData = require("../utils/paginationData");

exports.createOrder = async (req, res) => {
  const {
    total_amount,
    deliveryaddress_id,
    prices,
    quantities,
    variant_ids,
    size_ids,
    product_ids,
  } = req.body;
  if (!total_amount) {
    res.status(404).send({
      message: "Total Amount is required...",
    });
  }
  if (!deliveryaddress_id) {
    res.status(404).send({
      message: "Delivery address id is required...",
    });
  }

  const status = await OrderStatus.findOne({
    where: {
      status: "New",
    },
  });
  if (!status) {
    console.log("No status new yet");

    await OrderStatus.create({
      status: "New",
    }).then((_status) => {
      try {
        const order = Order.create({
          totalAmount: total_amount,
          orderstatusId: _status.id,
          deliveryaddressId: deliveryaddress_id,
          userId: req.userId,
        }).then((order) => {
          if (order) {
            console.log(order.id)
            if (!variant_ids) {
              res.status(404).send({
                message: "Variant ID is required...",
              });
            }
            for (const index in variant_ids) {
              try {
                const orderItem = OrderItem.create({
                  price: prices[index],
                  quantity: quantities[index],
                  sizeId: size_ids[index],
                  orderId: order.id,
                  variantId: variant_ids[index],
                  productId: product_ids[index],
                }).then((value) => {
                  res.status(201).send({
                    message: "Order Item has been submitted...",
                  });
                  // notificationCon.sendNotification(
                  //   "Your order number",
                  //   "Your order has been submitted...",
                  //   "cZdnHtpqRd-Y0OBSrKIGrg:APA91bEgMdK2WsXzvba0Fr-gHJmgTG6wNyXbNy9tOh5ctA1lmJW_9bt-v6nAirznowZQHsRzxu1xk1r7hgivPiH5ErfE6wG14rkiDQmAFlM-q0qs8EuXFM7HttmvX70ub7nl8kr8iASR"
                  // );
                });
              } catch (ex) {
                res.status(401).send({
                  message: ex.message,
                });
              }
            }
          }
        });

      } catch (ex) {
        res.status(404).send(ex.message);
      }
    });
  } else {
    console.log("Has status new yet");
    try {
      const order = await Order.create({
        totalAmount: total_amount,
        orderstatusId: status.id,
        deliveryaddressId: deliveryaddress_id,
        userId: req.userId,
      });
      if (order) {
        if (!variant_ids) {
          res.status(404).send({
            message: "Variant ID is required...",
          });
        }
        for (const index in variant_ids) {
          try {
            const orderItem = await OrderItem.create({
              price: prices[index],
              quantity: quantities[index],
              sizeId: size_ids[index],
              orderId: order.id,
              variantId: variant_ids[index],
              productId: product_ids[index],
            }).then((value) => {
              res.status(201).send({
                message: "Order Item has been submitted...",
              });
              // notificationCon.sendNotification(
              //   "Your order number",
              //   "Your order has been submitted...",
              //   "cZdnHtpqRd-Y0OBSrKIGrg:APA91bEgMdK2WsXzvba0Fr-gHJmgTG6wNyXbNy9tOh5ctA1lmJW_9bt-v6nAirznowZQHsRzxu1xk1r7hgivPiH5ErfE6wG14rkiDQmAFlM-q0qs8EuXFM7HttmvX70ub7nl8kr8iASR"
              // );
            });
          } catch (ex) {
            res.status(401).send({
              message: ex.message,
            });
          }
        }
      }
    } catch (ex) {
      res.status(404).send(ex.message);
    }
  }
};

exports.updateOrder = async (req, res) => {
  const { total_amount, orderstatus_id, deliveryaddress_id } = req.body;
  if (!req.params.id) {
    res.status(404).send({
      message: "ID is required...",
    });
  }
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    res.status(404).send({
      message: "Order doesn't exist...",
    });
  }
  try {
    const status = await OrderStatus.findByPk(orderstatus_id);
    if (!status) {
      res.status(404).send({ message: "ID Not found" });
    } else {
      await Order.update(
        {
          totalAmount: total_amount,
          deliveryaddressId: deliveryaddress_id,
          userId: req.userId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((order) => {
        if (order) {
          res.status(200).send({
            message: "Order has been updated success...",
          });
        }
      });
    }
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};

exports.updateOrderByAdmin = async (req, res) => {
  const { user_id, orderstatus_id } = req.body;
  if (!req.params.id) {
    res.status(404).send({
      message: "ID is required...",
    });
  }
  const order = await Order.findOne({
    where: {
      [Op.and]: [
        {
          id: req.params.id,
        },
        {
          userId: user_id,
        },
      ],
    },
  });
  if (!order) {
    res.status(404).send({
      message: "Order doesn't exist...",
    });
  }
  try {
    const status = await OrderStatus.findByPk(orderstatus_id);
    if (!status) {
      res.status(404).send({ message: "Status ID Not found" });
    } else {
      await Order.update(
        {
          orderstatusId: orderstatus_id,
        },
        {
          where: {
            [Op.and]: [
              {
                id: req.params.id,
              },
              {
                userId: user_id,
              },
            ],
          },
        }
      ).then((order) => {
        if (order) {
          res.status(200).send({
            message: "Order has been updated by admin success...",
          });
        }
      });
    }
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};

exports.deleteOrder = async (req, res) => {
  if (!req.params.id) {
    res.status(404).send({
      message: "ID is required...",
    });
  }
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      res.status(404).send({
        message: "Order doesn't exist...",
      });
    }
    await Order.destroy({
      where: {
        id: req.params.id,
      },
    }).then((order) => {
      res.status(200).send({ message: "Order has been deleted..." });
    });
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};

exports.findAllOrder = async (req, res) => {
  const userId = req.userId;
  try {
    const orders = await Order.findAll({
      attributes: [
        "id",
        "total_amount",
        [
          db.sequelize.literal(
            "(SELECT orderstatuses.status from orderstatuses where orderstatuses.id=orders.orderstatus_id)"
          ),
          "status",
        ],
        "created_at",
        "updated_at",
      ],
      order: [["id", "DESC"]],
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: OrderStatus,
          attributes: [],
        },
        {
          model: DeliveryAddress,
          attributes: [
            "id",
            "street_no",
            "home_no",
            "full_address",
            "latitute",
            "longtitute",
          ],
        },
        {
          model: OrderItem,
          attributes: ["id", "quantity", "price"],
          include: [
            {
              model: Variant,
              attributes: [
                "id",
                "name",
                "value",
                "product_name",
                "image_url",
                "product_id",
              ],
            },
            {
              model: Size,
              attributes: ["id", "size_text"],
            },
          ],
        },
      ],
    });
    if (orders) {
      res.status(200).send(orders);
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

exports.findInvoiceByOrderId = async (req, res) => {
  try {
    const invoice = await Order.findByPk(req.params.id, {
      attributes: [
        "id",
        "total_amount",
        [
          db.sequelize.literal(`SUM((orderitems.price)*(orderitems.quantity))`),
          "total_amount",
        ],
        "status",
        "created_at",
        "updated_at",
      ],
      order: [["id", "DESC"]],
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: DeliveryAddress,
          attributes: [
            "id",
            "street_no",
            "home_no",
            "full_address",
            "latitute",
            "longtitute",
          ],
        },
        {
          model: OrderItem,
          attributes: [
            "id",
            "quantity",
            "price",
            [
              db.sequelize.literal(`(orderitems.price)*(orderitems.quantity)`),
              "total_price",
            ],
          ],
          include: [
            {
              model: Variant,
              attributes: [
                "id",
                "name",
                "value",
                "product_name",
                "image_url",
                "product_id",
              ],
            },
            {
              model: Size,
              attributes: ["id", "size_text"],
            },
          ],
        },
      ],
      group: [
        "orders.id",
        "deliveryaddress.id",
        "orderitems.id",
        "orderitems.size.id",
        "orderitems.variant.id",
      ],
    });
    if (!invoice) {
      res.status(404).send({
        message: "Invoice not found at this order",
      });
    }
    res.status(200).send(invoice);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};

exports.checkAllOrder = async (req, res) => {
  const { page, size, name } = req.query;
  const { limit, offset } = getPagination(page, size);
  const status = req.query["status"];

  const orderStatus = await OrderStatus.findOne({
    where: {
      status: status,
    },
  });
  console.log(orderStatus);
  if (!orderStatus) {
    res.status(404).send({ message: "Invalid status, create a new one" });
  } else {
    try {
      const orders = await Order.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: [
          "id",
          "total_amount",
          [
            db.sequelize.literal(
              "(SELECT orderstatuses.status from orderstatuses where orderstatuses.id=orders.orderstatus_id)"
            ),
            "status",
          ],
          "created_at",
          "updated_at",
        ],
        order: [["id", "DESC"]],
        where: {
          orderstatusId: orderStatus.dataValues.id,
        },
        include: [
          {
            model: DeliveryAddress,
            attributes: [
              "id",
              "street_no",
              "home_no",
              "full_address",
              "latitute",
              "longtitute",
            ],
          },
          {
            model: OrderItem,
            attributes: ["id", "quantity", "price"],
            include: [
              {
                model: Variant,
                attributes: [
                  "id",
                  "name",
                  "value",
                  "product_name",
                  "image_url",
                  "product_id",
                ],
              },
              {
                model: Size,
                attributes: ["id", "size_text"],
              },
            ],
          },
        ],
      });
      if (orders) {
        const response = getPagingData(orders, page, size);
        res.status(200).send(response);
      }
    } catch (ex) {
      res.status(404).send({
        message: ex.message,
      });
    }
  }
};
