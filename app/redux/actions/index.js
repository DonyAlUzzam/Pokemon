import axios from 'axios';
import { BASE_URL, PIC_URL } from 'react-native-dotenv';


export const getAll = () => {
    return {
        type: 'GET_ALL_PRODUCTS',
        payload: axios.get(`${BASE_URL}products`)
    }   
}

export const getDetail = (id) => {
    return {
        type:  'GET_PRODUCT_DETAIL',
        payload: axios.get(`${BASE_URL}products/` + id)
    }
}
