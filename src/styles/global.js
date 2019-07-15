import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: var(--primary-color);
    font-family: 'Montserrat', sans-serif;
    color: var(--white-color);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--white-color);
  }

  i {
    margin-right: 10px;
  }

  .modal-content {
    color: var(--black-color);
  }

`;

export default GlobalStyle;
