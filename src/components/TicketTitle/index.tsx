import React, { useState } from 'react';
import { useTasqueDispatch } from '../../app/hooks';
import { Ticket } from '../../service/projectService';
import { updateTicket } from '../../stores/projectSlice';
import SneakyTextInput from '../common/input/SneakyTextInput';

export interface TicketTitleProps {
  ticket: Ticket;
}

function TicketTitle({ ticket }: TicketTitleProps): JSX.Element {
  const dispatch = useTasqueDispatch();
  const [title, setTitle] = useState(ticket.title);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const onSubmit = () => {
    dispatch(updateTicket({ ...ticket, title }));
  };

  return (
    <SneakyTextInput
      value={title}
      onChange={onChange}
      onSubmit={onSubmit}
      onBlur={onSubmit}
    />
  );
}

export default TicketTitle;
