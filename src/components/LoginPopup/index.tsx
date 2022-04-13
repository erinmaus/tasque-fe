import React, { useState } from 'react';
import styled from 'styled-components';
import { useTasqueDispatch, useTasqueSelector } from '../../app/hooks';
import Button from '../common/Button/Button';
import { PasswordInput, TextInput } from '../common/Input';
import Panel from '../common/Panel/Panel';
import { authenticateAccount } from '../../stores/accountSlice';
import FormLabel from '../common/Form/FormLabel';
import { ServiceCallStatus } from '../../stores/status';
import FailurePanel from '../common/Panel/FailurePanel';

const LoginForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  & > label, & > button {
    margin-top: 1rem;
  }
`;

const LoginPanel = styled(Panel)`
  max-width: 320px;
`;

function LoginPopup(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginStatus = useTasqueSelector(state => state.account.status);
  const dispatch = useTasqueDispatch();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authenticateAccount({
      username,
      password,
    }));
  };

  return (
    <LoginPanel>
      <LoginForm onSubmit={login}>
        {
          loginStatus === ServiceCallStatus.FAILURE && (
            <FailurePanel>Username or password mismatch.</FailurePanel>
          )
        }
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextInput onChange={({ target }) => setUsername(target.value)} />
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput onChange={({ target }) => setPassword(target.value)} />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginPanel>
  );
}

export default LoginPopup;
