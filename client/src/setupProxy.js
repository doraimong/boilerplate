const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function(app) {

app.use(

'/api',

createProxyMiddleware({

target: 'http://localhost:5000',    //프론트(3000번)에서 5000번으로 주겠다.

changeOrigin: true,

})

);

};