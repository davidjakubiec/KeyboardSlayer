import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App';

const Timer = () => {

  const { editTime, setEditTime, testInProgress, setTestInProgress, viewResults, setViewResults, seconds, setSeconds, text, setText } = useContext(Context);

  useEffect(() => {
    if (testInProgress) {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && testInProgress) {
              setSeconds(seconds - 1);
            } 
            else {
              setViewResults(true);
              setTestInProgress(false);
              clearInterval(timerInterval); 
            }
          }, 1000);
      
          return () => {
            clearInterval(timerInterval);
          };
        }
    }
, [seconds, testInProgress]);

const handleClick = () => {
  // alert('The div was clicked!');
  
  if (!editTime) {
    setEditTime(true);
  } else {
    setEditTime(false);
  } 
};

const handleChange = (event) => {
  setSeconds(event.target.value);
};

  return (
    <div>
        {viewResults ? <div></div> : 
          <>
          <div className='timer'>
            {editTime ? 
            <span>
              <input id="time-input" value={seconds} maxLength="3"onChange={handleChange}></input> 
              seconds 
              <button onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#43A047" d="M40.6 12.1L17 35.7l-9.6-9.6L4.6 29L17 41.3l26.4-26.4z"/>
              </svg>
              </button>
            </span>
            :
            <div >{seconds} seconds
              <button className='clickable-timer' onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                  <path className='timer-icon' fill="white" d="M9 3V1h6v2H9Zm2 11h2V8h-2v6Zm1 8q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.938T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22Zm0-2q2.9 0 4.95-2.05T19 13q0-2.9-2.05-4.95T12 6Q9.1 6 7.05 8.05T5 13q0 2.9 2.05 4.95T12 20Zm0-7Z"/>
                </svg>
              </button>
            
            </div>}
            </div>
            
          </>
  }
    </div>
  );
}

export default Timer;