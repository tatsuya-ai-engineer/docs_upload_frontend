import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadComponent from './UploadComponent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // プライマリカラーを設定
    },
    secondary: {
      main: '#dc004e', // セカンダリカラーを設定
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UploadComponent />
    </ThemeProvider>
  );
}

export default App;