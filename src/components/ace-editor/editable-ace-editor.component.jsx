import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-swift'

const EditableAceEditor = ( { languageMode, codeToRun, updateCodeToRun }) => {
  return (
    <AceEditor 
    style={{
      height: '150px',
      width: '380px',            
      }}
    placeholder={"Test out some code or create the front of a new card here"}
    mode={languageMode}
    theme='github'
    name='basic-code-editor' 
    onChange={(event) => updateCodeToRun(event)}
    fontSize={12}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={false}
    value={codeToRun}
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: true,
        showLineNumbers: true,
        readOnly: false,
        hScrollBarAlwaysVisible: true,
        vScrollBarAlwaysVisible: true,
    }}              
  />)
}

export default EditableAceEditor;