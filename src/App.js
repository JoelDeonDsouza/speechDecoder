import React, { useState, useEffect } from "react";
import "./App.css";

const speechCoder = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new speechCoder();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function App() {
  const [recoder, setRecoder] = useState("false");
  const [note, setNote] = useState(null);
  const [keepNote, setKeepNote] = useState([]);

  useEffect(() => {
    handleRecod();
  }, [recoder]);

  const handleRecod = () => {
    if (recoder) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stop recoding");
      };
    }
    mic.onstart = () => {
      console.log("Recoder On");
    };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript, "transcript");
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const saveNote = () => {
    setKeepNote([...keepNote, note]);
    setNote("");
  };

  return (
    <div className="App">
      <div className="contain">
        <div className="box">
          <h3>Speech Decoder</h3>
          {recoder ? <span>:🎙</span> : <span>:🔴🎙</span>}
          <button onClick={saveNote} disabled={!note}>
            Keep note
          </button>
          <button onClick={() => setRecoder((prevState) => !prevState)}>
            Start/End
          </button>
          <p>{note}</p>
        </div>
      </div>
      <div className="box">
        <h3>Notes</h3>
        {keepNote.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
