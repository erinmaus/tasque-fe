import styled from 'styled-components';

import inactive from './images/inactive.png';

const Panel = styled.div`
  border-image: url(${inactive}) 32 24 fill / 32px 24px repeat;
  padding: 1rem;
  max-width: 1000px;
`;

export default Panel;
