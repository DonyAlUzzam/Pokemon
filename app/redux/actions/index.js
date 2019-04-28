import axios from 'axios';
import { BASE_URL, PIC_URL } from 'react-native-dotenv';


export const getAllPokemon = () => {
    return {
        type: 'GET_ALL_POKEMONS',
        payload: axios.get(`${BASE_URL}pokemons`)
    }   
}

export const getDetailPokemon = (id) => {
    return {
        type:  'GET_POKEMON_DETAIL',
        payload: axios.get(`${BASE_URL}pokemons/` + id)
    }
}

// export const postQuestion = ( title, content, authToken) => {
//     alert(authToken)
//     return {
//         type: 'POST_QUESTION',
//         payload: axios.post(`${BASE_URL}questions/`, {
     
//             'title': title,
//             'content': content
//         },{
//             headers:{
//                 Authorization: authToken
//             }
//         }
        
//         )
//     }
// }

// export const postAnswer = (idQuestion, answer, authToken) => {
//     return {
//         type: 'POST_ANSWER',
//         payload: axios.post(`${BASE_URL}answers/`, {
           
//             'question_id': idQuestion,
//             'content': answer
//         },{
//             headers:{
//                 Authorization: authToken
//             }
//         }
        
//         )
//     }
// }

// Account
export const registerUser = ( username, email, password, confirm_password ) => {
    return {
        type: 'REGISTER_USER',
        payload: axios.post(`${BASE_URL}users/register`, {
            'username': username,
            'email': email,
            'password': password,
            'confirm_password': confirm_password
        })
    }
}

export const loginUser = (email, password) => {
    return {
        type: 'LOGIN_USER',
        payload: axios.post(`${BASE_URL}users/login`, {
            'email': email,
            'password': password
        })
    }
}


export const getUser = (token) => {
    return  {
        type: 'GET_USER',
        payload: axios.get(`${BASE_URL}users/data`, {
            headers: {
                Authorization: token
            }
        })
    }
}

export const clearUser= () => {
    return {
        type: 'CLEAR_USER'
    }
}