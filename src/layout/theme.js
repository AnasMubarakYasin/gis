import { useState, useMemo } from 'react';
import ContextColor from '../context/color';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import configTheme from '../config/theme';

function LayoutTheme(props) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () => createTheme(deepmerge(configTheme[mode], { palette: { mode, }, })),
    [mode],
  );

  return (
    <ContextColor.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        {props.children}
      </ThemeProvider>
    </ContextColor.Provider>
  )
}

export default LayoutTheme