import axios from "../axios"

const handleLogin = (user) => {
    return axios.post(`/api/login`,user);
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users`,id);
}

export {
    handleLogin,
    getAllUsers
}