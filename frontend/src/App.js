import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/auth/loginform';
import RegisterForm from './components/auth/registerForm';
import Logout from './components/auth/logout';
import Home from './components/home/homePage';
import SourcesPage from './components/sources/sourcesPage';
import ProtectedRoute from './components/protectedRoute';
import { getCurrentUser } from './services/authService';
function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(getCurrentUser() || {})
  }, [])

  return (
    <Switch>
      <Route exact path='/'  >
        <Redirect to='/login' />
      </Route>
      <Route exact path='/login'
        render={(props) => {
          if (!getCurrentUser()) return <LoginForm {...props} />
          return <Redirect to='/home' />
        }}
      />
      <Route exact path='/register' component={RegisterForm} />
      <Route exact path='/logout' component={Logout} />
      <ProtectedRoute path='/home' render={(props) => <Home {...props} user={currentUser} />} />
      <ProtectedRoute path='/sources' render={(props) => <SourcesPage {...props} user={currentUser} />} />

    </Switch>
  );
}

export default App;
