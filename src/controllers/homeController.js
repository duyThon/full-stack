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

module.exports = {
    getHomePage: getHomePage,
    getCURD: getCURD,
    postCURD: postCURD
};