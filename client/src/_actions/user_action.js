import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';
export function loginUser(dataTosubmit){
     const request = axios.post('api/users/login', dataTosubmit)
     .then(response => response.data)

     return {
         type: LOGIN_USER,  //types.js에서 가져오는 형식
         payload: request
     }
}

export function registerUser(dataTosubmit){
     const request = axios.post('/api/users/register', dataTosubmit) // /api/users/register를  server의 index.js와 같게 해준다. 
     .then(response => response.data)

     return {
         type: REGISTER_USER,  //types.js에서 가져오는 형식
         payload: request
     }
}

