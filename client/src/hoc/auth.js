import React, {useEffect} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){
    /* 인자 option
        null : 아무나 출입가능
        true : 로그인한 유저만 출입가능
        false: 로그인한 유저는 출입 불가 -> 에 맞게 app.js에 옵션을 줘라 
        인자 adminRoute : admin 유저만 들어가게 하려면 app.js에서 true 옵션 줘라
    */
    
    function AuthenticationCheck(props){
        //서버에 request를 보내서 그 사람의 현재 상태를 가져온다.
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(response=>{ //서버 auth()에서 처리해서 가져온 정보가 response에 들어있다.
                
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){ //option이 true인 페이지 들어가려면 다른데로 못가게 막는다 -> 바로 자동으로 로그인 페이지로 보내
                        props.history.push('/login')
                    }
                }else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){    //admin이 아닌데 admin 전용 페이지 출입 시도시 방지
                        props.history.push('/')
                    }else{
                        if(option === false)    //로그인 한 사람이 login, register 페이지로 가려할때 
                        props.history.push('/')
                    }
                }
            })
            //Axios.get('/api/users/auth')
        },[])

        return (
            <SpecificComponent/>
        )

    }


    return AuthenticationCheck
}