function asyncHandler(fn) {
  return async function (req, res, next) {
    try {
      const result = await fn(req, res, next);
      if (result !== undefined) {
        return result;
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message || "Internal Server Error" });
    }
  };
}
