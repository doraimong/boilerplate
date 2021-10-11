import React,{useState} from 'react'
import Axios from 'axios'   //axios는 안쓰는데 그 이유로 redux로 request를 보내기 때문 
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] =useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmsetPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) =>{
        setConfirmsetPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); //페이지 리프레시 방지 -> 여기서 써둘 코드를 작동시킬수 없기때문에 방지한다.

        //서버에 올리기

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password:Password,
            name: Name
        }

        /*이분에 리덕스를 안쓴다면 axios를 쓰면된다. Axios.post('/api/users/register', body)*/

        dispatch(registerUser(body))  //dispatch로 redux사용을 위한 action을 취한다.[user_action.js]
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }

            }) 

        
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button type="submit">
                    회원 가입
                </button>

            </form>

        </div>
    )
}

export default withRouter(RegisterPage)