import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {data: JSON.stringify(data)}  );
    } catch (error) {
        console.log(error); 
    }
};

let getCURD = async (req, res) => {
    return res.render('crud.ejs');
};

let postCURD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.redirect('/');
};

let displayGetCURD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {data: data});
};

let getEditCURD = async (req, res) => {
    let userId = req.query.id;
    let user = await CRUDService.getUserInfo(userId);
};

let putEditCURD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUser(data);
};

module.exports = {
    getHomePage: getHomePage,
    getCURD: getCURD,
    postCURD: postCURD,
    displayGetCURD: displayGetCURD,
    getEditCURD: getEditCURD,
    putEditCURD: putEditCURD
};