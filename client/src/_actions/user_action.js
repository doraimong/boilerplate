import axios from 'axios';
import {
    LOGIN_USER
} from './types';
export function loginUser(dataTosubmit){
     const request = axios.post('api/users/login', dataTosubmit)
     .then(response => response.data)

     return {
         type: LOGIN_USER,  //types.js에서 가져오는 형식
         payload: request
     }
}
