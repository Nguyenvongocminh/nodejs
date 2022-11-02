const errorFunction = (errotBit, statusCode, msg, data) => {
  if (errotBit)
    return {
      is_error: errotBit,
      statusCode,
      message: msg,
    };
  else
    return {
      is_error: errotBit,
      statusCode,
      message: msg,
      data,
    };
};
module.exports = errorFunction;
