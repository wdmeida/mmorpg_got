function JogoDAO(connection) {
  this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario) {
  this._connection.open(function(err, mongoClient) {
    mongoClient.collection('jogo', function(err, collection) {
      collection.insert({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      });

      mongoClient.close();
    });
  });
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
  this._connection.open(function(err, mongoClient) {
    mongoClient.collection('jogo', function(err, collection) {
      collection.find({usuario}).toArray(function(err, result) {
        res.render('jogo', {img_casa: casa, jogo: result[0], msg});              
      });

      mongoClient.close();
    });
  });
}

JogoDAO.prototype.acao = function(acao) {
  this._connection.open(function(err, mongoClient) {
    mongoClient.collection('acao', function(err, collection) {
      
      var date = new Date();

      var tempo = null;

      switch (parseInt(acao.acao)) {
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 3 * 60 * 60000; break;
        case 4: tempo = 4 * 60 * 60000; break;
      }

      acao.acao_termina_em = date.getTime() + tempo;
      collection.insert(acao);
    });

    mongoClient.close();
  });
}

JogoDAO.prototype.getAcoes = function(usuario, res) {
  this._connection.open(function(err, mongoClient) {
    mongoClient.collection('acao', function(err, collection) {

      var date = new Date();
      var momento_atual = date.getTime();
      
      collection.find({usuario, acao_termina_em: {$gt: momento_atual}}).toArray(function(err, result) {
        res.render('pergaminhos', {acoes: result})
      });
    });

    mongoClient.close();
  });
}

module.exports = function() {
  return JogoDAO;
}