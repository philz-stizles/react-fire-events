import React, { Fragment, useState } from 'react';
import { Button, Dropdown, Menu, Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = ({openForm}) => {
  const [activeItem, setActiveItem] = useState('home');

  const { auth: { isAuthenticated } } = useSelector(state => ({...state}));

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const renderPrivateMenu = () => (
    <Fragment>
      <Menu.Item><Button onClick={() => openForm(true)} positive inverted content="Create Event" /></Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item text='Language'>
          <Dropdown.Menu>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item>Russian</Dropdown.Item>
            <Dropdown.Item>Spanish</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Fragment>
  )
  
  const renderPublicMenu = () => (
    <Fragment>
      <Menu.Item position="right">
        <Button basic inverted content="Login" />
        <Button basic inverted content="Register" style={{ marginLeft: '0.5em'}} />
      </Menu.Item>
    </Fragment>
  )

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" name='Re-vents' header active={activeItem === 'home'} onClick={handleItemClick} />
        <Menu.Item name='Events' active={activeItem === 'messages'} onClick={handleItemClick}/>
        <Menu.Item name='People' active={activeItem === 'messages'} onClick={handleItemClick}/>
        { (isAuthenticated) && renderPrivateMenu() }
        { (!isAuthenticated) && renderPublicMenu() }
      </Container>
    </Menu>
  )
}

export default Navbar;