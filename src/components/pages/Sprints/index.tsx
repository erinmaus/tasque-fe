import React from 'react';
import moment, { Moment } from 'moment';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useTasqueObjectSelector, useTasqueSelector } from '../../../app/hooks';
import { selectProjectStatus, selectProjectTitle, selectTickets } from '../../../stores/projectSlice';
import { selectStatuses } from '../../../stores/statusSlice';
import ContentParagraph from '../../common/text/ContentParagraph';
import Panel from '../../common/panel/Panel';
import ContentHeader from '../../common/headers/ContentHeader';
import { ServiceCallStatus } from '../../../stores/types';
import border from './images/border.png';
import TicketRow from '../../TicketRow';

const SprintSummary = styled.summary`
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

const SprintDetails = styled.details`
  padding: 1rem;

  &:hover, &[open] {
    border-image: url(${border}) 16 16 fill / 16px 16px repeat;
  }
`;

const getWeeks = (start: Moment, stop: Moment) => {
  const result: Moment[] = [];

  for (let m = start.startOf('week'); m.isBefore(stop); m.add(7, 'days')) {
    result.push(moment(m));
  }

  return result;
};

const isInWeek = (week: Moment, date: Moment) => {
  const beginningOfWeek = moment(week);
  const endOfWeek = moment(week).add(7, 'days');

  return date.isSameOrAfter(beginningOfWeek) && date.isBefore(endOfWeek);
};

function Sprints(): JSX.Element {
  const match = useMatch('/project/:id/sprints');
  const id = Number(match?.params.id);
  const projectTitle = useTasqueSelector(selectProjectTitle(id));
  const projectStatus = useTasqueSelector(selectProjectStatus(id));
  const statuses = useTasqueObjectSelector(selectStatuses);
  const doneStatus = statuses?.find(status => status.title === 'Done');
  const tickets = useTasqueObjectSelector(selectTickets(id));
  const doneTickets = doneStatus && tickets?.filter(ticket => ticket.status === doneStatus.id);
  const earliestSprint = doneTickets && (
    moment.min(doneTickets.map(ticket => moment(ticket.statusUpdate, 'YYYY-MM-DD')))
  );
  const latestSprint = doneTickets && (
    moment.max(doneTickets.map(ticket => moment(ticket.statusUpdate, 'YYYY-MM-DD')))
  );
  const weeks = earliestSprint && latestSprint && getWeeks(earliestSprint, latestSprint);
  const pointsPerWeek = weeks && doneTickets && (
    weeks.map(week => {
      const ticketsInWeek = doneTickets.filter(
        ticket => isInWeek(week, moment(ticket.statusUpdate)),
      );
      return ticketsInWeek.reduce((previous, current) => previous + current.points, 0);
    }).filter(points => points !== 0)
  );
  const averagePoints = pointsPerWeek && (
    pointsPerWeek.reduce((previous, current) => previous + current, 0) / pointsPerWeek.length
  );

  const isLoading = !weeks || projectStatus === ServiceCallStatus.PENDING;

  if (isLoading) {
    return <ContentParagraph>Loading...</ContentParagraph>;
  }

  return (
    <Panel>
      <ContentHeader>
        {`${projectTitle} Sprints`}
      </ContentHeader>
      <ContentParagraph>
        {`Overall velocity is ${Math.round(averagePoints || 0)} points per week! Below are the individual sprints.`}
      </ContentParagraph>
      <ul>
        {
          weeks && weeks.map((week, index) => {
            const ticketsInWeek = doneTickets?.filter(
              ticket => isInWeek(week, moment(ticket.statusUpdate)),
            );
            const points = ticketsInWeek?.reduce(
              (previous, current) => previous + current.points,
              0,
            ) || 0;

            if (points === 0 || !ticketsInWeek) {
              return undefined;
            }

            return (
              <li key={week.format()}>
                <SprintDetails>
                  <SprintSummary>
                    {`Sprint ${index + 1} (${week.format('YYYY/MM/DD')})`}
                    <ContentParagraph>{`Completed ${points} points across ${ticketsInWeek?.length || 0} tickets.`}</ContentParagraph>
                  </SprintSummary>
                  <ul>
                    {
                      ticketsInWeek.map(ticket => (
                        <TicketRow projectID={id} ticket={ticket} expandChildren={false} />
                      ))
                    }
                  </ul>
                </SprintDetails>
              </li>
            );
          })
        }
      </ul>
    </Panel>
  );
}

export default Sprints;
