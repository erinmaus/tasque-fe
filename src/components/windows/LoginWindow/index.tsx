import React, { useState } from 'react';
import styled from 'styled-components';
import { useTasqueDispatch, useTasqueSelector } from '../../../app/hooks';
import { ServiceCallStatus } from '../../../stores/types';
import { selectLoginStatus, login } from '../../../stores/userSlice';
import PrimaryButton from '../../common/button/PrimaryButton';
import FormLabel from '../../common/form/FormLabel';
import VerticalForm from '../../common/form/VerticalForm';
import PasswordInput from '../../common/input/PasswordInput';
import TextInput from '../../common/input/TextInput';
import Failure from '../../common/panel/Failure';
import Panel from '../../common/panel/Panel';

const LoginPanel = styled(Panel)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  max-width: 16em;

  @media(min-width: 480px) {
    max-width: 100vw;
  }
`;

function LoginWindow(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useTasqueDispatch();
  const loginStatus = useTasqueSelector(selectLoginStatus);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <LoginPanel>
      {
        loginStatus === ServiceCallStatus.FAILURE
        && <Failure>Could not login with given username and password.</Failure>
      }
      <VerticalForm onSubmit={onSubmit}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextInput name="username" onChange={({ target }) => setUsername(target.value)} />
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput name="password" onChange={({ target }) => setPassword(target.value)} />
        <PrimaryButton type="submit">Login!</PrimaryButton>
      </VerticalForm>
    </LoginPanel>
  );
}

export default LoginWindow;
