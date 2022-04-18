import React from 'react';
import styled from 'styled-components';
import { useTasqueObjectSelector } from '../../app/hooks';
import { Ticket } from '../../service/projectService';
import { selectTicketChildren } from '../../stores/projectSlice';
import TicketDescription from '../TicketDescription';
import TicketLabel from '../TicketLabel';
import TicketProgress from '../TicketProgress';
import TicketTitle from '../TicketTitle';
import border from './images/border.png';

const TicketSummary = styled.summary`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;

  font-family: 'ItsyRealm Sans-Serif', sans-serif;
  font-weight: 500;
  font-size: 1rem;

  input {
    flex: 1 1 0;
  }

  > * {
    margin-right: 1rem;
  }
`;

const TicketDetails = styled.details`
  padding: 1rem;

  &:hover, &[open] {
    border-image: url(${border}) 16 16 fill / 16px 16px repeat;
  }
`;

const TicketID = styled.span`
  font-family: monospace;
  margin-right: 0.5rem;
`;

const TicketList = styled.ul`
  margin-left: 0;
`;

export interface TicketProps {
  projectID: number;
  ticket: Ticket;
  expand?: boolean;
  expandChildren?: boolean;
}

function TicketRow({
  projectID,
  ticket,
  expand = false,
  expandChildren = false,
}: TicketProps): JSX.Element {
  const children = useTasqueObjectSelector(selectTicketChildren(projectID, ticket.id));

  return (
    <TicketDetails open={expand}>
      <TicketSummary>
        <TicketID>{`#${ticket.id}`}</TicketID>
        <TicketLabel ticket={ticket} />
        <TicketProgress ticket={ticket} />
        <TicketTitle ticket={ticket} />
      </TicketSummary>
      <TicketDescription ticket={ticket} />
      {
        children && (
          <TicketList>
            {
              children.map(t => (
                <li>
                  <TicketRow
                    key={t.id}
                    projectID={projectID}
                    ticket={t}
                    expand={expandChildren}
                    expandChildren={expandChildren}
                  />
                </li>
              ))
            }
          </TicketList>
        )
      }
    </TicketDetails>
  );
}

export default TicketRow;
