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

const EditableAceEditor = ({ language, code, placeholderText, height, 
                              width, updateCode, showLineNums }) => {
  
  const tabSize = (language === "python" || language === "markdown") ? 4 : 2;

  return (
    <AceEditor 
    style={{
      height: `${height}`,
      width: `${width}`,            
      }}
    theme='github'
    name='basic-code-editor' 
    placeholder={placeholderText}
    tabSize={tabSize}
    value={code}
    mode={language}
    onChange={(event) => updateCode(event)}
    fontSize={12}
    showPrintMargin={false}
    showGutter={showLineNums}
    highlightActiveLine={false}
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