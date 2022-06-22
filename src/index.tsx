import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './shared/redux/store'
import { Provider } from 'react-redux';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Header from './layouts/Header';
import './app.css'


let theme = createTheme({
  palette:{
    primary:{
      main:"hsl(26, 100%, 55%)",
      light:"hsl(25, 100%, 94%)",
      contrastText:'#fff'
    },
    secondary:{
      main:'#f7f8fd'
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="lg" sx={{px:"0!important"}}>
          <Header/>
          <App />
        </Container>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
