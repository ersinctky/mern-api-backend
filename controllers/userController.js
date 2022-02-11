const getUser = (req, res) => {
  res.status(200).json({ message: "user" });
};

const updateUser = (req, res) => {
  res.status(200).json({ message: `${req.params.id} id user` });
};
const deleteUser = (req, res) => {
  res.status(200).json({ message: `${req.params.id} id user deleted` });
};
module.exports = { getUser, updateUser, deleteUser };
