import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTasqueDispatch, useTasqueObjectSelector, useTasqueSelector } from '../../app/hooks';
import { Ticket } from '../../service/projectService';
import { selectTicketChildren, selectTicketPoints, updateTicket } from '../../stores/projectSlice';
import { selectStatuses } from '../../stores/statusSlice';
import SneakyTextInput from '../common/input/SneakyTextInput';

export interface TicketPointsProps {
  ticket: Ticket;
}

const PointsTextInput = styled(SneakyTextInput)`
  max-width: 0.25rem;
`;

const PointsWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

function TicketPoints({ ticket }: TicketPointsProps): JSX.Element {
  const dispatch = useTasqueDispatch();
  const statuses = useTasqueObjectSelector(selectStatuses).map(s => s.id);
  const totalPoints = useTasqueSelector(selectTicketPoints(ticket.project, ticket.id, statuses));
  const children = useTasqueObjectSelector(selectTicketChildren(ticket.project, ticket.id));
  const hasNoChildren = !children || children.length === 0;
  const [points, setPoints] = useState((!hasNoChildren ? totalPoints : ticket.points).toFixed());

  useEffect(() => {
    setPoints((!hasNoChildren ? totalPoints : ticket.points).toFixed());
  }, [hasNoChildren, ticket.points, totalPoints]);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(target.value);
  };

  const onSubmit = () => {
    let p = Number(points);
    if (Number.isNaN(p) || p < 0) {
      p = 0;
    }

    dispatch(updateTicket({ ...ticket, points: p }));
  };

  return (
    <PointsWrapper>
      <PointsTextInput
        value={points}
        onChange={onChange}
        onSubmit={onSubmit}
        onBlur={onSubmit}
        disabled={!hasNoChildren}
      />
      <p>Pts</p>
    </PointsWrapper>
  );
}

export default TicketPoints;
