import { createGlobalStyle } from 'styled-components';
import sansSerifRegular from '../common/assets/fonts/sans-serif/regular.ttf';
import sansSerifBold from '../common/assets/fonts/sans-serif/bold.ttf';
import sansSerifSemibold from '../common/assets/fonts/sans-serif/semibold.ttf';
import sansSerifLight from '../common/assets/fonts/sans-serif/light.ttf';
import serifRegular from '../common/assets/fonts/serif/regular.ttf';
import serifBold from '../common/assets/fonts/serif/bold.ttf';
import serifSemibold from '../common/assets/fonts/serif/semibold.ttf';
import serifLight from '../common/assets/fonts/serif/light.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-weight: 100;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifLight}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifRegular}) format('truetype');
  }

  @font-face {
    font-weight: 500;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifSemibold}) format('truetype');
  }

  @font-face {
    font-weight: 700;
    font-family: 'ItsyRealm Sans-Serif';
    src: url(${sansSerifBold}) format('truetype');
  }
  @font-face {
    font-weight: 100;
    font-family: 'ItsyRealm Serif';
    src: url(${serifLight}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: 'ItsyRealm Serif';
    src: url(${serifRegular}) format('truetype');
  }

  @font-face {
    font-weight: 500;
    font-family: 'ItsyRealm Serif';
    src: url(${serifSemibold}) format('truetype');
  }

  @font-face {
    font-weight: 700;
    font-family: 'ItsyRealm Serif';
    src: url(${serifBold}) format('truetype');
  }

  body {
    font-family: 'ItsyRealm Sans-Serif';
    font-weight: normal;
    font-size: 18px;
    color: #ffffff;
  }

  input {
    background: none;
    outline: none;
    border: none;
    font-family:'ItsyRealm Sans-Serif';
    font-size: 1rem;
  }

  button {
    background: none;
    outline: none;
    border: none;
    font-size: 1rem;
  }
`;
