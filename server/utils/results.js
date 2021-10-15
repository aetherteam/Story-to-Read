module.exports = {
  error: function (text, code) {
    console.error(text);
    return {
      success: false,
      code,
      error: text,
    };
  },
  unexpectedError: function () {
    console.error(text);
    return {
      success: false,
      code: 500,
      error: "Unexpected error"
    };
  },
  successWithData: function (data) {
    return {
      success: true,
      code: 200,
      data
    };
  },
  success: function () {
    return { success: true, code: 200 };
  },
};
