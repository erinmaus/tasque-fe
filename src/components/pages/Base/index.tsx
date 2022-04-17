import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopLevelHeader from '../../common/headers/TopLevelHeader';

const Content = styled.main`
  padding: 0.5rem;
`;

const Navigation = styled.nav`
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

function Base(): JSX.Element {
  return (
    <>
      <Navigation>
        <TopLevelHeader>Tasque</TopLevelHeader>
      </Navigation>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default Base;
