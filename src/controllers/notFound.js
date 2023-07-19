const notFound = async (req, res) => {
  return res.status(404).json({ message: "Essa rota não foi encontrada" });
};

module.exports = notFound;
