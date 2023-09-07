const db = require("../models");
const Entity = require("../entities/entity");

class Event extends Entity {
  constructor(model) {
    super(model);
  }
  editEvent(req, res) {
    const { id } = req.params;
    db.Event.update({ ...req.body }, { where: { id } })
      .then((result) =>
        res.send({ message: `EVENT ID ${id} SUCCESSFULLY EDITED!` })
      )
      .catch((err) => res.status(500).send(err?.message));
  }

  async createEvent(req, res) {
    const { userid } = req.user;
    const eventData = req.body;
    try {
      db.Event.create({ ...eventData, userid })
        .then((result) => res.send({ message: `EVENT CREATED!` }))
        .catch((err) => res.status(500).send(err?.message));
    } catch (err) {
      console.log(err);
      res.status(500).send(err?.message);
    }
  }
  getAllEventWithUser(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: "user" },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  getEventByUserId(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: "user" },
      where: {
        userid: req.params.userid,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  async createUserAndEvent(req, res) {
    try {
      await db.sequelize.transaction(async (t) => {
        const newUser = await db.User.create(
          { ...req.body.users },
          { transaction: t }
        );
        const events = { ...req.body.events, userid: newUser.dataValues.id };
        await db.Event.create({ ...events }, { transaction: t });
        return res.send({ message: "EVENT AND USER SUCCESSFULLY ADDED!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err?.message });
    }
  }
  getEventByFilter(req, res) {
    const { location, category } = req.query;
    db.Event.findAll({
      where: {
        [db.Sequelize.Op.or]: {
          location: { [db.Sequelize.Op.like]: `%${location}%` },
          category: { [db.Sequelize.Op.like]: `%${category}%` },
        },
      },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
}
module.exports = Event;
