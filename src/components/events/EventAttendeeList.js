import React from 'react';
import { List, Image } from 'semantic-ui-react';

const EventAttendeeList = ({attendees}) => {
  return (
    <List horizontal>
      {
        attendees && attendees.map(({photoURL}, i) => (
          <List.Item key={i}><Image size="mini" circular src={photoURL || '/assets/img/user.png'} /></List.Item>
        ))
      }
    </List>
  )
}

export default EventAttendeeList
