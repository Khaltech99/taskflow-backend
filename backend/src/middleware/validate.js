const validate = (Schema, input = "body") => {
  return (req, res, next) => {
    const result = Schema.safeParse(req[input]);
    if (result.success) {
      req[input] = result.data;
      next();
    } else {
      next(result.error);
    }
  };
};
export default validate;
