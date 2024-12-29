import React, { useContext } from "react";
import "./App.css";
import va from "./images/ai.png";
import { FaMicrophone } from "react-icons/fa";
import { dataContext } from "./context/UserContext";
import speakimg from "./images/speak.gif"
import aigif from "./images/aivoice.gif"

const App = () => {
  const { recognition, speaking, setSpeaking, prompt, setPrompt, response, setResponse } = useContext(dataContext);

  const startRecognition = () => {
    console.log("Starting speech recognition...");
    setResponse(false); // Reset response state
    setPrompt("listening..."); // Indicate listening
  
    setTimeout(() => {
      recognition.start(); // Start recognition after resetting states
    }, 100); // Slight delay for state updates
  };
  

  return (
    <div className="main">
      <img src={va} alt="Virtual Assistant" id="Lucy" />
      <span>Hello, I am Lucy. How can I help you today?</span>
      {!speaking ?
        <button onClick={() => {
          startRecognition()
          setSpeaking(true)
        }}>
          Click Here <FaMicrophone />
        </button>
        :
        <div className="response">
          {!response ?
            <img src={speakimg} alt="" id="speak" />
            :
            <img src={aigif} alt="" id="aigif" />
          }
          <p>{prompt}</p>
        </div>
      }
    </div>
  );
};

export default App;