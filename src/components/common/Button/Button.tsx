import styled from 'styled-components';

import active from './images/active.png';
import hover from './images/hover.png';
import inactive from './images/inactive.png';

const Button = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
  font-weight: normal;
  border-image: url(${inactive}) 24 24 fill / 24px 24px repeat;
  min-height: 1rem;
  min-width: 1rem;
  padding: 0.5rem;
  color: ${props => props.theme.input.textColor};
  
  &:hover {
    border-image: url(${hover}) 24 24 fill / 24px 24px repeat;
  }

  &:active {
    border-image: url(${active}) 24 24 fill / 24px 24px repeat;
  }
`;

export default Button;
