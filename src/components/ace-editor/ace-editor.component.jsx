import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-ruby'
import 'ace-builds/src-noconflict/mode-swift'

const CustomAceEditor = ({ msg, language }) => {
  return (
    <AceEditor
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
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={false}
      value={msg}
      setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          readOnly: true,
          hScrollBarAlwaysVisible: true,
          vScrollBarAlwaysVisible: true
      }}        
  />)
};

export default CustomAceEditor; 