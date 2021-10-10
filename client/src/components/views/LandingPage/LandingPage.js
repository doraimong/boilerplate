import React,{useEffect} from 'react'
import axios from 'axios';


function LandingPage(){

    useEffect(() => {
        axios.get('/api/hello') //서버로 보낸다.
        .then(response=>{console.log(response)})// 서버에서 가져온다.
    }, [])

    return(
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width: '100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage