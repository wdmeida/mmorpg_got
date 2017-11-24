/* importar o mongodb */
var mongo = require('mongodb');

// Cria um wrapper que evita que a conexão seja feita desnecessariamente.
var connectionDB = function() {
  var db = new mongo.Db(
    'got',
    new mongo.Server(
      'localhost',
      27017,
      {}
    ),
    {}    
  );

  return db;
}

module.exports = function() {
  return connectionDB;
} 