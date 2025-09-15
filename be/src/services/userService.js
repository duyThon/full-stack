import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 2,
          errMessage: "Email already exists",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        ...data,
        password: hashPasswordFromBcrypt,
        gender: data.gender === "1" ? true : false,
      });
      resolve({
        errCode: 0,
        errMessage: "OK", 
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The user isn't exist",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = async (userId) => {
  try {
    if (!userId) {
      return {
        errCode: 2,
        errMessage: "The user isn't exist",
      };
    }
    await db.User.destroy({ where: { id: userId } });
    const allUsers = await db.User.findAll();
    return allUsers;

  } catch (e) {
    throw e;
  }
};


let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
