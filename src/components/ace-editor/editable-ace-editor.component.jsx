import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-golang'

const EditableAceEditor = ({ languageMode, code, placeholderText, height, updateCode }) => {
  return (
    <AceEditor 
    style={{
      height: `${height}`,
      width: '380px',            
      }}
    placeholder={placeholderText}
    mode={languageMode}
    theme='github'
    name='basic-code-editor' 
    onChange={(event) => updateCode(event)}
    fontSize={12}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={false}
    value={code}
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: true,
        showLineNumbers: true,
        readOnly: false,
        cursorStyle: "slim"
        // hScrollBarAlwaysVisible: true,
        // vScrollBarAlwaysVisible: true,
    }}              
  />)
}

export default EditableAceEditor;