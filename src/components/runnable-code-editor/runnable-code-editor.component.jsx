import React, { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/twilight.css'
// Note: more themes here -- https://codemirror.net/demo/theme.htm

import './runnable-code-editor.styles.scss'
import CustomButton from '../custom-button/custom-button.component'


const RunnableCodeEditor = ( { createNewFlashcard } ) => {
  const [codeToRun, setCodeToRun] = useState(null)
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null)
  const [newFlashcardFront, setNewFlashcardFront] = useState(null);
  const [newFlashcardBack, setNewFlashcardBack] = useState(null);

  // func that will call the Jdoodle code compiler
  const runCode = () => {
    axios
      .post(`http://127.0.0.1:5000/compile`, {"code" : codeToRun})
      .then((response) => {
          const output = response.data
          if (response.data.includes("jdoodle.py")) { // error occurred
            const shorterErrorMsg = output.substring(output.indexOf('E'));
            setCodeInOutputContainer(shorterErrorMsg)
          } else {
            setCodeInOutputContainer(output)
          }
      })
      .catch((error) => {
          console.log("there was an error:", error);
      });
  }

  const submitNewCard = (event) => {
    event.preventDefault();
    createNewFlashcard ({ "front": newFlashcardFront, "back": newFlashcardBack});
    // reset messages to empty after submitting 
    setNewFlashcardFront("");
    setNewFlashcardBack("");
  };

  const OptionsButton = ({ children, ...otherProps }) => (
    <button 
      className="options-button" 
      type="button"
      {...otherProps}>
      {children}
    </button>
  )


  return (
    <div>
      <CodeMirror className="code-mirror"
        value="#test code or create front of new card"
        options={{
            theme: 'twilight',
            indentUnit: 4,
            mode: 'python'
          }}
        height="150px"
        width="380px"
        onChange={(editor) => {
          console.log('value:', editor.getValue());
          setCodeToRun(editor.getValue());
          setNewFlashcardFront(editor.getValue())
        }}/>

        <div className='output-wrapper'>
          <div className='output-text-container'>
            <div className='output-text'>
              {codeInOutputContainer}
            </div>
          </div>
          <CustomButton onClick={runCode}>
            Run Code
          </CustomButton>
        </div>

        <div>
        <CodeMirror className="code-mirror"
          value="#create back of new card"
          options={{
              theme: 'twilight',
              indentUnit: 4,
              mode: 'python'
            }}
          height="150px"
          width="380px"
          onChange={(editor) => {
            console.log('value:', editor.getValue());
            setNewFlashcardBack(editor.getValue())
          }}/>
      </div>

        <OptionsButton onClick={submitNewCard}>Add New Card</OptionsButton >
    </div>

  )
}

export default RunnableCodeEditor;