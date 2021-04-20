import React, { Fragment } from 'react';
import { Button, Dropdown, Menu, Container, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { openModal } from '../redux/actions/modalActions';
import { fireSignOut } from '../api/firebaseServices';

import defaultAvatar from './../assets/img/user.png';

const Navbar = () => {
  const { isAuthenticated, currentUser } = useSelector(state => state.auth);
  const {  currentUserProfile } = useSelector(state => state.profile);
  console.log(currentUser, currentUserProfile)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      history.push('/');
      await fireSignOut();
    } catch (error) {
      toast.error(error.message)
    }
  }

  const renderPrivateMenu = (user) => (
    <Fragment>
      <Menu.Item as={NavLink} to="/events/create">
        <Button positive inverted content="Create Event" />
      </Menu.Item>
      <Menu.Item position='right'>
        <Image avatar spaced="right" src={(user?.photoURL) || defaultAvatar} />
        <Dropdown pointing="top left" text={(user?.displayName) || (user?.email) || 'Visitor'}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/events/create" text="Create Event" icon="plus" />
            <Dropdown.Item as={Link} to={`/profile/${user?.id || user?.uid}`} text="My Profile" icon="user" />
            <Dropdown.Item as={Link} to={`/account`} text="My account" icon="settings" />
            <Dropdown.Item onClick={handleSignOut} text="Logout" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Fragment>
  )
  
  const renderPublicMenu = () => (
    <Fragment>
      <Menu.Item position="right">
        <Button onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))} basic inverted content="Login" />
        <Button onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))} basic inverted content="Register" style={{ marginLeft: '0.5em'}} />
      </Menu.Item>
    </Fragment>
  )

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item exact as={NavLink} to="/" header>Re-vents</Menu.Item>

        <Menu.Item as={NavLink} to="/events" header>Events</Menu.Item>

        <Menu.Item as={NavLink} to="/people" header>People</Menu.Item>

        { (isAuthenticated) && renderPrivateMenu(currentUserProfile) }
        { (!isAuthenticated) && renderPublicMenu() }
      </Container>
    </Menu>
  )
}

export default Navbar;