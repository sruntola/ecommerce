const db = require("../model/index.model");
const Profile = db.profiles;
const User = db.users;
const { Sequelize, Op } = require("sequelize");
const uploadImage = require("../utils/helpers");

exports.createProfile = async (req, res) => {
  const { is_latest } = req.body;
  const imageUrlPath = typeof req.body.imageprofile;
  if (imageUrlPath === "string") {
    try {
      await Profile.create({
        imageUrl: req.body.imageprofile,
        isLatest: is_latest,
        userId: req.userId,
      }).then((profile) => {
        if (profile.isLatest) {
          Profile.update(
            {
              isLatest: false,
            },
            {
              where: {
                id: {
                  [Op.not]: profile.id,
                },
              },
            }
          );
        }
        res.status(200).send({
          message: "Profile was uploaded",
        });
      });
    } catch (ex) {
      res.status(404).send({
        message: ex.message,
      });
    }
  } else {
    const myFile = req.file;
    try {
      const imageUrl = await uploadImage.uploadImage(myFile);
      console.log(imageUrl);
      await Profile.create({
        imageUrl: imageUrl,
        isLatest: is_latest,
        userId: req.userId,
      }).then((profile) => {
        if (profile.isLatest) {
          Profile.update(
            {
              isLatest: false,
            },
            {
              where: {
                id: {
                  [Op.not]: profile.id,
                },
              },
            }
          );
        }
        res.status(200).send({
          message: "Profile was uploaded",
        });
      });
    } catch (ex) {
      res.status(404).send({
        message: ex.message,
      });
    }
  }
};

exports.getProfileInfo = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(404).send({ message: "Unauthorized" });
  }
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "email",
        "bio",
      ],
      include: [
        {
          model: Profile,
          attributes: ["id", "image_url", "is_latest"],
        },
      ],
    });
    if (user) {
      res.status(200).send(user);
    }
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};

exports.updateProfile = async (req, res) => {
  const { first_name, last_name, phone_number, bio } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    if (user) {
      await User.update(
        {
          firstName: first_name,
          lastName: last_name,
          phoneNumber: phone_number,
          bio: bio,
        },
        {
          where: {
            id: req.userId,
          },
        }
      ).then((_user) => {
        res.status(200).send({ message: "Profile Information was updated..." });
      });
    }
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};
exports.selectProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (profile) {
      await Profile.update(
        {
          isLatest: true,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((_profile) => {
        Profile.update(
          {
            isLatest: false,
          },
          {
            where: {
              id: {
                [Op.not]: req.params.id,
              },
            },
          }
        );
        res.status(200).send({ message: "Profile was change sucessfully..." });
      });
    }
  } catch (ex) {
    res.status(404).send(ex.message);
  }
};
