// import React from 'react';
import './language-drop-down.styles.scss'

// const LanguageDropDown = ({ language, handleLanguageChange, includesMarkdown }) => {
//   if (includesMarkdown) {
//     return (
//     <div className="custom-select">
//       <select name="language-drop-down" 
//         className="language-drop-down-menu"
//         value={language} 
//         onChange={event => handleLanguageChange(event.target.value)}>
//         <option className="language-item" id="0">Markdown</option>
//         <option className="language-item" id="1">Python</option>
//         <option className="language-item" id="2">Ruby</option>
//         <option className="language-item" id="3">Golang</option>
//       </select>
//     </div>
//   )} else {
//   return (
//     <select name="language-drop-down" 
//       className="language-drop-down-menu"
//       value={language} 
//       onChange={event => handleLanguageChange(event.target.value)}>
//       <option className="language-item" id="1">Python</option>
//       <option className="language-item" id="2">Ruby</option>
//       <option className="language-item" id="3">Golang</option>
//     </select>
//   )};
// };

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const languageStyles = {
  option: (state) => ({
    color: state.isSelected ? '#DC143C' : 'black',
    fontSize: 14,
    padding: 10,
    // loadingMessage=false
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 100,
    fontSize: 14,
    fontFamily: 'Roboto Slab', 
    color: '#DC143C',
  }),
  singleValue: (provided, state) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    return;
  }
};

const LanguageDropDown = ({ language, handleLanguageChange, includesMarkdown }) => {
  const [selectedOption, setSelectedOption] = useState({value: 'python', label: 'Python'});

  const options = [
  { value: 'python', label: 'Python' },
  { value: 'golang', label: 'Golang' },
  { value: 'ruby', label: 'Ruby' }, 
  ];
  if (includesMarkdown) {
    options.push({ value: 'markdown', label: 'Markdown' })
  }

  useEffect(() => {
    handleLanguageChange(selectedOption.value);
  }, [selectedOption])

  return (
    <div className="lang-drop-down">
      <Select 
        className="Select-input"
        menuPlacement = {"top"}
        loadingMessage={false}
        inputId={"search"}
        defaultValue={"python"}
        menuPlacement="auto"
        onChange={setSelectedOption}
        options={options}
        // menuIsOpen={true}
        styles={languageStyles}
        width='60px'
        // menuPosition="top"
      />
    </div>
  );
};

export default LanguageDropDown;