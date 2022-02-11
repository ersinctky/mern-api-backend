const register = (req, res) => {
  res.status(200).json({ message: "register" });
};
const login = (req, res) => {
  res.status(200).json({ message: "login" });
};

module.exports = {
  register,
  login,
};
