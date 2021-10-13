module.exports = {
  error: function (text, code) {
    console.error(text);
    return {
      success: false,
      code,
      message: text,
    };
  },
  unexpectedError: function () {
    console.error(text);
    return {
      success: false,
      code: 500,
      message: "Unexpected error"
    };
  },
  successWithData: function (data) {
    return {
      success: true,
      data
    };
  },
  success: function () {
    return { success: true };
  },
};
