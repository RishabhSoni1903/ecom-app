import axios from '../axios'

export const signup = async (data) => {
    const result = await axios.post('/auth/signup', data)
        .then((response) => {
            return response
        }).then((error) => {
            return error
        })
    console.log(result, 'user created');
    return result;
}