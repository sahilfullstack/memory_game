const LEVEL_CARD_COUNT = {
    'easy' : 2,
    'medium': 10,
    'hard'  : 25
}

// shuffles an array
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

var generateCards = function(level) {
    var arr = [];
    while(arr.length < LEVEL_CARD_COUNT[level]){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    
    return shuffle([...arr, ...arr]);
}

exports.newGameObject = function(level) { 
    let arr = generateCards(level);
    return {
        level: level,
        started_at: null,
        created_at: new Date,
        updated_at: new Date,
        error_score: 0,
        initial_cards: arr,
        current_cards: arr,
    }
}


exports.makeid = (length) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
   
    return result.join('');
}

exports.transformGame = (id, gameObject) => {
    return {
        id: id,
        cards: gameObject.current_cards,
        start_time: gameObject.started_at,
        error_score: gameObject.error_score
    };
}

