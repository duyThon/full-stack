import express from "express";
import homeController from "../controllers/homeController";


let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCURD);
    router.post('/post-crud', homeController.postCURD);
    router.get('/get-crud', homeController.displayGetCURD);
    
    return app.use('/', router);
}

module.exports = initWebRoute;