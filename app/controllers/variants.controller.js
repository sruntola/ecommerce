const db = require("../model/index.model");
const uploadImage = require("../utils/helpers");
const Variant = db.variants;
const Product = db.products;

exports.addVariant = async (req, res) => {
  const { name, value, product_id, price, qty, image_url } = req.body;
  const imageUrlPath = typeof req.body.product_image;
  if (imageUrlPath === "string") {
    if (!name && !value && !product_id && !price && !qty) {
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
        imageUrl: req.body.product_image,
        price: price,
        qty: qty,
        productId: product_id,
        productName: product.name + " - " + name,
      }).then((color) => {
        res.status(201).send({
          message: "Variant has been created...",
        });
      });
    } catch (ex) {
      res.status(401).send(ex.message);
    }
  } else {
    const myFile = req.file;
    if (!name && !value && !product_id && !price && !qty) {
      res.status(404).send({ message: "Missing field..." });
    }
    const product = await Product.findByPk(product_id);
    if (!product) {
      res.status(401).send({ message: "Product ID is invalid..." });
    }
    try {
      const imageUrl = await uploadImage.uploadImage(myFile);
      await Variant.create({
        name: name,
        value: value,
        imageUrl: imageUrl,
        price: price,
        qty: qty,
        productId: product_id,
        productName: product.name + " - " + name,
      }).then((color) => {
        res.status(201).send({
          message: "Variant has been created...",
        });
      });
    } catch (ex) {
      res.status(401).send(ex.message);
    }
  }
};
exports.deleteVariant = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(401).send({ message: "Variant id is required..." });
    }
    const color = Color.findByPk(req.params.id);
    if (!color) {
      res.status(404).send({ message: "Variant not found..." });
    }
    if (color) {
      await Variant.destroy({
        where: {
          id: req.params.id,
        },
      }).then((value) => {
        res.status(200).send({ message: "Variant has been deleted..." });
      });
    }
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};

exports.updateVariant = async (req, res) => {
  const { name, value, product_id, price, qty, image_url } = req.body;
  const imagePathUrl = typeof req.body.product_image;
  if (imagePathUrl === "string") {
    const product = await Product.findByPk(product_id);
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
            imageUrl: req.body.product_image,
            price: price,
            qty: qty,
            productId: product_id,
            productName: product.name + " - " + name,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then((value) => {
          res.status(200).send({ message: "Variant has been update..." });
        });
      }
    } catch (ex) {
      res.status(401).send(ex.message);
    }
  } else {
    const product = await Product.findByPk(product_id);
    const myFile = req.file;
    try {
      if (!req.params.id) {
        res.status(401).send({ message: "Color id is required..." });
      }
      const color = Variant.findByPk(req.params.id);
      if (!color) {
        res.status(404).send({ message: "Color not found..." });
      }

      if (color) {
        const imageUrl = await uploadImage.uploadImage(myFile);
        await Variant.update(
          {
            name: name,
            value: value,
            imageUrl: imageUrl,
            price: price,
            qty: qty,
            productId: product_id,
            productName: product.name + " - " + name,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then((value) => {
          res.status(200).send({ message: "Variant has been update..." });
        });
      }
    } catch (ex) {
      res.status(401).send(ex.message);
    }
  }
};
