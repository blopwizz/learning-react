import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import { ShowLanguages } from "./ShowLanguages";

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
