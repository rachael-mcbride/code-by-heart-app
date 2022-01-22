import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/twilight.css'
import './nonrunnable-code-editor.styles.scss'

const NonrunnableCodeEditor = () => {
  const [codeToSave, setCodeToSave] = useState(null)

  return (
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
          setCodeToSave(editor.getValue())
        }}/>
    </div>

  )
}

export default NonrunnableCodeEditor;