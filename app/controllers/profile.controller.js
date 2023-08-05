const db = require("../model/index.model");
const Profile = db.profiles;
const User = db.users;
const Gender = db.genders;
const Role = db.roles;
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
        "date_of_birth",
        "bio",
        [
          db.sequelize.literal(
            `(SELECT roles.name from users inner join roles on users.role_id = roles.id where users.id=${userId})`
          ),
          "role",
        ],
      ],
      include: [
        {
          model: Profile,
          attributes: ["id", "image_url", "is_latest"],
        },
        {
          model: Gender,
          attributes: ["id", "value"],
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
  const {
    first_name,
    role_id,
    last_name,
    phone_number,
    date_of_birth,
    bio,
    gender_id,
  } = req.body;
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
          dateOfBirth: date_of_birth,
          genderId: gender_id,
          roleId: role_id,
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

exports.assignRole = async (req, res) => {
  const { user_id, role_id } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      res.status(404).send({ message: "User not found..." });
    } else {
      await User.update(
        {
          roleId: role_id,
          id: user_id,
        },
        {
          where: {
            id: user_id,
          },
        }
      ).then((user) => {
        res.status(200).send({ message: "New role was assign to this user" });
      });
    }
  } catch (ex) {
    res.status(400).send(ex.message);
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
