import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useTasqueObjectSelector, useTasqueSelector } from '../../../app/hooks';
import { selectProjectStatus, selectProjectTitle, selectOrphanTickets } from '../../../stores/projectSlice';
import { ServiceCallStatus } from '../../../stores/types';
import Button from '../../common/button/Button';
import ContentHeader from '../../common/headers/ContentHeader';
import Loader from '../../common/loader/Loader';
import Failure from '../../common/panel/Failure';
import Panel from '../../common/panel/Panel';
import ContentParagraph from '../../common/text/ContentParagraph';
import TicketRow from '../../TicketRow';

function Project(): JSX.Element {
  const match = useMatch('/project/:id');
  const id = Number(match?.params.id);
  const projectTitle = useTasqueSelector(selectProjectTitle(id));
  const projectStatus = useTasqueSelector(selectProjectStatus(id));
  const tickets = useTasqueObjectSelector(selectOrphanTickets(id));
  const [expandAll, setExpandAll] = useState(false);

  const isLoading = (
    projectStatus === ServiceCallStatus.IDLE
    || projectStatus === ServiceCallStatus.PENDING
  );

  const isFailure = projectStatus === ServiceCallStatus.FAILURE;

  return (
    <Panel>
      {isFailure && <Failure>Could not load project.</Failure>}
      <ContentHeader>
        {projectTitle}
        <Button onClick={() => setExpandAll(!expandAll)}>Expand All</Button>
      </ContentHeader>
      {isLoading && <Loader />}
      <ul>
        {
          !isLoading && !isFailure && tickets?.map(t => (
            <li>
              <TicketRow
                key={t.id}
                projectID={id}
                ticket={t}
                expand={expandAll}
                expandChildren={expandAll}
              />
            </li>
          ))
        }
      </ul>
      {
        !isLoading && !isFailure && tickets?.length === 0 && (
          <ContentParagraph>There are no tickets for this project.</ContentParagraph>
        )
      }
    </Panel>
  );
}

export default Project;
