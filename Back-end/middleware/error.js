module.exports = (err, req, res, next) => {
  const message = `An error occured: ${err.message}`;

  res.status(500).send(message);
};
