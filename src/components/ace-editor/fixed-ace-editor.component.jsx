import PropTypes from "prop-types";

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import "ace-builds/src-noconflict/theme-github";

import './fixed-ace-editor.styles.scss'

const FixedAceEditor = ({ msg, language, height, width, editFlashcard }) => {
  // set language mode 
  const specialCases = {
    "nodejs" : "javascript",
    "cpp" : "c_cpp",
    "c" : "c_cpp",
    "objc" : "objectivec",
    "plain text" : null
  }
  const mode = (language in specialCases) ? specialCases[language] : language;

  // set tab size 
  const fourSpaceLangs = ["python", "rust", "swift", "kotlin", "java"];
  const tabSize = (fourSpaceLangs.includes(language)) ? 4 : 2;

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

FixedAceEditor.propTypes = {
  language: PropTypes.string,
  msg: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  editFlashcard: PropTypes.func,
};

export default FixedAceEditor; 
