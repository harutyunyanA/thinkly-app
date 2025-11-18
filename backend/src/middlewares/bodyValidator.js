export const validateBody = (fields) => (req, res, next) => {
  for (const f of fields) {
    if (!req.body || !req.body[f] || !req.body[f].toString().trim()) {
      return res.status(400).send({ message: `${f} is required` });
    }
  }
  next();
};
