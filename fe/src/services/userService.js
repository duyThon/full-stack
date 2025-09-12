import axios from "../axios"

const handleLogin = (user) => {
    return axios.post(`/api/login`,user);
}

export {
    handleLogin
}