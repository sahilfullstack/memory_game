import * as React from 'react';

export const Timer = React.memo((props)=>{    
  const [counter, setCounter] = React.useState(0); 
 
  React.useEffect(() => {
    if(counter == 0) {
      setCounter(props.time)
    }  
  }, [props.time]);

  React.useEffect(() => {
    let interval = null;
    if(counter > 0) {
      interval = setInterval(() => {
        setCounter(counter => counter + 1)
      }, 1000)
    }

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <p className="square-block">TIME ELAPSED - {counter}s</p>
  );
});