exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Board.............");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("");
};
