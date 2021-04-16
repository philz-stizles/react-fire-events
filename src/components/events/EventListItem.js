import React from 'react';
import { Segment, Item, Button, Icon, List } from 'semantic-ui-react';
import EventAttendeeList from './EventAttendeeList';

const EventListItem = ({event}) => {
  const { title, description, hostedBy, venue, city, date, attendees } = event;

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
          <Icon name="clock" /> {date}
          <Icon name="marker" /> {venue}
        </span>
      </Segment>

      <Segment secondary>
        <EventAttendeeList attendees={attendees} />
      </Segment>

      <Segment clearing>
        <div>{description}</div>
        <Button color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem
