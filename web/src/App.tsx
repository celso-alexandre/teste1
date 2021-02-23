import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button, Form, Grid, Header, Segment,
} from 'semantic-ui-react';
import api from './services/api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();

  const handleLogin = () => {
    api.post('auth/signin', {
      username,
      password,
    })
      .then((response) => {
        const { token: tokenGerado } = response.data;
        setToken(tokenGerado);
      })
      .catch((err) => alert(err.response.data.message));
  };

  const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!token) {
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={handleUsernameChange}
                value={username}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />

              <Button onClick={handleLogin} color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <p>Autenticado!</p>
  );
}

export default App;
