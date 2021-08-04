import Axios from "axios";
import Cookies from "js-cookie";

const api = Axios.create({
    baseURL: "https://dev-sahaaya.herokuapp.com",
    headers: {
        'Authorization': Cookies.get('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;
