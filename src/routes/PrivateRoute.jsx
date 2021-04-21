import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import UnAuthenticatedModal from '../components/modals/UnAuthenticatedModal';

const PrivateRoute = ({ component: Component, prevLocation, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return <Route {...rest} render={(props) => (isAuthenticated) ? <Component {...props} /> : <UnAuthenticatedModal {...props} />} />
}

export default PrivateRoute
