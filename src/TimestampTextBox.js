import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App'

const TimestampTextBox = () => {
  const [text, setText] = useState('');
  const [prevText, setPrevText] = useState('');
  const {wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress} = useContext(Context);



  useEffect(() => {
    const handleKeyDown = (event) => { 
      //update the testResults Object for each key down
      const updatedTestResults = { ...testResults };
      const currLetter = wordBank[wordIdx].word[document.getElementById('typed-input').value.length];
      // console.log(testResults);
      updatedTestResults[`${new Date().toISOString()}`] = {
        "word": wordBank[wordIdx].word,
        "typedInputLetter": event.key,
        "expectedLetter": currLetter,
        "correct": event.key === currLetter
      };

      setTestResults(updatedTestResults);

      //handle if users presses spacebar
      if (event.key === ' ' && !event.repeat) {
        // Increment the counter when the space bar is pressed
        setWordIdx((wordIdx) => wordIdx + 1);
        //clear the input box
        setText("");
        //set letterIdx to zero
        setLetterIdx(-1);

        //highlight the next word
        document.getElementById(`${wordIdx+1}`).style.backgroundColor = '#D3D3D3'
        //unhighlight the previous word
        document.getElementById(`${wordIdx}`).style.backgroundColor = ''
      } 
    };

    // Add an event listener to the input tag to capture space bar presses
    document.getElementById('typed-input').addEventListener('keydown', handleKeyDown);
    // Remove the event listener when the component unmounts
    return () => {
      document.getElementById('typed-input').removeEventListener('keydown', handleKeyDown);
        };
    }, [wordBank, wordIdx, letterIdx, text]); // Empty dependency array ensures this effect runs once


    const handleChange = (event) => { 
      setTestInProgress(true);
      console.log(testInProgress)
      if (event.target.value != ' ') {
        //get the last typed letter
        const newLetter = event.target.value.slice(-1);
        //update prevText
        setPrevText(text);
        //update text
        setText(event.target.value);
        //set text to red if there is a typo/set back to grey if the typo is resolved
        if (event.target.value != wordBank[wordIdx].word.slice(0, event.target.value.length)) document.getElementById(`${wordIdx}`).style.backgroundColor = 'red'
        else document.getElementById(`${wordIdx}`).style.backgroundColor = '#D3D3D3'
            }
        }
        
  return (
    <div>
      <input
        id="typed-input"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Timer will start when you start typing"
      />
      <div></div>
      {/* <div>
        <h3>Timestamps for each keypress:</h3>
        <ul>
          {timestamps.map((timestamp, index) => (
            <li key={index}>{timestamp}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default TimestampTextBox;

