import {
    LOGIN_USER
} from '../_actions/types';

//전 스테이트와 현재것을 다음 스테이트로 바꾼다.
export default function(state={}, action){
    switch(action.type){
        case LOGIN_USER:
                return {...state, loginSuccess: action.payload}//...state : 스프레드 오퍼레이터 인자속state를 똑같이 가져오는 거
            break;
        
        default:
            return state;
        
    }
}