import * as React from 'react';

function Game({input_game}) {
    const [game, setGame] = React.useState({game: input_game});
    const [show, showCards] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3001/game/'+sessionStorage.getItem("file_id"))
        .then(response => {
          return response.json();
        })
          .then(data => {
            setGame({
                game: data
            })
          });
      }, []);

    var move = (body) => {
        let id = sessionStorage.getItem('file_id');
        fetch('http://localhost:3001/game/move/'+id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
              return response.json();
            })
          .then(data => {
                setGame({
                    game: data
                })
                showCards([]);
          });
      }

     var openCard = (card) => {
        if(show.length < 2) {
            show.push(card)
            showCards([...show]);
            if(show.length == 2) {
                setTimeout(() => {
                    move({
                    input: game.game.cards[show[0]],
                    status: game.game.cards[show[0]] == game.game.cards[show[1]] ? 1 : 0 
                });
                }, 3000);
            }
        }        
    }

  return (
  <div className="game">
      <p className="square-block">TIME ELAPSED - {game.game && game.game.time_elapsed }</p>
      <p  className="square-block">ERROR SCORE - {game.game && game.game.error_score}</p>
      <br />
     
        <div className="cards-container">
        {
            game.game && game.game.cards.map((card, index) => {                                                   
                return ( 
                    card == "solved" ?
                    <div key={index} className="card not-clickable">
                    <div className="container">
                        <p>{
                            'DONE'                                
                        }</p> 
                    </div>
                </div>:
                    <div key={index} className={"card"} onClick={() => openCard(index)}>
                        <div className="container">
                            <p>{
                                show.indexOf(index) > -1 ? card : 'BACK'                                
                            }</p> 
                        </div>
                    </div>
                );
            })
        }          
        </div>

    </div>
  );
}

export default Game;
