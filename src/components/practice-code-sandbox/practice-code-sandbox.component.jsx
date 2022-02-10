import { useState, useEffect } from "react";
import axios from "axios";

import LanguageDropDown from '../language-drop-down/language-drop-down.component'
import CustomAceEditor from '../ace-editor/ace-editor.component'

import './practice-code-sandbox.styles.scss'

const PracticeCodeSandbox = () => {
  const [codeInInputContainer, setCodeInIntputContainer] = useState(null);
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null);
  const [language, setLanguage] = useState("not selected");

  // useEffects // 
  // make sure language is always up-to-date
  useEffect(() => {
    handleLanguageChange(language)
  }, [language]); 

  // funcs that update states // 
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const updateInputContainer = (event) => {
    setCodeInIntputContainer(event)
  };

  const updateOutputContainer = (event) => {
    setCodeInOutputContainer(event)
  };

  // func that will call the Jdoodle code compiler // 
  const runCode = () => {
    if (language === "not selected") {
      setCodeInOutputContainer("Make sure you've selected a programming language.")
    } else {
      const compileData = {"code" : codeInInputContainer, "language" : language}
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/compile`, compileData)
      .then((response) => {
        let data = response.data;
          if (JSON.stringify(data) === '{}') { 
            setCodeInOutputContainer(`${`{}\n`}`)
          } else if (JSON.stringify(data) === '[]') {
            setCodeInOutputContainer(`${`[]\n`}`)
          } else if (Array.isArray(data) || (Number.isFinite(data))) {
            setCodeInOutputContainer(JSON.stringify(data) + "\n")
          } else {
            setCodeInOutputContainer(data)
          }
      })
      .catch((error) => {
          console.log(error);
      });
    }
  };

  return (
    <div className="add-flashcards-container">
      <div className="add-flashcards-header-container">
        <div className="run-code-title">
          <button className="run-code-button" onClick={runCode}>
            Run Code
          </button>
        </div>
        <div className="add-flashcards-language-dropdown">
          <LanguageDropDown
            language={language}
            includesMarkdown={false}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
      </div>

      <div className="add-card-area">
          <div className="sandbox-output-wrapper">
            <CustomAceEditor 
              language={language}
              showLineNums={true}
              readOnly={false}
              code={codeInInputContainer}
              updateCode={updateInputContainer}
              theme={"dracula"}
              width={"430px"}
              height={"435px"}
              placeholderText="TYPE CODE HERE" />
          </div>
          <div className="code-output-wrapper">
            <CustomAceEditor 
              language={language}
              showLineNums={false}
              readOnly={true}
              code={codeInOutputContainer}
              updateCode={updateOutputContainer}
              theme={"github"}
              width={"410px"}
              height={"75px"} />
          </div>
        </div>
      </div>
  );
};

export default PracticeCodeSandbox;