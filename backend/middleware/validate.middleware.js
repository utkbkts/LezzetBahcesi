function validateRequestBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (!error) {
      next();
    } else {
      const errors = error.details.map((err) => ({
        message: err.message,
        path: err.path,
      }));
      res.status(400).json({ errors });
    }
  };
}

export default validateRequestBody;
