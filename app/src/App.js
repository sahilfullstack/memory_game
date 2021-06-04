import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Start from './Start';
import Game from './Game';

function App() {
  const [gameStarted, setGameStarted] = React.useState({status: sessionStorage.file_id ? true: false, id: sessionStorage.file_id});
  var startGame = (data) => {
    setGameStarted({status: true, id: data.id})
    sessionStorage.setItem("file_id", data.id);
  }

  return (
    gameStarted.status ? 
      <Game />:
      <Start gameStarted={startGame}/>
  );
}

export default App;
