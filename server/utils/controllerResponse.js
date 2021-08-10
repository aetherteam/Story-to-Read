module.exports = function (status = true, data = null, error = null) {
  if (status)
    return {
      status: status,
      data: data,
    };
  else
    return {
      status: status,
      error: error,
    };
};
