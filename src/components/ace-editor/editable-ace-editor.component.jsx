import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

// theme 
import "ace-builds/src-noconflict/theme-github";

// languages 
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-golang';

const EditableAceEditor = ({ languageMode, code, placeholderText, height, width, updateCode, showLineNums }) => {
  return (
    <AceEditor 
    style={{
      height: `${height}`,
      width: `${width}`,            
      }}
    placeholder={placeholderText}
    mode={languageMode}
    theme='github'
    name='basic-code-editor' 
    onChange={(event) => updateCode(event)}
    fontSize={12}
    showPrintMargin={false}
    showGutter={showLineNums}
    highlightActiveLine={false}
    value={code}
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: true,
        showLineNumbers: showLineNums,
        readOnly: false,
        cursorStyle: "slim"
    }}              
  />)
}

// EditableAceEditor.config.set('basePath', 'path'); 
export default EditableAceEditor;