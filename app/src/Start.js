function Start({gameStarted}) {

    var startGame = (level) => {
        fetch('http://localhost:3001/game/start?level='+level)
        .then(response => {
              return response.json();
            })
          .then(data => {
            gameStarted(data);
          });
      }

  return (
  <div className="start">
      <header className="header-title">
            <h1>Memory Game</h1>
      </header>
      <br />
      <div className="header-title">
          <h2>Please select a difficulty;</h2>
      </div>
    <div className="button-container">
        <a href="#" onClick={()=>startGame("easy")} className="button1 left-button">Easy</a>
        <a href="#" onClick={()=>startGame("medium")} className="button1">Medium</a>
        <a href="#" onClick={()=>startGame("hard")}  className="button1">Hard</a>
    </div>

    </div>
  );
}

export default Start;
