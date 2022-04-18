import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useTasqueDispatch, useTasqueObjectSelector, useTasqueSelector } from '../../../app/hooks';
import { BuiltInLabelTypes } from '../../../service/labelService';
import { BuiltinStatusTypes } from '../../../service/statusService';
import { selectLabels } from '../../../stores/labelSlice';
import {
  selectProjectStatus, selectProjectTitle, selectOrphanTickets, newTicket,
} from '../../../stores/projectSlice';
import { selectStatuses } from '../../../stores/statusSlice';
import { ServiceCallStatus } from '../../../stores/types';
import Button from '../../common/button/Button';
import PrimaryButton from '../../common/button/PrimaryButton';
import ContentHeader from '../../common/headers/ContentHeader';
import Loader from '../../common/loader/Loader';
import Failure from '../../common/panel/Failure';
import Panel from '../../common/panel/Panel';
import ContentParagraph from '../../common/text/ContentParagraph';
import TicketRow from '../../TicketRow';

function Project(): JSX.Element {
  const match = useMatch('/project/:id');
  const id = Number(match?.params.id);
  const dispatch = useTasqueDispatch();
  const statuses = useTasqueObjectSelector(selectStatuses);
  const labels = useTasqueObjectSelector(selectLabels);
  const projectTitle = useTasqueSelector(selectProjectTitle(id));
  const projectStatus = useTasqueSelector(selectProjectStatus(id));
  const tickets = useTasqueObjectSelector(selectOrphanTickets(id));
  const [expandAll, setExpandAll] = useState(false);

  const createNewTicket = () => {
    const label = labels.find(l => l.title === BuiltInLabelTypes.MILESTONE);
    const status = statuses.find(s => s.title === BuiltinStatusTypes.NOT_STARTED);

    dispatch(newTicket({
      title: 'New Milestone',
      content: 'This is a newly created milestone.',
      status: (status?.id || 1),
      label: (label?.id || 1),
      points: 0,
      project: id,
    }));
  };

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
      </ContentHeader>
      <PrimaryButton onClick={createNewTicket}>New milestone...</PrimaryButton>
      <Button onClick={() => setExpandAll(!expandAll)}>Expand All</Button>
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
