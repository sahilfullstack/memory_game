'use strict';
const fs = require('fs');
var helper = require('../helper');

const LEVELS = {
    EASY: 'easy', 
    MEDIUM: 'medium', 
    HARD: 'hard' 
}

function writeToFile(id, gameObject, callback) {
    // convert JSON object to string
    const data = JSON.stringify(gameObject);
    if(id) {
        // write JSON string to a file
        fs.writeFile(`storage/${id}.json`, data, (err) => {
            if (err) {
                throw err;
            }

            callback(helper.transformGame(id, gameObject));
        });
    }
}

exports.start = function(level, callback) {
    if(level == null) {
        level = LEVELS.EASY
    }

    let gameObject = helper.newGameObject(level);
    let id = helper.makeid(10);

    writeToFile(id, gameObject, callback);  
};


exports.move = function(id, body, callback) {
    fs.readFile(`storage/${id}.json`, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }    
        
        const gameObject = JSON.parse(data.toString());

        if(body.status == "1") {
            let new_cards = []
            gameObject.current_cards.map((card) => {
                if(card == body.input) {
                    new_cards.push("solved");
                } else {
                    new_cards.push(card);
                }
            })
            gameObject.current_cards = new_cards;
        } else {
            gameObject.error_score += 1;
        }

        gameObject.updated_at = new Date;

        writeToFile(id, gameObject, callback);        
    });
};

exports.getGame = function(id, callback) {
    fs.readFile(`storage/${id}.json`, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }    
        
        const gameObject = JSON.parse(data.toString());

        callback(helper.transformGame(id, gameObject));    
    });
};

exports.startTimer = function(id, callback) {
    fs.readFile(`storage/${id}.json`, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }    
        
        const gameObject = JSON.parse(data.toString());

        gameObject.started_at = new Date;
        gameObject.updated_at = new Date;

        writeToFile(id, gameObject, callback);
    });
};