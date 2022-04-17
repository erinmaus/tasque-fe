import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTasqueObjectSelector, useTasqueSelector } from '../../../app/hooks';
import { selectProjects, selectProjectsStatus } from '../../../stores/projectSlice';
import { ServiceCallStatus } from '../../../stores/types';
import { selectUsername } from '../../../stores/userSlice';
import Button from '../../common/button/Button';
import ContentHeader from '../../common/headers/ContentHeader';
import Loader from '../../common/loader/Loader';
import Failure from '../../common/panel/Failure';
import Panel from '../../common/panel/Panel';
import ContentParagraph from '../../common/text/ContentParagraph';

const ProjectButton = styled(Button)`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 10em;
`;

function Home(): JSX.Element {
  const username = useTasqueSelector(selectUsername);
  const projectStatus = useTasqueSelector(selectProjectsStatus);
  const projects = useTasqueObjectSelector(selectProjects);
  const navigate = useNavigate();

  const isLoading = (
    projectStatus === ServiceCallStatus.IDLE
    || projectStatus === ServiceCallStatus.PENDING
  );

  const isFailure = projectStatus === ServiceCallStatus.FAILURE;

  const hasProjects = projects.length > 0;

  return (
    <Panel>
      {
        isFailure && (
          <Failure>Could not fetch projects; please refresh the page and try again.</Failure>
        )
      }
      {
        !isLoading && !hasProjects && <Failure>There are no projects available -- whoops!</Failure>
      }
      <ContentHeader>{`Welcome, ${username}, to Tasque!`}</ContentHeader>
      <ContentParagraph>
        No time to waste -- select a project to get started!
      </ContentParagraph>
      {isLoading && <Loader />}
      {
        !isLoading && hasProjects && projects.map(p => (
          <ProjectButton key={p.id} onClick={() => navigate(`/project/${p.id}`)}>{p.title}</ProjectButton>
        ))
      }
    </Panel>
  );
}

export default Home;
