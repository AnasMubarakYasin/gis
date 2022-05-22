import './App.css';

import LayoutTheme from './layout/theme';
import LayoutStore from './layout/store';
import LayoutRoutes from './layout/routes';

function App() {
  return (
    <LayoutTheme>
      <LayoutStore>
        <LayoutRoutes></LayoutRoutes>
      </LayoutStore>
    </LayoutTheme>
  )
}

export default App;
