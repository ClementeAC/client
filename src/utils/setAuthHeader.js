import axios from 'axios'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (token) {
    if (token){
        axios.defaults.headers.commmon['Authorizations'] = 'Bearer' + token
    } else {
        axios.defaults.headers.commmon['Authorizations'] = null
    }
}