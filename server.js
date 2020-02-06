const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const Estudantes = require('./models/Estudantes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');

app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/admin', (req, res) => {
  const lista = Estudantes.find();
  lista.then(e => {
    res.send(JSON.stringify(e));
  });
});

app.post('/cadastro', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let nome, email, token;
  try {
    nome = req.body.nome;
    email = req.body.email;
    token = req.body.token;
  } catch (e) {
    res.json({
      success: false
    });
  }
  Estudantes.create({
    nome,
    email,
    token
  }, (err, doc) => {
    let success = true
    if (err) success = false;
    res.send({
      success
    });
  });
});

app.post('/login', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let email, token;
  try {
    email = req.body.email;
    token = req.body.token;
  } catch (e) {
    res.json({
      success: false
    });
  }
  Estudantes.findOne({
    email,
    token
  }, (err, doc) => {
    let success = true;
    if (err) success = false;
    if (!doc) success = false;
    res.send({
      success,
      id: doc ? doc._id : null
    });
  });
});

app.get('/aluno/:id', function (req, res) {
  Estudantes.findOne({
    _id: req.params.id,
  }, (err, doc) => {
    let success = true;
    if (err) success = false;
    res.render('dados', doc);
  });
});

app.listen(port);
console.log('Server started! At http://localhost:' + port);