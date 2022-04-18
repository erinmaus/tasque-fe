import styled from 'styled-components';
import inactive from './images/text-inactive.png';

const TextArea = styled.textarea`
    display: block;
    outline: none;
    background: none;
    border: none;
    
    min-width: 2rem;
    min-height: 12rem;
    padding: 0.5rem;

    width: 100%;

    font-family: monospace;

    font-size: 1rem;
    font-weight: normal;

    border-image: url(${inactive}) 8 8 fill / 8px 8px repeat;
    color: #584834;
`;

export default TextArea;
