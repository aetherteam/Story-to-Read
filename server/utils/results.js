module.exports = {
  error: function (text, code) {
    console.error(text);
    return {
      success: false,
      code,
      message: text,
    };
  },
  successWithData: function (result) {
    return {
      success: true,
      data
    };
  },
  success: function () {
    return { success: true };
  },
};
