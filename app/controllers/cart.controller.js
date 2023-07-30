const db = require("../model/index.model");
const Cart = db.carts;
const Variant = db.variants;
const Size = db.sizes;

exports.createAddToCart = async (req, res) => {
  const { product_id, size_id, variant_id, price, quantity } = req.body;
  try {
    if (!product_id) {
      res.status(400).send({
        message: "Product ID is required...",
      });
    }
    if (!variant_id) {
      res.status(400).send({
        message: "Variant ID is required...",
      });
    }
    if (!price) {
      res.status(400).send({
        message: "Price is required...",
      });
    }
    if (!quantity) {
      res.status(400).send({
        message: "Quantity is required...",
      });
    }
    const variant = await Variant.findOne({
      where: {
        id: variant_id,
        productId: product_id,
      },
    });
    if (!variant) {
      res.status(404).send({
        message: "This product no variants.",
      });
    }
    if (variant.quantity === 0 || variant.quantity < quantity) {
      res.status(400).send({
        message: "Remain quantity is only " + variant.quantity,
      });
    }

    await Cart.create({
      price: price,
      quantity: quantity,
      productId: product_id,
      variantId: variant_id,
      sizeId: size_id,
      userId: req.userId,
    }).then((cart) => {
      if (cart) {
        res.status(201).send({ message: "Product was added to cart" });
      }
    });
  } catch (ex) {
    res.status(500).send({
      message: ex.message,
    });
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const carts = await Cart.findByPk(req.params.id);
    if (!req.params.id) {
      res.status(404).send({
        message: "Cart id is required...",
      });
    }

    if (!carts) {
      res.status(404).send({
        message: "Product doesn't exist...",
      });
    }
    await Cart.destroy({
      where: {
        id: req.params.id,
      },
    }).then((cart) => {
      if (cart) {
        res.status(200).send({
          message: "Product was remove from cart...",
        });
      }
    });
  } catch (ex) {
    res.status(500).send({
      message: ex.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  const { product_id, size_id, variant_id, quantity } = req.body;
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      res.status(404).send({ message: "Cart doesn't exist..." });
    }
    if (!req.params.id) {
      res.status(400).send({ message: "Cart ID is required.." });
    }
    if (variant_id) {
      if(!product_id){
        res.status(400).send({
          message: "Product id is required..."
        })
      }else {
        const variant = await Variant.findOne({
          where: {
            id: variant_id,
            productId: product_id,
          },
        });
        if (!variant) {
          res.status(404).send({
            message: "This product no variants.",
          });
        }
        if (variant.quantity === 0 || variant.quantity < quantity) {
          res.status(400).send({
            message: "Remain quantity is only " + variant.quantity,
          });
        }
      }
    }
    if(size_id){
      if(!variant_id){
        res.status(400).send({
          message: "Variant ID is required..."
        })
      }else {
        const size = await Size.findOne({
          where: {
            variant_id: variant_id
          }
        })
        if(!size){
          res.status(400).send({message: "Size doesn't exist with this variant..."})
        }
      }
    }
    await Cart.update(
      {
        quantity: quantity,
        variantId: variant_id,
        sizeId: size_id,
      },
      {
        where: {
          id: req.params.id,
          userId: req.userId
        },
      }
    ).then((cart) => {
      if (cart) {
        res.status(201).send({ message: "Product was update to cart" });
      }
    });
  } catch (ex) {
    res.status(500).send({
      message: ex.message,
    });
  }
};

exports.findAllCartListing = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: {
        userId: req.userId,
      },
      attributes: ["id", "price", "quantity", 'product_id'],
      include: [
        {
          model: Variant,
          attributes: ["id", "name", "value", "image_url", "product_name"],
        },
        {
          model: Size,
          attributes: ["id", "size_text"],
        },
      ],
    });
    if (carts) {
      res.status(200).send(carts);
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};
