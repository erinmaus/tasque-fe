import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTasqueDispatch, useTasqueObjectSelector, useTasqueSelector } from '../../app/hooks';
import { Ticket } from '../../service/projectService';
import { selectLabels, selectLabelTitle } from '../../stores/labelSlice';
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
  width: 5rem;

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

function getLabelColor(title: string): string {
  switch (title.toLowerCase()) {
    case 'milestone':
      return '#8d5fd3';
    case 'epic':
      return '#71c837';
    case 'feature':
      return '#ffb52a';
    case 'story':
      return '#37abc8';
    case 'template':
    default:
      return '#c83737';
  }
}

function TicketLabel({ ticket }: TicketLabelProps): JSX.Element | null {
  const label = useTasqueSelector(selectLabelTitle(ticket.label));
  const labels = useTasqueObjectSelector(selectLabels);
  const dispatch = useTasqueDispatch();
  const details = useRef<HTMLDetailsElement>(null);

  const changeLabel = (id: number) => () => {
    dispatch(updateTicket({ ...ticket, label: id }));
    if (details.current) {
      details.current.open = false;
    }
  };

  return label ? (
    <TicketPanel ref={details} color={getLabelColor(label)}>
      <summary>{label}</summary>
      <ul>
        {
          labels.filter(l => l.id !== ticket.label).map(l => (
            <TicketPanelItem
              role="button"
              key={l.id}
              color={getLabelColor(l.title)}
              onClick={changeLabel(l.id)}
            >
              {l.title}
            </TicketPanelItem>
          ))
        }
      </ul>
    </TicketPanel>
  ) : null;
}

export default TicketLabel;
