import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../../components/events/EventList';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEventsFromFirestore } from '../../api/firestoreServices';
import EventFilters from '../../components/events/EventFilters';
import EventListItemPlaceholder from '../../components/events/EventListItemPlaceholder';
import useFirestoreCollection from '../../api/hooks/useFirestoreCollection';
import { listenForEvents } from '../../redux/actions/eventActions';

const Events = () => {
  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all']
  ]));
  const { items: events } = useSelector(state => state.events);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: events => dispatch(listenForEvents(events)),
    deps: [dispatch, predicate]
  });

  const handleSetPredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key, value)));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {
          (loading) && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )
        }
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
      </Grid.Column>
    </Grid>
  )
};

export default Events;
