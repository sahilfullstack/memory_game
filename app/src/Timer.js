import * as React from 'react';

function Timer({time}) {
    
    var setTime = (time) => {
        setCounter(time && (new Date - new Date(time))/1000 > 0 ? 
                        (new Date - new Date(time))/(1000*60) : 0);
    }
   

    console.log(time);
    const [counter, setCounter] = React.useState(time);
    console.log(counter);
    React.useEffect(() => {
        fetch('http://localhost:3001/game/'+sessionStorage.getItem("file_id"))
        .then(response => {
          return response.json();
        })
          .then(data => {
          
            setTime(data.start_time)
          });
      }, []);
    React.useEffect(() => {
        console.log(counter);
        counter > 0 && setInterval(() => setCounter(counter + 1), 1000*60);
      }, [counter]);


  return (
    <p className="square-block">TIME ELAPSED - {Number((counter).toFixed(1)) } minutes</p>
  );
}

export default Timer;
