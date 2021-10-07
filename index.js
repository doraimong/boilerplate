
const express = require('express')
const app = express()
const port = 5000
const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/")
.then(()=>console.log('MongoDB Connected.............'))    //몽고 디비가 꺼져있을때 cmd에 mongod를 치면 서버 켜진다.
    .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})