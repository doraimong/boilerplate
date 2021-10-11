import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

//전 스테이트와 현재것을 다음 스테이트로 바꾼다.
export default function(state={}, action){
    switch(action.type){
        case LOGIN_USER:
                return {...state, loginSuccess: action.payload}//...state : 스프레드 오퍼레이터 인자속state를 똑같이 가져오는 거
            break;
        case REGISTER_USER:
            return {...state, register: action.payload} //서버에서 가져온 response를 action.payload로 넣어준다.
        break;
        case AUTH_USER:
            return {...state, userData: action.payload} //서버에서 가져온 response를 action.payload로 넣어준다. action.payload에 모든 userdata가 들어있다.from[app.get('/api/users/auth', auth, (req, res)=>]
        break;
        
        default:
            return state;
        
    }
}