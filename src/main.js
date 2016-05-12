import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import './styles/styles.scss';

import theme from './theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import StatusCard from './components/StatusCard';

const components = [
  'XMAN',
  'MAPPING',
  'ARCID',
];

class Main extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <h1>Supervisor UI</h1>
          {_.map(components, (c, key) =>
            <StatusCard
              key={key}
              name={c}
            >
              Test !
            </StatusCard>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
