import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTasqueDispatch, useTasqueSelector } from './app/hooks';
import { refreshLabels, selectLabelStatus } from './stores/labelSlice';
import { refreshStatuses, selectStatusStatus } from './stores/statusSlice';
import { ServiceCallStatus } from './stores/status';
import { selectEmail, selectIsLoggedIn } from './stores/accountSlice';
import { GlobalStyle } from './components/GlobalStyle/GlobalStyle';
import Theme from './components/Theme/Theme';
import UnstyledLoginPopup from './components/LoginPopup';

function App(): JSX.Element {
  const dispatch = useTasqueDispatch();
  const isLoggedIn = useTasqueSelector(selectIsLoggedIn);
  const email = useTasqueSelector(selectEmail);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshStatuses());
      dispatch(refreshLabels());
    }
  }, [dispatch, isLoggedIn]);

  const labelStatus = useTasqueSelector(selectLabelStatus);
  const statusStatus = useTasqueSelector(selectStatusStatus);

  const isLoading = (
    labelStatus === ServiceCallStatus.PENDING
    || statusStatus === ServiceCallStatus.PENDING
  );
  const hasError = (
    labelStatus === ServiceCallStatus.FAILURE
    || statusStatus === ServiceCallStatus.FAILURE
  );

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <UnstyledLoginPopup />
      </ThemeProvider >
    );
  }

  return <>
    {isLoading && <div>Loading...</div>}
    {hasError && <div>Error!</div>}
    {!isLoading && !hasError && <div>Success, {email}!</div>}
  </>;
}

export default App;
