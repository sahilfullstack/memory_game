'use strict';
module.exports = function(app) {
  var game = require('../controllers/gameController');

  // Game Routes
  app.route('/game/start')
    .get(game.start);

    
  app.route('/game/:id')
    .get(game.getGame);

  
  app.route('/game/move/:id')
    .put(game.move);    
};
