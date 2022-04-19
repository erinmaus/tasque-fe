import React, { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useTasqueObjectSelector, useTasqueSelector } from '../../../app/hooks';
import { selectProjectStatus, selectProjectTitle, selectTicket } from '../../../stores/projectSlice';
import { ServiceCallStatus } from '../../../stores/types';
import Button from '../../common/button/Button';
import ContentHeader from '../../common/headers/ContentHeader';
import Loader from '../../common/loader/Loader';
import Failure from '../../common/panel/Failure';
import Panel from '../../common/panel/Panel';
import TicketRow from '../../TicketRow';

function Ticket(): JSX.Element {
  const match = useMatch('/project/:projectID/ticket/:ticketID');
  const projectID = Number(match?.params.projectID);
  const ticketID = Number(match?.params.ticketID);
  const projectTitle = useTasqueSelector(selectProjectTitle(projectID));
  const projectStatus = useTasqueSelector(selectProjectStatus(projectID));
  const ticket = useTasqueObjectSelector(selectTicket(projectID, ticketID));
  const [expandAll, setExpandAll] = useState(false);
  const navigate = useNavigate();

  const isLoading = (
    projectStatus === ServiceCallStatus.IDLE
    || projectStatus === ServiceCallStatus.PENDING
  );

  const isFailure = projectStatus === ServiceCallStatus.FAILURE;

  return (
    <Panel>
      {isFailure && <Failure>Could not load ticket.</Failure>}
      {!isLoading && !isFailure && !ticket && <Failure>Ticket not found.</Failure>}
      <ContentHeader>
        {projectTitle}
        <Button onClick={() => setExpandAll(!expandAll)}>Expand All</Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </ContentHeader>
      {isLoading && <Loader />}
      {
        !isLoading && !isFailure && ticket && (
          <TicketRow
            projectID={projectID}
            ticket={ticket}
            expand={expandAll}
            expandChildren={expandAll}
          />
        )
      }
    </Panel>
  );
}

export default Ticket;
