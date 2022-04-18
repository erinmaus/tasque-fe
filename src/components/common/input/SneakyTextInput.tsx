import styled from 'styled-components';
import active from './images/text-active.png';

const SneakyTextInput = styled.input`
    outline: none;
    background: none;
    border: none;
    
    min-width: 2rem;
    min-height: 2rem;
    padding: 0.25rem;

    font-size: 1rem;
    font-weight: 500;

    color: #ffffff;

    &:focus {
        border-image: url(${active}) 8 8 fill / 8px 8px repeat;
        color: #584834;
    }
`;

export default SneakyTextInput;
