import styled from 'styled-components';

import image from './images/panel.png';

const Panel = styled.div`
  padding: 1rem;
  border-image: url(${image}) 32 24 fill / 32px 24px repeat;
  max-width: 1200px;
  margin: 0 auto;
`;

export default Panel;
