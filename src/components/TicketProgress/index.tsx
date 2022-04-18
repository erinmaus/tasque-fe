import React from 'react';
import styled from 'styled-components';
import { useTasqueObjectSelector, useTasqueSelector } from '../../app/hooks';
import { Ticket } from '../../service/projectService';
import { BuiltinStatusTypes, Status } from '../../service/statusService';
import { selectTicketPoints } from '../../stores/projectSlice';
import { selectStatuses } from '../../stores/statusSlice';

export interface TicketProgressProps {
  ticket: Ticket;
}

interface GradientProps {
  stop1: string;
  stop2: string;
}

const Gradient = styled.div<GradientProps>`
  position: relative;
  width: 8rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  top: calc(0.25rem + 0.25rem / 2);
  background: linear-gradient(
    to right,
    #c83737, #c83737 ${props => props.stop1},
    #ffb52a ${props => props.stop1}, #ffb52a ${props => props.stop2},
    #71c837 ${props => props.stop2}, #71c837 100%
  );
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface PointsProps {
  stop: number;
  width: number;
}

const Points = styled.div<PointsProps>`
  position: absolute;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px #000000;
  left: calc(${props => props.stop}% + 0.25rem);
  width: ${props => props.width}%;

  p {
    left: calc(-(${props => props.stop}% + 0.25rem));
    position: absolute;
    top: 100%;
    font-size: 0.75rem;
    visibility: hidden;
    width: 8rem;
  }

  &:hover, &:active {
    p {
      visibility: visible;
    }
  }
`;

type StatusMap = {
  [key in BuiltinStatusTypes]?: Status;
};

const mapStatuses = (statuses: Status[]) => {
  const statusMap: StatusMap = {};
  statuses.forEach(s => { statusMap[s.title] = s; });
  return statusMap;
};

function TicketProgress({ ticket }: TicketProgressProps): JSX.Element {
  const statuses = useTasqueObjectSelector(selectStatuses);
  const mappedStatuses = mapStatuses(statuses);
  const points = [
    useTasqueSelector(
      selectTicketPoints(
        ticket.project,
        ticket.id,
        mappedStatuses[BuiltinStatusTypes.NOT_STARTED]?.id,
      ),
    ),
    useTasqueSelector(
      selectTicketPoints(
        ticket.project,
        ticket.id,
        mappedStatuses[BuiltinStatusTypes.PENDING]?.id,
      ),
    ),
    useTasqueSelector(
      selectTicketPoints(
        ticket.project,
        ticket.id,
        mappedStatuses[BuiltinStatusTypes.DONE]?.id,
      ),
    ),
  ];

  const totalPoints = points.reduce((previous, current) => previous + current, 0);
  const stop1 = (points[0] / totalPoints) * 100;
  const stop2 = ((points[0] + points[1]) / totalPoints) * 100;

  return (
    <Group>
      <Gradient stop1={`${stop1.toFixed()}%`} stop2={`${stop2.toFixed()}%`}>
        {
          points[0] > 0 && (
            <Points stop={0} width={stop1}>
              {points[0]}
              <p>{mappedStatuses[BuiltinStatusTypes.NOT_STARTED]?.title}</p>
            </Points>
          )
        }
        {
          points[1] > 0 && (
            <Points stop={stop1} width={stop2 - stop1}>
              {points[1]}
              <p>{mappedStatuses[BuiltinStatusTypes.PENDING]?.title}</p>
            </Points>
          )
        }
        {
          points[2] > 0 && (
            <Points stop={stop2} width={100 - stop2}>
              {points[2]}
              <p>{mappedStatuses[BuiltinStatusTypes.DONE]?.title}</p>
            </Points>
          )
        }
      </Gradient>
    </Group>
  );
}

export default TicketProgress;
