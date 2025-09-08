import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllUser: getAllUser,
  createNewUser: createNewUser,
};
