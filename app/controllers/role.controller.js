const db = require("../model/index.model");
const Role = db.roles;

exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400).send({ message: "name is required..." });
    }
    await Role.create({
      name: name,
    }).then((role) => {
      res.status(201).send({ message: "Role has been created", data: role });
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      res.status(404).send({ message: "ID is invalid" });
    } else {
      await Role.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((_) => {
          res.status(200).send({ message: "Role was updated..." });
        })
        .catch((ex) => {
          res.status(400).send(ex.message);
        });
    }
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      res.status(404).send({ message: "Role ID is invalid" });
    } else {
      await Role.destroy({
        where: {
          id: req.params.id,
        },
      }).then((_) => {
        res.status(200).send({ message: "Role was deleted..." });
      });
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

exports.findAllRole = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    });
    res.status(200).send(roles);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
