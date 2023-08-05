const db = require("../model/index.model");
const OrderStatus = db.orderStatus;

exports.createOrderStatus = async (req, res) => {
  try {
    await OrderStatus.create({
      status: req.body.status,
    }).then((order_status) => {
      res.status(201).send({
        message: "Order status was submitted...",
      });
    });
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderStatus = await OrderStatus.findByPk(req.params.id);
    if (!orderStatus) {
      res.status(404).send({
        message: "Order status not existed...",
      });
    } else {
      await OrderStatus.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((orderStatus) => {
        res.status(200).send({ message: "Order status was updated..." });
      });
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

exports.findAllOrderStatus = async (req, res) => {
  try {
    const orderStatus = await OrderStatus.findAll();
    res.status(200).send(orderStatus);
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

exports.deleteOrderStatus = async (req, res) => {
  try {
    const orderStatus = await OrderStatus.findByPk(req.params.id);
    if (!orderStatus) {
      res.status(404).send({
        message: "Order status not existed...",
      });
    } else {
      await OrderStatus.destroy({
        where: {
          id: req.params.id,
        },
      }).then((orderStatus) => {
        res.status(200).send({ message: "Order status was deleted..." });
      });
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};
