const validate = (Schema, input = "body") => {
  return (req, res, next) => {
    const result = Schema.safeParse(req[input]);
    if (result.success) {
      req[input] = result.data;
      next();
    } else {
      const error = new Error("Invalid input");
      error.status = 400;
      error.errors = result.error.format();
      next(error);
    }
  };
};
export default validate;
