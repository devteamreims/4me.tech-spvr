import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import './styles/styles.scss';
import 'normalize.css';

import theme from './theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Root from './components/Root';

class Main extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Root />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
