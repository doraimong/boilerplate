const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const {User} = require("./models/User");
//application/x-www-form-urlencoded 데이터를 분석해서 가져오게 함
app.use(bodyParser.urlencoded({extended: true}));
//application/ json 타입으로 된 것을 분석 가져오기
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose=require('mongoose')
mongoose.connect(config.mongoURI)  //대체 : "mongodb://localhost:27017/"
.then(()=>console.log('MongoDB Connected.............'))    //몽고 디비가 꺼져있을때 cmd에 mongod를 치면 서버 켜진다.
    .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req, res)=>{
  res.send("안녕하세요 ~ ")
})

app.post('/register',(req, res)=>{
  //회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  //body-parser를 이용해서 정리된 정보를 받는다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({ //status(200)은 성공을 의미 
      success:true
    })
  })
})

app.post('/login',(req, res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 검색.
  User.findOne({email: req.body.email}, (err, user)=>{  //User 모델을(유저 스키마 정보존재) 이용 -> 검색해서 없다면 user 없을 것이다.
    if(!user){
      return res.json({
        loginSuccess:false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})
     
        // 비밀번호가 맞다면 토큰을 생성
      user.generateToken((err, user)=>{
        if(err)return res.status(400).send(err);
        //토큰을 쿠키에 저장
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId:user._id})
      })

      
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})