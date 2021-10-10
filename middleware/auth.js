const { default: reportWebVitals } = require('../client/src/reportWebVitals');
const {User} = require('../models/User');


let auth = (req, res, next) =>{

    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    //토큰을 복호화 한후 유저를 찾는다(유저모델에서 메소드를 만들어서 다시 수행)
    User.findByToken(token, (err, user)=> {
        if(err)throw err;
        if(!user) return res.json({isAuth: false, error: true}) //res.json({})내부는 클라이언트에 전달해주는 내용

        req.token = token;  //auth.js에서 token과 user를 전달받아서 사용할 수 있도록 넣어줌
        req.user = user;
        next();
    })

    //유저가 있으면 인증 ㅇㅇ

    //유저가 없으면 인증 ㄴㄴ

}

module.exports ={auth};  