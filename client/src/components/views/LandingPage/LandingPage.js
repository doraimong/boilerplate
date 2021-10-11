import React,{useEffect} from 'react'
import axios from 'axios';


function LandingPage(props){

    useEffect(() => {
        axios.get('/api/hello') //서버로 보낸다.
        .then(response=>{console.log(response)})// 서버에서 가져온다.
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')  //바로 axios 사용/ server -> index.js get형식의 logout
         .then(response=> {
             if(response.data.success) {
                 props.history.push("/login")   //로그아웃 후 로그인 페이지로 돌아간다.
             } else {
                 alert('로그아웃 하는데 실패 했습니다.')
             }
         })
    }

    return(
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width: '100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage