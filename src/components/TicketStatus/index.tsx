import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTasqueDispatch, useTasqueObjectSelector, useTasqueSelector } from '../../app/hooks';
import { Ticket } from '../../service/projectService';
import { selectStatuses, selectStatusTitle } from '../../stores/statusSlice';
import { updateTicket } from '../../stores/projectSlice';

export interface TicketLabelProps {
  ticket: Ticket;
}

const TicketPanel = styled.details`
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-family: 'ItsyRealm Sans-Serif', sans-serif;
  font-size: 1rem;
  text-shadow: 1px 1px #000000;
  background: ${props => props.color};
  width: 8rem;

  &[open=""] ul {
    width: 100%;
    background: ${props => props.color};
    position: absolute;
    top: 100%;
    left: 0rem;
    z-index: 1;
  }
`;

const TicketPanelItem = styled.li`
  padding-left: 0.5rem;
  background: ${props => props.color};
  text-shadow: 1px 1px #000000;
`;

function getStatusColor(title: string): string {
  switch (title.toLowerCase()) {
    case 'done':
      return '#71c837';
    case 'pending':
      return '#ffb52a';
    case 'not started':
    default:
      return '#c83737';
  }
}

function TicketStatus({ ticket }: TicketLabelProps): JSX.Element | null {
  const label = useTasqueSelector(selectStatusTitle(ticket.status));
  const labels = useTasqueObjectSelector(selectStatuses);
  const dispatch = useTasqueDispatch();
  const details = useRef<HTMLDetailsElement>(null);

  const changeStatus = (id: number) => () => {
    dispatch(updateTicket({ ...ticket, status: id }));
    if (details.current) {
      details.current.open = false;
    }
  };

  return label ? (
    <TicketPanel ref={details} color={getStatusColor(label)}>
      <summary>{label}</summary>
      <ul>
        {
          labels.filter(l => l.id !== ticket.status).map(l => (
            <TicketPanelItem
              role="button"
              key={l.id}
              color={getStatusColor(l.title)}
              onClick={changeStatus(l.id)}
            >
              {l.title}
            </TicketPanelItem>
          ))
        }
      </ul>
    </TicketPanel>
  ) : null;
}

export default TicketStatus;
