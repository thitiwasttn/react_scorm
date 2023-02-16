import React from "react";
import "./styles.css";
import ScormProvider from "react-scorm-provider";
import Question from "./Question";

export default function App() {
  return (
    <ScormProvider version="1.2" debug={true}>
      <div className="App">
        <h1>Quiz</h1>
        <hr />
        <Question />
      </div>
    </ScormProvider>
  );
}
