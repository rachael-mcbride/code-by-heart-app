import AceEditor from 'react-ace'; 
// docs - https://www.npmjs.com/package/react-ace

import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-golang'

import './fixed-ace-editor.styles.scss'

const FixedAceEditor = ({ msg, language }) => {
  return (
    <AceEditor 
      className = "fixed-editor"
      style={{
        height: '150px',
        width: '320px',            
        }}
      // placeholder={msg}
      mode={language}
      theme='github'
      name='basic-code-editor'
      // onChange={currentCode => setCode(currentCode)}
      fontSize={12}
      cursorStart={1}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={false}
      value={msg}
      setOptions={{
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false,
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: false,
        // hScrollBarAlwaysVisible: true,
        // vScrollBarAlwaysVisible: true,
        cursorStyle: "slim"
      }}        
  />)
};

export default FixedAceEditor; 