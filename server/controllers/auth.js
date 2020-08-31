exports.register = (req, res, next) => {
  res.send('user registered!');
};

exports.login = (req, res, next) => {
  res.send('user logged in!');
};
