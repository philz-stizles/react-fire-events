import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';

// Tab Components
import AboutTab from './tabs/AboutTab';
import EventsTab from './tabs/EventsTab';
import FollowingTab from './tabs/FollowingTab';
import PhotosTab from './tabs/PhotosTab';

const ProfileContent = ({ isCurrentUser, profile}) => {
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    { menuItem: 'About', render: () => <AboutTab isCurrentUser={isCurrentUser} profile={profile} /> },
    { menuItem: 'Photos', render: () => <PhotosTab isCurrentUser={isCurrentUser} profile={profile} /> },
    { menuItem: 'Events', render: () => <EventsTab profile={profile} /> },
    { menuItem: 'Followers', render: () => <FollowingTab key={profile.id} profile={profile} activeTab={activeTab} />},
    { menuItem: 'Following', render: () => <FollowingTab key={profile.id} profile={profile} activeTab={activeTab} />}
  ];

  return (
    <Tab 
      menu={{ fluid: true, vertical: true }} 
      menuPosition="right" 
      panes={panes} 
      onTabChange={(e, data) => setActiveTab(data.activeIndex)} />
  )
}

export default ProfileContent;
