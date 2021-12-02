import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { UserContext } from '../UserContext';

const PrivateRoute = ({ component: View, ...args }) => {
  const { user } = useContext(UserContext);

  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return <Route {...args} render={() => <View />} />;
  }

  return (
    <>
    </>
  );
};

export default PrivateRoute;