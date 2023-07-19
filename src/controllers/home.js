const home = async (req, res) => {
  return res
    .status(200)
    .json({ message: " Seja bem-vindo a Task Manager API" });
};

module.exports = home;
