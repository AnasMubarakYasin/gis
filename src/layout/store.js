import { Provider } from 'react-redux';

import store from '../config/store';

function LayoutStore(props) {
  return (<Provider store={store}>{props.children}</Provider>)
}

export default LayoutStore;
