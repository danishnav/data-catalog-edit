  
import * as React from 'react'
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';

import EditPage from './pages/EditPage'

const engine = new Styletron();

class Main extends React.Component {
  render() {

    return (
      <React.Fragment>
            <StyletronProvider value={engine}>
              <BaseProvider theme={LightTheme}>
                <EditPage />
              </BaseProvider>
            </StyletronProvider>
      </React.Fragment>

    )
  }
}

export default Main