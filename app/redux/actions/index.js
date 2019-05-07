import axios from 'axios';
import { BASE_URL, PIC_URL } from 'react-native-dotenv';


export const getAllPokemon = (page) => {
    // alert(BASE_URL)
    return {
        type: 'GET_ALL_POKEMONS',
        payload: axios.get(`${BASE_URL}pokemons?perPage=10&page=${page}`)
    }   
}

export const getDetailPokemon = (id) => {
    return {
        type:  'GET_POKEMON_DETAIL',
        payload: axios.get(`${BASE_URL}pokemons/` + id)
    }
}


export const searchPokemon = (text) => {
    return {
        type:  'GET_SEARCH_POKEMON',
        payload: axios.get(`${BASE_URL}pokemons?search=${text}`)
    }
}


export const addPokemon = (name, image, type, longitude, latitude, category_id, token) => {

    let data = new FormData();
    data.append('name', name);
    data.append('image_url', image);
    data.append('longitude', longitude);
    data.append('latitude', latitude);
    data.append('category_id', category_id);

    type.map(element => {
        data.append('type_id', element);
    });
    console.log(data)
    return {
        type: 'ADD_POKEMON',
        payload: axios.post(`${BASE_URL}pokemons`, data, {
            headers: {
                Authorization: token
            }
        })
    }

}

export const deleteItem = (id, authToken) =>{
    return {
        type: 'DELETE_ITEM',
        payload: axios.delete(`${BASE_URL}pokemons/${id}`,{
            headers: {
                Authorization: authToken
            }
        })
    }
}

export const updatePokemon = (authToken, id, name, image_url, latitude, longitude, category_id, type) => {
    let data = new FormData();
    data.append('name', name);
    data.append('image_url', image_url);
    data.append('longitude', longitude);
    data.append('latitude', latitude);
    data.append('category_id', category_id);

    type.map(element => {
        data.append('type', element);
    });
    // alert(`${API_URL}pokemons/${id}`)
    return {
        type: 'UPDATE_POKEMON',
        payload: axios.patch(`${BASE_URL}pokemons/${id}`, data, {
            headers: {
                Authorization: authToken
            }
        }).catch(err => alert(err))
    }
}



export const getMapsPokemon = () => {
    return {
        type:  'GET_MAPS_POKEMON',
        payload: axios.get(`${BASE_URL}pokemons`)
    }
}


export const allType = () => {
    return {
        type: 'GET_ALL_TYPES',
        payload: axios.get(`${BASE_URL}types`)
    }   
}

export const allCategory = () => {
    return {
        type: 'ALL_CATEGORIES',
        payload: axios.get(`${BASE_URL}categories`)
    }   
}



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