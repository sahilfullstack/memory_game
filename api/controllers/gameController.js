'use strict';
var game = require('../services/Game');

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

exports.startTimer = function(req, res) {
    game.startTimer(req.params.id, (response)=> {
        res.json(response);
    });
};

exports.move = function(req, res) {  
     game.move(req.params.id, req.body, (response) => {
        res.json(response);
    });
};
