import React, { createContext, useState } from "react";
export const dataContext = createContext();
import run from "../gemini.js";

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "hi-GB";

    utterance.onstart = () => {
      console.log("Speech synthesis started.");
      setSpeaking(true);
    };
    utterance.onend = () => {
      console.log("Speech synthesis ended.");
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  async function aiResponse(prompt) {
    try {
      console.log("Sending prompt to Gemini:", prompt);
      setPrompt("Processing your request...");
      setSpeaking(true);

      let text = await run(prompt); // Fetch response
      console.log("Gemini Response:", text);

      let newText = text
        .split("**").join(" ")
        .split("*").join(" ")
        .split("//").join(" ")
        .split("/").join(" ")
        .replace(/google/gi, "Vijay Kumar")
        .replace(/bada bhasha/gi, "large language");

      setPrompt(newText);
      speak(newText);
      setResponse(true);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setPrompt("Failed to process your request. Please try again.");
    } finally {
      setSpeaking(false);
    }
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!speechRecognition) {
    console.error("Speech Recognition API is not supported in this browser.");
    return <div>Your browser does not support speech recognition.</div>;
  }

  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    const currentIndex = e.resultIndex;
    const transcript = e.results[currentIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase()); // Corrected here
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setPrompt("Speech recognition error occurred. Please try again.");
    setSpeaking(false);
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
    setSpeaking(false);
  };

  function takeCommand(command) {
    if (command.includes("open") || command.includes("kholo")) {
      if (command.includes("youtube")) {
        window.open("https://www.youtube.com/");
        speak("Opening YouTube");
        setPrompt("Opening YouTube...");
      } 
      else if (command.includes("google")) {
        window.open("https://www.google.com/");
        speak("Opening Google");
        setPrompt("Opening Google...");
      } 
      else if (command.includes("chrome")) {
        window.open("https://www.google.com/chrome/");
        speak("Opening Google Chrome");
        setPrompt("Opening Google Chrome...");
      }
      else if (command.includes("microsoft edge") || command.includes("edge")) {
        window.open("https://www.microsoft.com/edge");
        speak("Opening Microsoft Edge");
        setPrompt("Opening Microsoft Edge...");
      }
      else if (command.includes("github")) {
        window.open("https://www.github.com/");
        speak("Opening GitHub");
        setPrompt("Opening GitHub...");
      }
      else if (command.includes("linkedin")) {
        window.open("https://www.linkedin.com/");
        speak("Opening LinkedIn");
        setPrompt("Opening LinkedIn...");
      }
      else if (command.includes("instagram") || command.includes("insta")) {
        window.open("https://www.instagram.com/");
        speak("Opening Instagram");
        setPrompt("Opening Instagram...");
      }
      else if (command.includes("classroom")) {
        window.open("https://classroom.google.com/");
        speak("Opening Google Classroom");
        setPrompt("Opening Google Classroom...");
      }
      else if (command.includes("twitter") || command.includes("X")) {
        window.open("https://www.twitter.com/");
        speak("Opening Twitter");
        setPrompt("Opening Twitter...");
      }
      else {
        aiResponse(command);
      }
    }
    else if(command.includes("what time it is") ||(command.includes("time") && (command.includes("batao") || command.includes("kya")))){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
        setPrompt(time);
    }
    else if(command.includes("what date today is") ||(command.includes("date") && (command.includes("batao") || command.includes("kya")))){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
        setPrompt(date);
    }
     else {
      aiResponse(command);
    }
  }
  

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
