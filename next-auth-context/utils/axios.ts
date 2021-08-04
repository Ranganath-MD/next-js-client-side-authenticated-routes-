import Axios from 'axios'
import Cookies from 'js-cookie';

export const api = Axios.create({
    baseURL: 'https://dev-sahaaya.herokuapp.com',
    headers: {
        'Authorization': Cookies.get('token')
    }
})