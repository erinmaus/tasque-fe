import React, { useEffect } from 'react';
import { useTasqueDispatch, useTasqueSelector } from './app/hooks';
import GlobalStyle from './components/GlobalStyle';
import TableOfContents from './components/pages/TableOfContents';
import LoginWindow from './components/windows/LoginWindow';
import { validateToken } from './service/authService';
import { TasqueDispatch } from './stores';
import { refreshLabels, selectLabelStatus } from './stores/labelSlice';
import { getAllProjects } from './stores/projectSlice';
import { refreshStatuses, selectStatusStatus } from './stores/statusSlice';
import { ServiceCallStatus } from './stores/types';
import {
  logout, me, refresh, selectIsLoggedIn, selectUsername,
} from './stores/userSlice';

const checkIfLoggedIn = (dispatch: TasqueDispatch) => {
  if (!validateToken(60)) {
    if (!validateToken()) {
      dispatch(logout());
      return;
    }

    dispatch(refresh());
  }

  setTimeout(() => checkIfLoggedIn(dispatch), 1000);
};

function App(): JSX.Element {
  const dispatch = useTasqueDispatch();
  const isLoggedIn = useTasqueSelector(selectIsLoggedIn);
  const username = useTasqueSelector(selectUsername);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshLabels());
      dispatch(refreshStatuses());
      dispatch(getAllProjects());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && !username) {
      dispatch(me());
    }
  }, [dispatch, isLoggedIn, username]);

  useEffect(() => {
    if (isLoggedIn) {
      checkIfLoggedIn(dispatch);
    }
  }, [dispatch, isLoggedIn]);

  const labelStatus = useTasqueSelector(selectLabelStatus);
  const statusStatus = useTasqueSelector(selectStatusStatus);

  const isLoading = (
    (labelStatus === ServiceCallStatus.PENDING || labelStatus === ServiceCallStatus.IDLE)
    || (statusStatus === ServiceCallStatus.PENDING || statusStatus === ServiceCallStatus.IDLE)
  );
  const hasError = (
    labelStatus === ServiceCallStatus.FAILURE
    || statusStatus === ServiceCallStatus.FAILURE
  );

  return (
    <>
      <GlobalStyle />
      {!isLoggedIn && <LoginWindow />}
      {isLoggedIn && !isLoading && !hasError && <TableOfContents />}
    </>
  );
}

export default App;
