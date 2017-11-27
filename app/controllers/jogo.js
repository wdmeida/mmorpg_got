module.exports.jogo = function(application, req, res) {
  
  if (!req.session.autorizado) {
    res.render('index', {validacao: {}});
    return;    
  } 

  var comando_invalido = 'N';

  req.query.comando_invalido === 'S' ? comando_invalido = 'S' : comando_invalido = 'N';

  console.log(comando_invalido);

  var usuario = req.session.usuario;
  var casa = req.session.casa;

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
}

module.exports.sair = function(application, req, res) {
  req.session.destroy(function(err) {
    res.render('index', {validacao: {}});
  });
}

module.exports.suditos = function(application, req, res) {
  if (!req.session.autorizado) {
    res.render('index', {validacao: {}});
    return;    
  } 
  
  res.render('aldeoes', {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res) {
  if (!req.session.autorizado) {
    res.render('index', {validacao: {}});
    return;    
  }

  res.render('pergaminhos', {validacao: {}});
}

module.exports.ordenarAcaoSudito = function(application, req, res) {
  var dadosForm = req.body;

  req.assert('acao', 'Ação deve ser informada').notEmpty();
  req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.redirect('jogo?comando_invalido=S');
    return;
  }

  console.log(dadosForm);
  res.send('tudo ok');
}