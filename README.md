# learning-react

### Getting Started - Custom configuration with Webpack 4

Create your workspace

```
mkdir myApp
cd myApp
```

Initiate an app project with npm, an install the dependencies

```
npm init
npm install --save react react-dom
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader html-webpack-plugin webpack webpack-dev-server webpack-cli
```

Ignore node modules and bundled code in Git 

```
nano .gitignore
```
```
node_modules
dist
```

Create an app folder to write your code, with index.js and index.css files.

(index.html)
```
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Github Battle</title>
</head>

<body>
  <div id='app'></div>
</body>

</html>
```
(index.css)
```
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Helvetica Neue, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}
```
(index.js)
```
import React from "react";
import ReactDOM from "react-dom";
require("./index.css");

class App extends React.Component {
  render() {
    return <div> Hello World! </div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


```


Create the configuration file for webpack



```
// webpack.config.js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html'
		})
	],
	mode: "development"
};
```

 Add a start script in your package.json and babel presets:
 
 ```
 "scripts": {
    "start": "webpack-dev-server --open"
  }
```

```
  "babel": {
    "presets": ["env", "react"]
  }
```



### Define a new component

```
var React = require("react");
var PropTypes = require("prop-types");

function SelectLanguage(props) {
  var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        var highlight =
          lang === props.selectedLanguage ? { color: "#d0021b" } : null;
        var handleClick = props.onSelect.bind(null, lang);
        return (
          <li style={highlight} onClick={handleClick} key={lang}>
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: "All"
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}

module.exports = Popular;
```


### Making AJAX requests

Install axios
```
npm install --save axios
```

Create a utils folder and a api.js file

(app/utils/api.js)
```
var axios = require("axios");

module.exports = {
  fetchPopularRepos function(language) {
    var encodedURI = window.encode(URI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sort=stars&order=desc'))
    return axios.get(encodedURI)
    .then(function(response) {
      return response.data.items;
    });
  }
}

```


