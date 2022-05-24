const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const pageChecked = page > 0 ? page : 1;
  const limitChecked = limit < 1 || limit > 10 ? 10 : Number(limit);
  const skip = (pageChecked - 1) * limitChecked;

  if (favorite === "true") {
    const favoriteContacts = await Contact.find(
      { owner: _id, favorite: "true" },
      { __v: 0 },
      { skip, limit: limitChecked }
    );

    return res.status(200).json(favoriteContacts);
  }

  const contacts = await Contact.find({ owner: _id }, { __v: 0 }, { skip, limit: limitChecked });

  res.status(200).json(contacts);
};

module.exports = getAll;
