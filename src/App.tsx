import React, { useEffect } from 'react';
import { useTasqueDispatch, useTasqueSelector } from './app/hooks';
import { refreshLabels, selectLabelStatus } from './stores/labelSlice';
import { refreshStatuses, selectStatusStatus } from './stores/statusSlice';
import { ServiceCallStatus } from './stores/status';

function App(): JSX.Element {
  const dispatch = useTasqueDispatch();

  useEffect(() => {
    dispatch(refreshLabels())
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(refreshStatuses())
  }, [dispatch]);

  const labelStatus = useTasqueSelector(selectLabelStatus);
  const statusStatus = useTasqueSelector(selectStatusStatus);

  const isLoading = labelStatus === ServiceCallStatus.PENDING || statusStatus === ServiceCallStatus.PENDING;
  const hasError = labelStatus === ServiceCallStatus.FAILURE || statusStatus === ServiceCallStatus.FAILURE;

  return <>
    {isLoading && <div>Loading...</div>}
    {hasError && <div>Error!</div>}
  </>
}

export default App;
