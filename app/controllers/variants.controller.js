const db = require("../model/index.model");
const Variant = db.variants;
const Product = db.products;

exports.addVariant = async (req, res) => {
  const { name, value, product_id, price, qty, image_url } = req.body;
  if (!name && !value && !product_id && !price && !qty && !image_url) {
    res.status(404).send({ message: "Missing field..." });
  }
  const product = await Product.findByPk(product_id);
  if (!product) {
    res.status(401).send({ message: "Product ID is invalid..." });
  }
  try {
    await Variant.create({
      name: name,
      value: value,
      imageUrl: image_url,
      price: price,
      qty: qty,
      productId: product_id,
      productName: product.name + " - " + name,
    }).then((color) => {
      res.status(201).send({
        message: "Color has been created...",
      });
    });
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};
exports.deleteVariant = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(401).send({ message: "Color id is required..." });
    }
    const color = Color.findByPk(req.params.id);
    if (!color) {
      res.status(404).send({ message: "Color not found..." });
    }
    if (color) {
      await Variant.destroy({
        where: {
          id: req.params.id,
        },
      }).then((value) => {
        res.status(200).send({ message: "Color has been deleted..." });
      });
    }
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};

exports.updateVariant = async (req, res) => {
  const { name, value, product_id, price, qty, image_url } = req.body;
  if (!name && !value && !product_id && !price && !qty && !image_url) {
    res.status(404).send({ message: "Missing field..." });
  }
  const product = await Product.findByPk(product_id);
  if (!product) {
    res.status(401).send({ message: "Product ID is invalid..." });
  }
  try {
    if (!req.params.id) {
      res.status(401).send({ message: "Color id is required..." });
    }
    const color = Variant.findByPk(req.params.id);
    if (!color) {
      res.status(404).send({ message: "Color not found..." });
    }

    if (color) {
      await Variant.update(
        {
          name: name,
          value: value,
          productId: product_id,
          imageUrl: image_url,
          productName: product.name + " - " + name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((value) => {
        res.status(200).send({ message: "Color has been update..." });
      });
    }
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};
