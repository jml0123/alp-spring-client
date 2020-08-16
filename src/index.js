import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Press Start 2P", "Source Code Pro", "Mali"],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

