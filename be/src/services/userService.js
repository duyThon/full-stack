import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let existedUser = await checkUserEmail(email);
      if (existedUser) {
        let check = await bcrypt.compare(password, existedUser.password);
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "OK";
          delete existedUser.password;
          userData.user = existedUser;
        } else {
          userData.errCode = 3;
          userData.errMessage = "Wrong password";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "User not foundss";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        attributes: ['email', 'password', 'firstName', 'lastName', 'roleId'],
        where: { email },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = async (id) => {
  if(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: { id: id },
          raw: true,
          attributes: {
            exclude: ['password']
          }
        })
        resolve(user);
      } catch (e) {
        reject(e);
      }
    })
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        let users = await db.User.findAll({
          raw: true,
          attributes: {
            exclude: ['password']
          }
        })
        resolve(users);
      } catch (e) {
        reject(e);
      }
    })
  }
}

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUser: getAllUser
};
