const userDataModel = require("./../dataModels/user");

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
