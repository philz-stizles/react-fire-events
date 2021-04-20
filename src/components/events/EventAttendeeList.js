import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

const EventAttendeeList = ({attendees}) => {
  return (
    <List horizontal>
      {
        attendees && attendees.map(({photoURL, id}, i) => (
          <List.Item key={i} as={Link} to={`/profile/${id}`}>
            <Image size="mini" circular src={photoURL || '/assets/img/user.png'} />
          </List.Item>
        ))
      }
    </List>
  )
}

export default EventAttendeeList
