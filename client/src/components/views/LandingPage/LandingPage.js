import React,{useEffect} from 'react'
import axios from 'axios';


function LandingPage(){

    useEffect(() => {
        axios.get('/api/hello') //서버로 보낸다.
        .then(response=>{console.log(response)})// 서버에서 가져온다.
    }, [])

    return(
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage