const userDataModel = require("./../dataModels/user");

<<<<<<< Updated upstream
module.exports.isExists = (arr, needle) => {
  try {
    if (Array.isArray(arr)) return arr.includes(needle);
  } catch {
    return false;
  }
  try {
    if (typeof arr === "object") {
      if (arr.hasOwnProperty(needle)) return true;
      else return false;
    }
  } catch {
    return false;
  }
};

module.exports.fieldLength = (str, min, max) => {
  try {
    if (str.length >= min && str.length <= max) return true;
  } catch {
    return false;
  }
};
=======
module.exports = {
    email: function (email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            console.log("[Validation] email is correct");
            return true;
        }

        console.log("[Validation] email is incorrect");
        return false;
    },
    basic: function (value) {
        if (
            value != "" &&
            value != null &&
            value.length >= 2 &&
            value.length < 256
        ) {
            console.log("[Validation] field is basically correct");
            return true;
        }

        console.log("[Validation] field is basically incorrect");
        return false;
    },
    passwords: function (password, passwordConfirmation) {
        if (password.length > 6 && password === passwordConfirmation) {
            console.log("[Validation] passwords are match");
            return true;
        }

        console.log("[Validation] passwords are not match");
        return false;
    },
    bookDescription: function (description) {
        return description.length <= 400;
    },
    chapterContent: function (chapterContent) {
        return chapterContent.length > 10 && chapterContent.length < 10000;
    },
    isRegistered: async function (userID) {
        const usersCollection = await mongo.connectWithUsersCollection();
>>>>>>> Stashed changes

module.exports.checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports.checkUse = async (field, value) => {
  return new Promise((resolve, reject) => {
    userDataModel.find({ [field]: value }, (res, err) => {
      console.log({ [field]: value });
      console.log(res);
      console.log(err);
      try {
        resolve(true);
      } catch {
        reject(false);
      }
    });
  });
};
