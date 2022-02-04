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
    className = "editable-editor"
    style={{
      height: height,
      width: width,            
      }}
    theme='github'
    name='basic-code-editor' 
    placeholder={placeholderText}
    tabSize={tabSize}
    value={code}
    mode={mode}
    onChange={(event) => updateCode(event)}
    fontSize={12}
    showPrintMargin={false}
    showGutter={showLineNums}
    highlightActiveLine={false}
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: showLineNums,
        readOnly: false,
        cursorStyle: "slim"
    }}              
  />)
}

export default EditableAceEditor;