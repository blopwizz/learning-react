import React from "react";
import PropTypes from "prop-types";
var api = require("../utils/api");

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

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  componentDidMount() {
    this.selectLanguage(this.state.selectedLanguage);
  }

  selectLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang).then(
      function(response) {
        this.setState(function() {
          return {
            repos: response
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <ShowLanguages
          selectedLanguage={this.state.selectedLanguage}
          selectLanguage={this.selectLanguage}
        />
        {JSON.stringify(this.state.repos)}
      </div>
    );
  }
}

module.exports = Popular;
