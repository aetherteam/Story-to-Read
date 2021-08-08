module.exports = {
  // User \\

  // register

  existEmail: {
    title: "existEmail",
    message: "The email field was not filled in",
    code: 10010,
  },
  existPass: {
    title: "existPass",
    message: "The pass field was not filled in",
    code: 10011,
  },
  existCheckPass: {
    title: "existCheckPass",
    message: "The checkpass field was not filled in",
    code: 10012,
  },
  existLink: {
    title: "existLink",
    message: "The link field was not filled in",
    code: 10013,
  },
  existNickname: {
    title: "existNickname",
    message: "The nickname field was not filled in",
    code: 10014,
  },

  lengthEmail: {
    title: "lengthEmail",
    message:
      "The email field must not exceed 256 characters",
    code: 10020,
  },
  lengthPass: {
    title: "lengthPass",
    message:
      "The length of the pass field must be at least 8 and no more than 32 characters",
    code: 10021,
  },
  lengthLink: {
    title: "lengthLink",
    message: "The length of the link field must be at least 8 and no more than 64 characters",
    code: 10023,
  },
  lengthNickname: {
    title: "lengthNickname",
    message:
      "The length of the nickname field must be at least 8 and no more than 64 characters",
    code: 10024,
  },

  passMatch: {
    title: "passMatch",
    message: "Passwords don't match they match",
    code: 10030,
  },

  checkEmail: {
    title: "checkEmail",
    message: "Invalid email format",
    code: 10040,
  },

  usedEmail: {
    title: "usedEmail",
    message: "This email is already being used",
    code: 10050,
  },
  usedLink: {
    title: "usedLink",
    message: "This link is already being used",
    code: 10051,
  },
};
