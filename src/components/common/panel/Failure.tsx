import styled from 'styled-components';

import image from './images/failure.png';

const Failure = styled.div`
  padding: 0.5rem;
  border-image: url(${image}) 32 24 fill / 32px 24px repeat
`;

export default Failure;
