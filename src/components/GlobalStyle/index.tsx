import { createGlobalStyle } from 'styled-components';

import serifBold from './fonts/serif/bold.ttf';
import serifLight from './fonts/serif/light.ttf';
import serifRegular from './fonts/serif/regular.ttf';
import serifSemibold from './fonts/serif/semibold.ttf';
import sansSerifBold from './fonts/sans-serif/bold.ttf';
import sansSerifLight from './fonts/sans-serif/light.ttf';
import sansSerifRegular from './fonts/sans-serif/regular.ttf';
import sansSerifSemibold from './fonts/sans-serif/semibold.ttf';
import background from './images/background.png';
import backgroundTile from './images/background-tile.png';

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @font-face {
    font-weight: 100 300;
    font-family: 'ItsyRealm Serif';
    src: url(${serifLight}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: 'ItsyRealm Serif';
    src: url(${serifRegular}) format('truetype');
  }

  @font-face {
    font-weight: 500 600;
    font-family: 'ItsyRealm Serif';
    src: url(${serifSemibold}) format('truetype');
  }

  @font-face {
    font-weight: 700 900;
    font-family: 'ItsyRealm Serif';
    src: url(${serifBold}) format('truetype');
  }

  @font-face {
    font-weight: 100 300;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifLight}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifRegular}) format('truetype');
  }

  @font-face {
    font-weight: 500 600;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifSemibold}) format('truetype');
  }

  @font-face {
    font-weight: 700 900;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifBold}) format('truetype');
  }

  html, body {
    background: url(${background}) bottom left -24rem no-repeat,
      url(${backgroundTile}) repeat;

    font-family: 'ItsyRealm Sans-Serif', sans-serif;
    font-size: 18px;
    line-height: 1.5;
    color: #ffffff;

    min-height: 100vh;
    min-width: 100vw;
  }
`;

export default GlobalStyle;
