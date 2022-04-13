import styled from 'styled-components';

import active from './images/active.png';
import hover from './images/hover.png';
import inactive from './images/inactive.png';

const PasswordInput = styled.input.attrs(() => ({
  type: 'password',
}))`
  border-image: url(${inactive}) 8 8 fill / 8px 8px repeat;
  min-height: 1rem;
  min-width: 1rem;
  padding: 0.5rem;
  color: ${props => props.theme.input.textColor};
  
  &:hover {
    border-image: url(${hover}) 8 8 fill / 8px 8px repeat;
  }

  &:active {
    border-image: url(${active}) 8 8 fill / 8px 8px repeat;
  }
`;

export default PasswordInput;
