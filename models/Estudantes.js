const mongoose = require('mongoose');
// TODO: Refactoring essa chamada no mongo para um datasource
mongoose.connect('mongodb://localhost:27017/estudantes', {useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Estudante = new Schema({
  id: ObjectId,
  nome: String,
  email: String,
  dateOn: Date,
  token: String
});
module.exports = mongoose.model('Estudantes', Estudante);
