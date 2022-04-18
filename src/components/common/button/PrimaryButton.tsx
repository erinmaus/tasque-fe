import styled from 'styled-components';

import active from './images/button-primary-active.png';
import hover from './images/button-primary-hover.png';
import inactive from './images/button-primary-inactive.png';

const PrimaryButton = styled.button.attrs(({ type }) => ({
  type: type || 'button',
}))`
  border: none;
  outline: none;
  background: none;

  min-width: 2rem;
  min-height: 2rem;
  color: #ffffff;

  font-family: 'ItsyRealm Serif', serif;
  font-weight: 500;
  font-size: 1.5rem;
  
  padding: 0.5rem 1rem;

  border-image: url(${inactive}) 24 24 fill / 24px 24px repeat;

  &:hover {
    border-image: url(${hover}) 24 24 fill / 24px 24px repeat;
  }

  &:active {
    border-image: url(${active}) 24 24 fill / 24px 24px repeat;
  }
`;

export default PrimaryButton;
