const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds=10


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

userSchema.pre('save', function(next){      //저장전 전처리하고 next함수 실행하면 다음으로 넘어간다.
    //비밀번호를 암호화
    var user=this;

    if(user.isModified('password')){    //비밀번호가 수정될때만 암호화 해준다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err)return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){   //hash가 암호화된 비번
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

//스키마를 모델로 감싼다.
const User = mongoose.model('User',userSchema);

//다른 파일에서 사용할수 있게
module.exports={User};