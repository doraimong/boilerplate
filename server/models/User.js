const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds=10
const jwt = require('jsonwebtoken');

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
    }else{      //다른 요소를 바꿀땐 그냥 둔다.
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){   //cb 콜백함수[홈페이지에 찾아보니까 형식이 그냥 .method.comparePassword 로 메소드를 추가하는 거다.(https://mongoosejs.com/docs/api/schema.html#schema_Schema-method)]

    // plainPassword가 입력된 비번, this.password가 암호화된 비번 => plainPassword를 암호화해서 비교를 해야한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        console.log(isMatch);
        if(err)return cb(err) //다를때
            cb(null, isMatch)//같을때, isMatch는 true의 의미 그리고 index의 comparePassword 함수로 돌아간다. 
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')                   //!!!!!!!!!!!id로 토큰을 만든다-> 이메일 관리시 수정필요 

    user.token = token  //스키마의 토큰에 넣고
    user.save(function(err,user){   //저장 
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {  
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){   // decoded : 디코드 된거는 user._id [user._id +' ' = token]
        
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token":token}, function(err, user){  
            if(err) return cb(err); // 문제있으면 콜백으로 에러 전달, 없다면 유저정보 전달
            cb(null, user)
        })
    })
}

//스키마를 모델로 감싼다.
const User = mongoose.model('User',userSchema);

//다른 파일에서 사용할수 있게
module.exports={User};