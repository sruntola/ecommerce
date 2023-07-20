const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : null;

  return { limit, offset };
};
module.exports = getPagination;
