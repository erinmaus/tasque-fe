import React, { useEffect } from 'react';
import { useTasqueDispatch, useTasqueSelector } from './app/hooks';
import GlobalStyle from './components/GlobalStyle';
import TableOfContents from './components/pages/TableOfContents';
import LoginWindow from './components/windows/LoginWindow';
import { refreshLabels, selectLabelStatus } from './stores/labelSlice';
import { refreshStatuses, selectStatusStatus } from './stores/statusSlice';
import { ServiceCallStatus } from './stores/types';
import { selectIsLoggedIn } from './stores/userSlice';

function App(): JSX.Element {
  const dispatch = useTasqueDispatch();
  const isLoggedIn = useTasqueSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshLabels());
      dispatch(refreshStatuses());
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
