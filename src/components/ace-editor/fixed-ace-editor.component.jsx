import AceEditor from 'react-ace'; // https://www.npmjs.com/package/react-ace

import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-golang'

import './fixed-ace-editor.styles.scss'

const FixedAceEditor = ({ msg, language, height, width, editFlashcard }) => {
  const specialCases = {
    "nodejs" : "javascript",
    "cpp" : "c_cpp",
    "c" : "c_cpp",
    "objc" : "objectivec"
  }
  const mode = (language in specialCases) ? specialCases[language] : language;
  const tabSize = (language === "python" || language === "markdown") ? 4 : 2;

  return (
    <AceEditor 
      className = "fixed-editor"
      style={{
        height: height,
        width: width,            
        }}
      value={msg}
      mode={mode}
      theme='github'
      name='basic-code-editor'
      // onChange={currentCode => setCode(currentCode)}
      fontSize={12}
      tabSize={tabSize}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={false}
      setOptions={{
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: false,
        cursorStyle: "slim"
      }}        
  />)
};

export default FixedAceEditor; 