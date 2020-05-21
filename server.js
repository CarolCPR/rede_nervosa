var express = require('express');
var app = express();

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/
/*app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
  if (req.headers["x-forwarded-proto"] == "http") //Checa se o protocolo informado nos headers é HTTP 
      res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
  else //Se a requisição já é HTTPS 
      next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});*/
app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});