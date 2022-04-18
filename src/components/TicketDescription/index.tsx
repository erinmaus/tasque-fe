import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Ticket } from '../../service/projectService';
import { updateTicket } from '../../stores/projectSlice';
import Button from '../common/button/Button';
import TextArea from '../common/input/TextArea';

export interface TicketDescriptionProps {
  ticket: Ticket;
}

const UnstyledButton = styled.button.attrs(({ type }) => ({
  type: type || 'button',
}))`
  margin: 0.5rem auto;

  outline: none;
  border: none;
  color: #ffffff;
  
  border-radius: 1rem;
  padding: 1rem;
  background: #584834;

  text-align: left;

  font-family: 'ItsyRealm Sans-Serif', sans-serif;
  font-size: 1rem;

  width: 100%;

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    font-family: 'ItsyRealm Serif', serif;
    font-weight: bold;
    text-shadow: 1px 1px #000000;

    &:first-of-type {
      margin-top: 0;
    }
  }

  a {
    color: #d6afe9;
    text-decoration: none;

    &:hover {
      color: #e1c5ef;
    }
  }
`;

function TicketDescription({ ticket }: TicketDescriptionProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(ticket.content);
  const dispatch = useDispatch();

  const onChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
  };

  const onSubmit = () => {
    dispatch(updateTicket({ ...ticket, content: description }));
    setIsEditing(false);
  };

  return (
    <>
      {
        isEditing && (
          <>
            <TextArea value={description} onChange={onChange} onBlur={onSubmit} />
            <Button onClick={onSubmit}>Save</Button>
          </>
        )
      }
      {
        !isEditing && (
          <UnstyledButton role="button" onClick={() => setIsEditing(true)}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </UnstyledButton>
        )
      }
    </>
  );
}

export default TicketDescription;
