'use strict';
var game = require('../services/game');

exports.getGame = function(req, res) {
    game.getGame(req.params.id, (response)=> {
        res.json(response);
    });
};

exports.start = function(req, res) {
    game.start(req.query.level, (response)=> {
        res.json(response);
    });
};

exports.move = function(req, res) {  
    console.log(req.body)
    game.move(req.params.id, req.body, (response) => {
        res.json(response);
    });
};
