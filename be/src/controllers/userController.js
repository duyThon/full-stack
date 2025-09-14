import userService from '../services/userService';

let handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(500).json({
            message: 'Missing inputs'
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        ...userData,
        user: userData.user ? userData.user : {}
    });
}

let handleGetAllUsers = async (req, res) => {
    let type = req.body.type; //ALL, id
    let id = req.body.id;
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    });
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}