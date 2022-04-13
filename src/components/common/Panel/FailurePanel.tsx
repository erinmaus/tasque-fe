import styled from 'styled-components';

import failure from './images/failure.png';

const FailurePanel = styled.div`
  border-image: url(${failure}) 32 24 fill / 32px 24px repeat;
  padding: 1rem;
  max-width: 1000px;
`;

export default FailurePanel;
