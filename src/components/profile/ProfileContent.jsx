import React from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './tabs/AboutTab';
import PhotosTab from './tabs/PhotosTab';

const ProfileContent = ({ isCurrentUser, profile}) => {
  const panes = [
    { menuItem: 'About', render: () => <AboutTab isCurrentUser={isCurrentUser} profile={profile} /> },
    { menuItem: 'Photos', render: () => <PhotosTab isCurrentUser={isCurrentUser} profile={profile} /> },
    { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane>},
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane>},
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane>}
  ];
  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} />
  )
}

export default ProfileContent;
