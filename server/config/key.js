// index.js속 mongoose.connect("mongodb://localhost:27017/") 속 주소에 정보 보안을 위해 외부에 드러나지 않도록 하는데 local일때 dev, 배포 후에는 prod에서 대처를한다.
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else{
    module.exports = require('./dev');
}