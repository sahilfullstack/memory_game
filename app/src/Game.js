import * as React from 'react';
import { CardColumns, Card } from 'react-bootstrap';
import Timer from './Timer';

function Game({input_game}) {
    const [game, setGame] = React.useState({game: input_game});
    const [show, showCards] = React.useState([]);
    const [counter, setCounter] = React.useState(0);

    var setTime = (time) => {
        setCounter(time && (new Date - new Date(time))/1000 > 0 ? 
                        (new Date - new Date(time))/1000 : 0);
    }
    React.useEffect(() => {
        fetch('http://localhost:3001/game/'+sessionStorage.getItem("file_id"))
        .then(response => {
          return response.json();
        })
          .then(data => {
            setGame({
                game: data
            })
            setTime(data.start_time)
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
      var startTimer = () => {
        let id = sessionStorage.getItem('file_id');
        fetch('http://localhost:3001/game/startTimer/'+id, {
            method: 'PUT',
            body: null,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
              return response.json();
            })
          .then(data => {
                setTime(data.start_time)
          });
      }

     var openCard = (card) => {
        let firstTime = sessionStorage.getItem('firstTime')
        if(! firstTime) {
            startTimer();
            sessionStorage.setItem('firstTime', true);
        }
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
        
        <div className={'button-container'}>
            <Timer time={counter} />
            <p  className="square-block">ERROR SCORE - {game.game && game.game.error_score}</p>
        </div>

      <br />
     
      <CardColumns style={{ padding: '2%' }}>
        {
            game.game && game.game.cards.map((card, index) => {                                                   
                return ( 
                    card == "solved" ?
                        <Card bg={'light'}  className="box text-center" style={{ width: '18rem', height: '18rem' }} text={'dark'}>                          
                            <Card.Header>DONE</Card.Header>
                                <Card.Body>
                                <Card.Text>
                                    Go for other cards.
                                </Card.Text>
                                </Card.Body>
                        </Card>                   
                :
                    
                    <Card bg={show.indexOf(index) > -1 ? 'primary' :'success'} style={{ width: '18rem', height: '18rem' }}  onClick={() => openCard(index)}  className=" box text-center" text={'dark'}>                          
                        <Card.Header>{ show.indexOf(index) > -1 ? 'Take a look' : 'OPEN'}</Card.Header>
                            <Card.Body>
                            <Card.Text>
                                { show.indexOf(index) > -1 ? card : 'Choose Me'}
                            </Card.Text>
                            </Card.Body>
                    </Card>               
                );
            })
        }                         

    </CardColumns>
    </div>
  );
}

export default Game;
