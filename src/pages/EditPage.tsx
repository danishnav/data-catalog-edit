import * as React from 'react';

import {Block} from 'baseui/block';
import DatasetForm from '../components/Form'


const EditPage = (props: any) => {

    return (
        <React.Fragment>
          <Block padding="10px 4rem">
            <h1>Opprett nytt Datasett</h1>
            <DatasetForm />
          </Block>
        </React.Fragment>
      )

}

export default EditPage