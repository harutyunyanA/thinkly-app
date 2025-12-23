export const validateBody = (fields) => (req, res, next) => {
  for (const item of fields) {
    if (!req.body || !req.body[item] || !req.body[item].toString().trim()) {
      return res.status(400).send({ message: `${item} is required` });
    }
  }
  next();
};
