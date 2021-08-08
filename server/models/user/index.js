/**
 * User Model
 */

const passwordHash = require("password-hash");
const responseCtrl = require("./../../utils/controllerResponse");
const makeToken = require("./../../utils/makeToken");
const validation = require("./../../utils/validation");
const errList = require("./../../configs/errorsList");

module.exports.createUser = async (userInfo, userModel) => {
  let errorsList = [];
  if (!validation.isExists(userInfo, "email"))
    errorsList.push(errList.existEmail);
  if (!validation.isExists(userInfo, "pass"))
    errorsList.push(errList.existPass);
  if (!validation.isExists(userInfo, "checkPass"))
    errorsList.push(errList.existCheckPass);
  if (!validation.isExists(userInfo, "link"))
    errorsList.push(errList.existLink);
  if (!validation.isExists(userInfo, "nickname"))
    errorsList.push(errList.existNickname);

  if (!validation.fieldLength(userInfo.email, 4, 256))
    errorsList.push(errList.lengthEmail);
  if (!validation.fieldLength(userInfo.pass, 8, 32))
    errorsList.push(errList.lengthPass);
  if (!validation.fieldLength(userInfo.link, 8, 64))
    errorsList.push(errList.lengthLink);
  if (!validation.fieldLength(userInfo.nickname, 8, 64))
    errorsList.push(errList.lengthNickname);

  if (userInfo.checkPass !== userInfo.pass) errorsList.push(errList.passMatch);

  if (!validation.checkEmail(userInfo.email))
    errorsList.push(errList.checkEmail);

  if (validation.checkUse("email", userInfo.email))
    errorsList.push(errList.usedEmail);
  if (validation.checkUse("link", userInfo.link))
    errorsList.push(errList.usedLink);

  if (errorsList.length === 0) {
    const user = new userModel({
      email: userInfo.email,
      pass: passwordHash.generate(userInfo.pass),
      link: userInfo.link,
      nickname: userInfo.nickname,
      token: makeToken(64),
    });

    return new Promise((resolve, reject) => {
      user.save((err, res) => {
        try {
          resolve(responseCtrl(true, res, null));
        } catch {
          reject(responseCtrl(false, null, err));
        }
      });
    });
  } else {
    return responseCtrl(false, null, errorsList);
  }
};

module.exports.getAll = async (userModel) => {
  return new Promise((resolve, reject) => {
    userModel.find({}, "-token -pass", (err, res) => {
      try {
        resolve(responseCtrl(true, res, null));
      } catch {
        reject(responseCtrl(false, null, err));
      }
    });
  });
};

module.exports.getByID = async (userModel, userInfo) => {
  console.log(userInfo);
  return new Promise((resolve, reject) => {
    userModel.find({ _id: userInfo._id }, "-token -pass", (err, res) => {
      try {
        resolve(responseCtrl(true, res, null));
      } catch {
        reject(responseCtrl(false, null, err));
      }
    });
  });
};

module.exports.deleteUser = async (userInfo, userModel) => {
  return new Promise((resolve, reject) => {
    userModel
      .find({ _id: userInfo._id, token: userInfo.token })
      .deleteOne((err) => {
        try {
          resolve(responseCtrl(true, null, null));
        } catch {
          reject(responseCtrl(false, null, err));
        }
      });
  });
};

module.exports.auth = async (userInfo, userModel) => {
  let newToken = MakeToken(64);
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { email: userInfo.email, pass: userInfo.pass },
      { token: newToken },
      (err, res) => {
        try {
          resolve(responseCtrl(true, { token: newToken }, null));
        } catch {
          reject(responseCtrl(false, null, err));
        }
      }
    );
  });
};
