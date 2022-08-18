import React from 'react';
import moment, { Moment } from 'moment';
import { useTasqueObjectSelector } from '../../app/hooks';
import { selectTickets } from '../../stores/projectSlice';
import { selectStatuses } from '../../stores/statusSlice';
import ContentParagraph from '../common/text/ContentParagraph';

export interface SprintsProps {
  id: number;
}

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

function Sprints({
  id,
}: SprintsProps): JSX.Element {
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

  const isLoading = !weeks;

  if (isLoading) {
    return <ContentParagraph>Loading...</ContentParagraph>;
  }

  return (
    <>
      <ContentParagraph>
        {`Overall velocity: ${Math.round(averagePoints || 0)} points per week`}
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
                <details>
                  <summary>
                    {`Sprint ${index + 1} (${week.format('YYYY/MM/DD')})`}
                    <ContentParagraph>{`Completed ${points} points across ${ticketsInWeek?.length || 0} tickets.`}</ContentParagraph>
                  </summary>
                  <ul>
                    {
                      ticketsInWeek.map(ticket => (
                        <li key={ticket.id}>{`#${ticket.id}: ${ticket.title}`}</li>
                      ))
                    }
                  </ul>
                </details>
              </li>
            );
          })
        }
      </ul>
    </>
  );
}

export default Sprints;
