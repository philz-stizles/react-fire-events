import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Button, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventAttendeeList from './EventAttendeeList';

const EventListItem = ({ event, deleteEvent }) => {
  const { id, title, description, hostedBy, venue, date, attendees } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="./../../assets/img/user.png" />
            <Item.Content>
              <Item.Header content={title} />
              <Item.Description>Hosted by | {hostedBy || 'Annonymous'}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group> 
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" /> {format(date, 'MMMM d, yyyy h:mm a')}
          <Icon name="marker" /> {venue}
        </span>
      </Segment>

      <Segment secondary>
        <EventAttendeeList attendees={attendees} />
      </Segment>

      <Segment clearing>
        <div>{description}</div>
        <Button onClick={() => deleteEvent(id)} color="red" floated="right" content="Delete" />
        <Button as={Link} to={`/events/${id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem
