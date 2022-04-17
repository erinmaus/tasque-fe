import styled from 'styled-components';
import active from './images/active.png';
import hover from './images/hover.png';
import inactive from './images/inactive.png';

const BaseTextInput = styled.input`
    outline: none;
    background: none;
    border: none;

    min-width: 2rem;
    min-height: 2rem;

    font-size: 1.5rem;

    border-image: url(${inactive}) 8 8 fill / 8px 8px repeat;
    color: #32281d;

    &:hover {
        border-image: url(${hover}) 8 8 fill / 8px 8px repeat;
    }

    &:active {
        border-image: url(${active}) 8 8 fill / 8px 8px repeat;
    }
`;

export default BaseTextInput;
