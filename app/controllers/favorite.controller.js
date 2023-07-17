const db = require("../model/index.model");
const getPagination = require("../utils/pagination");
const getPagingData = require("../utils/paginationData");
const Favorite = db.favorite;
const Product = db.products;
const Variant = db.variants;

exports.addProductToFavorite = async (req, res) => {
  try {
    const { product_id, variant_id } = req.body;
    await Favorite.create({
      userId: req.userId,
      productId: product_id,
    }).then((product) => {
      res.status(201).send({
        message: "Created success",
      });
    });
  } catch (ex) {
    res.status(404).send({
      message: ex,
    });
  }
};

exports.removeFromFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      where: {
        productId: req.params.id,
      },
    });
    if (!favorite) {
      res.status(404).send({
        message: "invalide id",
      });
    }
    await Favorite.destroy({
      where: {
        productId: req.params.id,
      },
    }).then((re) => {
      res.status(201).send({
        message: "Removed Success",
      });
    });
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

exports.findProductListing = async (req, res) => {
  const token = req.headers.authorization;
  const { page, size, name } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const products = await Favorite.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
      attributes: ["id"],
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "name",
            "description",
            "price",
            "thumbnail_url",
            "discount",
          ],
        },
      ],
    });
    if (!products) {
      res.status(404).send({
        message: "Product not found...",
      });
    } else {
      const response = getPagingData(products, page, size);
      res.status(200).send(response);
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};
