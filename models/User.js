const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,  //공백 없애준다.
        unique:1        // 중복 없게한다.
    },
    password:{
        type: String,
        minlength:5
    },
    role:{  //관리자 일반 유저 관리
        type:Number,    //예를 들면 0이면 유저 1이면 관리자
        default:0
    },
    image:String,
    token:{ //유효성 관리
        type:String
    },
    tokenExp:{  //토큰 유효기간
        type : Number

    }
})
//스키마를 모델로 감싼다.
const User = mongoose.model('User',userSchema);

//다른 파일에서 사용할수 있게
module.exports={User};