import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTasqueDispatch, useTasqueObjectSelector } from '../../app/hooks';
import { BuiltInLabelTypes } from '../../service/labelService';
import { Ticket } from '../../service/projectService';
import { BuiltinStatusTypes } from '../../service/statusService';
import { selectLabels } from '../../stores/labelSlice';
import { newTicket, selectTicketChildren } from '../../stores/projectSlice';
import { selectStatuses } from '../../stores/statusSlice';
import PrimaryButton from '../common/button/PrimaryButton';
import TicketDescription from '../TicketDescription';
import TicketLabel from '../TicketLabel';
import TicketPoints from '../TicketPoints';
import TicketProgress from '../TicketProgress';
import TicketStatus from '../TicketStatus';
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
  
  > * {
    margin-right: 1rem;
  }
  
  > input:last-of-type {
    flex: 1 1 0;
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

const LABEL_ORDER = [
  BuiltInLabelTypes.MILESTONE,
  BuiltInLabelTypes.EPIC,
  BuiltInLabelTypes.FEATURE,
  BuiltInLabelTypes.STORY,
  BuiltInLabelTypes.TASK,
];

function TicketRow({
  projectID,
  ticket,
  expand = false,
  expandChildren = false,
}: TicketProps): JSX.Element {
  const children = useTasqueObjectSelector(selectTicketChildren(projectID, ticket.id));
  const statuses = useTasqueObjectSelector(selectStatuses);
  const labels = useTasqueObjectSelector(selectLabels);
  const dispatch = useTasqueDispatch();
  const navigate = useNavigate();

  const createNewTicket = () => {
    const label = labels.find(l => l.id === ticket.label);
    let nextLabelOrderIndex = LABEL_ORDER.findIndex(l => l === label?.title) + 1;
    if (nextLabelOrderIndex >= LABEL_ORDER.length) {
      nextLabelOrderIndex = LABEL_ORDER.length - 1;
    }

    dispatch(newTicket({
      title: 'New Ticket',
      content: 'This is a newly created ticket.',
      status: (
        statuses.find(s => s.title === BuiltinStatusTypes.NOT_STARTED)?.id
        || statuses[0]?.id
        || 1
      ),
      label: (
        labels.find(l => l.title === LABEL_ORDER[nextLabelOrderIndex])?.id
        || labels[0]?.id
        || 1
      ),
      points: 0,
      parent: ticket.id,
      project: projectID,
    }));
  };

  return (
    <TicketDetails open={expand}>
      <TicketSummary onDoubleClick={() => navigate(`/project/${projectID}/ticket/${ticket.id}`)}>
        <TicketID>{`#${ticket.id.toString().padStart(3, '0')}`}</TicketID>
        <TicketLabel ticket={ticket} />
        <TicketStatus ticket={ticket} />
        <TicketPoints ticket={ticket} />
        <TicketProgress ticket={ticket} />
        <TicketTitle ticket={ticket} />
        <PrimaryButton onClick={createNewTicket}>+</PrimaryButton>
      </TicketSummary>
      <TicketDescription ticket={ticket} />
      {
        children && (
          <TicketList>
            {
              children.map(t => (
                <li key={t.id}>
                  <TicketRow
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
