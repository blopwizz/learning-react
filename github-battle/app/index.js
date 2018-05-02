import React from "react";
import ReactDOM from "react-dom";
require("./index.css");
var Popular = require("./components/Popular");

class App extends React.Component {
  render() {
    return <Popular />;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
