import React, {useEffect} from 'react';

import WisperIframe from './iframe/WhisperIframe';
import fit_ui_container from './fit_to_screen';


const App = ({url}) => {

  useEffect(() => {
    fit_ui_container();

    window.onresize = fit_ui_container;
  })

  return <WisperIframe src={url} />;
}

export default App;
