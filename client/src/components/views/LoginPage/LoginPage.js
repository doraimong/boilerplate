import React,{useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) =>{
        event.preventDefault(); //페이지 리프레시 방지 -> 여기서 써둘 코드를 작동시킬수 없기때문에 방지한다.

        //서버에 올리기

        let body = {
            email: Email,
            password:Password
        }

        dispatch(loginUser(body))  //dispatch로 redux사용을 위한 action을 취한다.
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/') //리액트에서 페이지 이동시키는 방법 
                }else {
                    alert('Error')
                }
            }) 

        /*Axios.post('/login', body)    이거를 action 폴더 user_action으로 옮김
        .then(response=>{

        })*/
    }

    return(
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width: '100%', height:'100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default LoginPage