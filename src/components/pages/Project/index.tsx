import React from 'react';
import { useMatch } from 'react-router-dom';
import { useTasqueObjectSelector, useTasqueSelector } from '../../../app/hooks';
import { selectProjectStatus, selectProjectTitle, selectTickets } from '../../../stores/projectSlice';
import { ServiceCallStatus } from '../../../stores/types';
import ContentHeader from '../../common/headers/ContentHeader';
import Loader from '../../common/loader/Loader';
import Failure from '../../common/panel/Failure';
import Panel from '../../common/panel/Panel';
import ContentParagraph from '../../common/text/ContentParagraph';

function Project(): JSX.Element {
  const match = useMatch('/project/:id');
  const id = Number(match?.params.id);
  const projectTitle = useTasqueSelector(selectProjectTitle(id));
  const projectStatus = useTasqueSelector(selectProjectStatus(id));
  const tickets = useTasqueObjectSelector(selectTickets(id));

  const isLoading = (
    projectStatus === ServiceCallStatus.IDLE
    || projectStatus === ServiceCallStatus.PENDING
  );

  const isFailure = projectStatus === ServiceCallStatus.FAILURE;

  return (
    <Panel>
      {isFailure && <Failure>Could not load project.</Failure>}
      <ContentHeader>{projectTitle}</ContentHeader>
      {isLoading && <Loader />}
      {
        !isLoading && !isFailure && tickets?.map(t => (
          <div key={t.id}>
            <div>{`#${t.id}: ${t.title} (${t.points} points)`}</div>
            <div>{t.content}</div>
          </div>
        ))
      }
      {
        !isLoading && !isFailure && tickets?.length === 0 && (
          <ContentParagraph>There are no tickets for this project.</ContentParagraph>
        )
      }
    </Panel>
  );
}

export default Project;
