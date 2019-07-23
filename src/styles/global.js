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
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--white-color);
  }

  h1, h2, h3, h4, h5 {
    color: var(--white-color);
    font-weight: 'semi-bold';
  }
  h1 {
    font-size: 42px;
  }
  h2 {
    font-size: 36px;
  }
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 26px;
  }
  h5 {
    font-size: 24px;
  }

  i {
    margin-right: 10px;
  }

  .modal-content {
    color: var(--black-color);
  }

  /* Extra small devices  */
  @media (max-width: 575px) {
    .mt-xs-3 {
      margin-top: 1rem!important;
    }
  }

`;

export default GlobalStyle;
