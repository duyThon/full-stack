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

module.exports = {
    handleLogin: handleLogin
}