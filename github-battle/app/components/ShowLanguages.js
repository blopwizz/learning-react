import React from "react";
import PropTypes from "prop-types";

function Language(props) {
  return (
    <li
      style={
        props.selected
          ? {
              color: "#ff0000"
            }
          : null
      }
      onClick={props.selectLanguage.bind(null, props.lang)}
    >
      {props.lang}
    </li>
  );
}

Language.propTypes = {
  lang: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectLanguage: PropTypes.func.isRequired
};

function ShowLanguages(props) {
  var languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
          <Language
            key={lang}
            lang={lang}
            selected={lang === props.selectedLanguage}
            selectLanguage={props.selectLanguage}
          />
        );
      })}
    </ul>
  );
}

ShowLanguages.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  selectLanguage: PropTypes.func.isRequired
};

module.exports = { ShowLanguages };
