import styled from 'styled-components';

const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 1rem;
  }

  > input {
    margin-top: 0;
  }
`;

export default VerticalForm;
