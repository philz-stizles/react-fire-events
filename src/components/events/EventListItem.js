import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Button, Icon, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventAttendeeList from './EventAttendeeList';
import { deleteEventInFirestore } from '../../api/firestoreServices';

const EventListItem = ({ event }) => {
  const { id, hostUid, title, description, hostedBy, hostPhotoURL, venue, date, attendees, isCancelled } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header content={title} />
              <Item.Description>Hosted by | {<Link to={`/profile/${hostUid}`}>{hostedBy}</Link> || 'Annonymous'}</Item.Description>
              {isCancelled && (
                <Label style={{ top: '-40px' }} ribbon="right" color="red" content="This event has been cancelled" />
              )}
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
        <Button onClick={() => deleteEventInFirestore(id)} color="red" floated="right" content="Delete" />
        <Button as={Link} to={`/events/${id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem
