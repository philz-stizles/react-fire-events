import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../../components/form/EventForm';
import EventList from '../../components/events/EventList';
import { EVENTS } from './../../data/events'

const Events = ({ isFormOpen, closeForm }) => {
  const [events, setEvents] = useState(EVENTS)

  const handleCreateEvent = (data) => {
    setEvents([...events, data])
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        { (isFormOpen) && <EventForm createEvent={handleCreateEvent} closeForm={closeForm} /> }
      </Grid.Column>
    </Grid>
  )
};

export default Events;
