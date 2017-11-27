module.exports.jogo = function(application, req, res) {
  
  if (!req.session.autorizado) {
    res.render('index', {validacao: {}});
    return;    
  } 

  var usuario = req.session.usuario;
  var casa = req.session.casa;

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa);
}

module.exports.sair = function(application, req, res) {
  req.session.destroy(function(err) {
    res.render('index', {validacao: {}});
  });
}