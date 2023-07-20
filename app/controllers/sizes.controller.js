const db = require("../model/index.model");
const Size = db.sizes;

exports.addProductSize = async (req, res) => {
  const { size_text, variant_id, price, qty } = req.body;
  try {
    const size = await Size.create({
      sizeText: size_text,
      variantId: variant_id,
      price: price,
      qty: qty,
    });
    if (size) {
      res.status(201).send({
        message: "Sizes has been created...",
      });
    }
  } catch (ex) {
    res.status(401).send({
      message: ex.message,
    });
  }
};

exports.deleteSize = async (req, res) => {
  const id = req.params.id;
  try {
    const sizes = await Size.destroy({
      where: {
        id: id,
      },
    }).then((value) => {
      res.status(200).send({
        message: "Size has been deleted",
      });
    });
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};
