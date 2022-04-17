import styled from 'styled-components';
import active from './images/text-active.png';
import hover from './images/text-hover.png';
import inactive from './images/text-inactive.png';

const BaseTextInput = styled.input`
    outline: none;
    background: none;
    border: none;
    
    min-width: 2rem;
    min-height: 2rem;
    padding: 0.5rem;

    font-size: 1.5rem;
    font-weight: 500;

    border-image: url(${inactive}) 8 8 fill / 8px 8px repeat;
    color: #584834;

    &:hover {
        border-image: url(${hover}) 8 8 fill / 8px 8px repeat;
    }

    &:active {
        border-image: url(${active}) 8 8 fill / 8px 8px repeat;
    }
`;

export default BaseTextInput;
