const db = require("../model/index.model");
const Product = db.products;
const Variant = db.variants;
const Review = db.reviews;
const User = db.users;
const PurchasedCourse = db.purchased_course;
const Favorite = db.favorite;
const CourseSection = db.course_section;
const Lesson = db.lesson;
const Profile = db.profiles;
const CourseViews = db.course_views;
const Size = db.sizes;
const { QueryTypes } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const getPagination = require("../utils/pagination");
const getPagingData = require("../utils/paginationData");
const uploadImage = require("../utils/helpers");
// const { getVideoDurationInSeconds } = require('get-video-duration')
exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    discount,
    thumbnail,
    category_id,
    variant_name,
    variant_value,
    qty_of_product_size,
    variant_image_url,
    size_text,
  } = req.body;
  const imageUrlPath = typeof req.body.thumbnail;
  if (imageUrlPath === "string") {
    if (!name) {
      res.status(403).send({
        message: "Course title is required...",
      });
    }
    if (!price) {
      res.status(403).send({
        message: "Price is required...",
      });
    }
    //   if (!thumbnail_url) {
    //     res.status(403).send({
    //       message: "Thumbnail Url is required...",
    //     });
    //   }
    if (!category_id) {
      res.status(403).send({
        message: "Category id is required...",
      });
    }
    try {
      const product = await Product.create({
        name: name,
        description: description,
        price: price,
        thumbnailUrl: req.body.thumbnail,
        userId: req.userId,
        discount: discount,
        categoryId: category_id,
      });
      if (product) {
        console.log("Product ID: ", product.id);
        const variant = await Variant.create({
          name: variant_name,
          productName: product.name + " - " + variant_name,
          value: variant_value,
          imageUrl: variant_image_url,
          productId: product.id,
          discount: discount,
        });
        if (variant) {
          const size = await Size.create({
            sizeText: size_text,
            price: product.price,
            variantId: variant.id,
            qty: qty_of_product_size,
          });
          if (size) {
            res.status(201).send({ message: "Product has been created..." });
          }
        }
      }
    } catch (ex) {
      res.status(404).send({ message: ex.message });
    }
  } else {
    const myFile = req.file;
    console.log(myFile);
    if (!name) {
      res.status(403).send({
        message: "Course title is required...",
      });
    }
    if (!price) {
      res.status(403).send({
        message: "Price is required...",
      });
    }
    //   if (!thumbnail_url) {
    //     res.status(403).send({
    //       message: "Thumbnail Url is required...",
    //     });
    //   }
    if (!category_id) {
      res.status(403).send({
        message: "Category id is required...",
      });
    }
    try {
      const imageUrl = await uploadImage.uploadImage(myFile);
      const product = await Product.create({
        name: name,
        description: description,
        price: price,
        thumbnailUrl: imageUrl,
        userId: req.userId,
        discount: discount,
        categoryId: category_id,
      });
      if (product) {
        console.log("Product ID: ", product.id);
        const variant = await Variant.create({
          name: variant_name,
          productName: product.name + " - " + variant_name,
          value: variant_value,
          imageUrl: variant_image_url,
          productId: product.id,
        });
        if (variant) {
          const size = await Size.create({
            sizeText: size_text,
            price: product.price,
            variantId: variant.id,
            qty: qty_of_product_size,
          });
          if (size) {
            res.status(201).send({ message: "Product has been created..." });
          }
        }
      }
    } catch (ex) {
      res.status(404).send({ message: ex.message });
    }
  }
};

exports.findAllCourseByUser = async (req, res) => {
  const userId = req.userId;
  const courses = await Course.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "price",
      "is_paid",
      "what_will_learn",
      "requirement",
      "thumbnail_url",
      "language",
      "created_at",
      "updated_at",
      [db.sequelize.literal("SUM(reviews.rating)"), "total_ratings"],
      [
        db.sequelize.literal(`COUNT(purchased_courses.user_id)`),
        "total_registered",
      ],
      [
        db.sequelize.literal(
          `(CASE when (favorites.id) is not null and (favorites.user_id)=${userId} then true else false end)`
        ),
        "is_favorite",
      ],
    ],

    // ,
    // // group: ['Course.id'],
    include: [
      // [db.sequelize.literal(`(select sum(r.rating) from courses c left join reviews r on r.course_id = c.id)`), 'total_rating'],
      // [db.sequelize.literal(`(select count(user_id) from purchased_courses group by user_id)`), 'total_student'],
      {
        model: Review,
        // attributes: ["id", "review_text"],
        attributes: [],
        // include: {
        //     model: User,
        //     attributes: ["id", "first_name", "last_name"],
        // }
      },
      // ,
      {
        model: User,
        attributes: [],
      },
      {
        model: PurchasedCourse,
        attributes: [],
      },
      {
        model: Favorite,
        attributes: [],
      },
      {
        model: CourseSection,
        attributes: ["id", "title"],
      },
    ],
    group: ["courses.id", "favorites.id", "course_sections.id"],
  });
  if (!courses) {
    res.status(404).send({
      message: "Course not found...",
    });
  } else {
    res.status(200).send(courses);
  }
};

exports.deleteProduct = async (req, res) => {
  const product = Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).send({
      message: "ID is invalid...",
    });
  } else {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    }).then((product) => {
      res.status(200).send({
        message: "Product deleted...",
      });
    });
  }
};

exports.updateProduct = async (req, res) => {
  const product = Product.findByPk(req.params.id);
  const imagePathUrl = typeof req.body.thumbnail;
  if (imagePathUrl === "string") {
    const { name, description, price, discount, thumbnail, category_id } =
      req.body;
    if (!product) {
      res.status(404).send({
        message: "ID is invalid...",
      });
    }
    await Product.update(
      {
        name: name,
        description: description,
        price: price,
        thumbnailUrl: thumbnail,
        userId: req.userId,
        categoryId: category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((product) => {
      res.status(201).send({
        message: "Product updated...",
      });
    });
  } else {
    const myFile = req.file;
    const { name, description, price, discount, thumbnail_url, category_id } =
      req.body;
    if (!product) {
      res.status(404).send({
        message: "ID is invalid...",
      });
    }
    const thumbnail = await uploadImage.uploadImage(myFile);
    await Product.update(
      {
        name: name,
        description: description,
        price: price,
        thumbnailUrl: thumbnail,
        userId: req.userId,
        categoryId: category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((product) => {
      res.status(201).send({
        message: "Product updated...",
      });
    });
  }
};

exports.findProductListing = async (req, res) => {
  const token = req.headers.authorization;
  const { page, size, name } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    if (!name) {
      if (!token) {
        const products = await Product.findAndCountAll({
          limit: limit,
          offset: offset,
          order: [["id", "ASC"]],
          attributes: [
            "id",
            "name",
            "description",
            "price",
            "thumbnail_url",
            "discount",
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
      } else {
        const products = await Product.findAndCountAll({
          limit: limit,
          offset: offset,
          order: [["id", "ASC"]],

          attributes: [
            "id",
            "name",
            "description",
            "price",
            "thumbnail_url",
            "discount",
          ],
          include: [
            {
              model: Favorite,
              attributes: [],
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
      }
    } else {
      if (!token) {
        const products = await Product.findAndCountAll({
          limit: limit,
          offset: offset,
          order: [["id", "ASC"]],
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: "%" + name + "%",
                },
              },
            ],
          },
          attributes: [
            "id",
            "name",
            "description",
            "price",
            "thumbnail_url",
            "discount",
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
      } else {
        const products = await Product.findAndCountAll({
          limit: limit,
          offset: offset,
          order: [["id", "ASC"]],
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: "%" + name + "%",
                },
              },
            ],
          },
          attributes: [
            "id",
            "name",
            "description",
            "price",
            "thumbnail_url",
            "discount",
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
      }
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

exports.findProductListingByCategory = async (req, res) => {
  const token = req.headers.authorization;
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    if (!token) {
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {
          categoryId: req.params.id,
        },
        order: [["id", "ASC"]],
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "thumbnail_url",
          "discount",
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
    } else {
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
        where: {
          categoryId: req.params.id,
        },
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "thumbnail_url",
          "discount",
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
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};

// find course detail

exports.findProductDetail = async (req, res) => {
  const token = req.headers.authorization;
  const id = req.params.id;
  try {
    if (!token) {
      const product = await Product.findByPk(id, {
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "thumbnail_url",
          "discount",
          [
            db.sequelize.literal(
              `(CASE when (favorites.id) is not null and (favorites.user_id)=null then true else false end)`
            ),
            "is_favorite",
          ],
        ],
        include: [
          {
            model: Variant,
            attributes: ["id", "name", "value", "product_name", "image_url"],
            include: [
              {
                model: Size,
                attributes: ["id", "size_text", "price", "qty", "variant_id"],
              },
            ],
          },
          {
            model: Review,
            attributes: ["id", "rating", "review_text", "created_at"],
            include: {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          },
          {
            model: Favorite,
            attributes: [],
          },
        ],
      });
      if (!product) {
        res.status(404).send({
          message: "Product not found...",
        });
      } else {
        res.status(200).send(product);
      }
    } else {
      const product = await Product.findByPk(id, {
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "thumbnail_url",
          "discount",
          [
            db.sequelize.literal(
              `(CASE when (favorites.id) is not null and (favorites.user_id)=${req.userId} then true else false end)`
            ),
            "is_favorite",
          ],
        ],
        include: [
          {
            model: Variant,
            attributes: ["id", "name", "value", "product_name", "image_url"],
            include: [
              {
                model: Size,
                attributes: ["id", "size_text", "price", "qty", "variant_id"],
              },
            ],
          },
          {
            model: Review,
            attributes: ["id", "rating", "review_text", "created_at"],
            include: {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          },
          {
            model: Favorite,
            attributes: [],
          },
        ],
      });
      if (!product) {
        res.status(404).send({
          message: "Product not found...",
        });
      } else {
        res.status(200).send(product);
      }
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};
exports.createCourseView = async (req, res) => {
  const { course_id } = req.body;
  const course_view = await CourseViews.create({
    userId: req.userId,
    courseId: course_id,
  });
  if (!course_view) {
    res.status(404).send({
      message: "Cannot create course view",
    });
  } else {
    res.status(201).send({
      message: "success",
    });
  }
};

exports.findRelatedCourse = async (req, res) => {
  const courses = await Course.findAll({
    where: {
      sub,
    },
  });
};

exports.searchfindProductListing = async (req, res) => {
  const token = req.headers.authorization;
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    if (!token) {
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${title}%`,
              },
            },
          ],
        },
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "thumbnail_url",
          "discount",
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
    } else {
      const products = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "thumbnail_url",
          "discount",
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
    }
  } catch (ex) {
    res.status(404).send({
      message: ex.message,
    });
  }
};
