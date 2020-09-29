create = (req, res) => {
  const { title, owner } = req.body;

  res.json('success');
};

module.exports = {
  create,
};
