const db = require("../model/index.model");
const Gender = db.genders;

exports.createGender = async (req, res) => {
  try {
    await Gender.create({
      value: req.body.value,
    }).then((gender) => {
      res.status(201).send({
        message: "Gender was created successfull",
      });
    });
  } catch (ex) {
    res.status(404).send({ message: ex.message });
  }
};

exports.updateGender = async (req, res) => {
  const gender = await Gender.findByPk(req.params.id);
  if (gender) {
    try {
      await Gender.update(
        {
          value: req.body.value,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((response) => {
        res.status(200).send({ message: "Gender was updated successfully..." });
      });
    } catch (ex) {
      res.status(404).send({ message: ex.message });
    }
  } else {
    res.status(404).send({ message: "Id is invalid..." });
  }
};

exports.deleteGender = async (req, res) => {
  const gender = await Gender.findByPk(req.params.id);
  if (gender) {
    try {
      await Gender.destroy({
        where: {
          id: req.params.id,
        },
      }).then((response) => {
        res.status(200).send({ message: "Gender was deleted successfully..." });
      });
    } catch (ex) {
      res.status(404).send({ message: ex.message });
    }
  } else {
    res.status(404).send({ message: "Id is invalid..." });
  }
};

exports.findAllGender = async (req, res) => {
  try {
    const genders = await Gender.findAll({ attributes: ["id", "value"] });
    if (genders) {
      res.status(200).send(genders);
    }
  } catch (ex) {
    res.status(404).send({ message: ex.message });
  }
};
