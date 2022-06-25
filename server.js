const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');

const SECRET = '123456'
app.use(express.json()); 
//app.use(express.urlencoded());

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    console.log(req.headers)
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'touro' && req.body.password === 'tourin'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

app.get('/', verifyJWT, (req, res) => {
    res.send('Passei')
})

app.listen(3500,() => {
  console.log("rodando na porta 3000")
})