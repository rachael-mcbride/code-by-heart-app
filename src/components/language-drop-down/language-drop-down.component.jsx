import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Select from 'react-select';
import { components } from 'react-select';

import './language-drop-down.styles.scss'

const LanguageDropDown = ({ language, handleLanguageChange, includesMarkdown }) => {
  const [selectedOption, setSelectedOption] = useState({value: 'python', label: 'Python'});

  const options = [
  { value: 'python', label: 'Python' },
  { value: 'nodejs', label: 'JavaScript' },
  { value: 'go', label: 'Go' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'objc', label: 'Objective C' },
  { value: 'ruby', label: 'Ruby' }, 
  { value: 'java', label: 'Java' },
  { value: 'scala', label: 'Scala' },
  { value: 'swift', label: 'Swift' },
  { value: 'rust', label: 'Rust' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'elixir', label: 'Elixir' },
  ];
  if (includesMarkdown) {
    options.unshift({ value: 'plain text', label: 'Plain Text' })
  }

  const languageStyles = {
    option: (state) => ({
      color: state.isSelected ? '#DC143C' : 'black',
      fontSize: 14,
      padding: 11,
    }),
    control: () => ({
      width: 100,
      fontSize: 14,
      fontFamily: 'Roboto Slab', 
      color: '#DC143C',
    }),
    singleValue: (provided, state) => {
      return;
    }
  };

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props} className="custon-no-options-box">
        <span className="no-options-msg"></span> 
      </components.NoOptionsMessage>
    );
  };

  useEffect(() => {
    handleLanguageChange(selectedOption.value);
  }, [selectedOption])

  return (
    <div className="lang-drop-down">
      <Select 
        loadingMessage={false}
        inputId={"search"}
        defaultValue={"python"}
        menuPlacement="auto"
        onChange={setSelectedOption}
        options={options}
        styles={languageStyles}
        width='60px'
        components={{ NoOptionsMessage }}
      />
    </div>
  );
};

LanguageDropDown.propTypes = {
  language: PropTypes.string,
  handleLanguageChange: PropTypes.func,
  includesMarkdown: PropTypes.bool
};

export default LanguageDropDown;