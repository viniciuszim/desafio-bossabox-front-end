import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --white-color: rgb(255,255,255);
    --lighter-color: rgb(238,238,238);
    --light-color: rgb(221,221,221);
    --regular-color: rgb(153,153,153);
    --dark-color: rgb(102,102,102);
    --darker-color: rgb(51,51,51);
    --black-color: #0d0d0f;
    --red-color: rgb(255,0,0);
    --green-color: rgb(0,128,0);
    --greenLight-color: rgb(51,153,51);

    --primary-color: #313139;
    --primaryDark-color: #202124;
    --secundary-color: #ca6863;
    --success-color: rgb(157,202,131);
    --warn-color: rgb(147,108,63);
    --danger-color: rgb(227,122,122);

    --transparent-color: transparent;
    --darkTransparent-color: rgba(0, 0, 0, 0.6);
    --whiteTransparent-color: rgba(255, 255, 255, 0.3);
    --darkReallyTransparent-color: rgba(0, 0, 0, 0.1);

    --menu-color: #27282c;
    --menuTextHover-color: #965352;
    --menuBorderBottom-color: #212124;
  }
`;
