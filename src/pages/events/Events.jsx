import React, { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import EventList from '../../components/events/EventList';
import { useDispatch, useSelector } from 'react-redux';
// import { listenToEventsFromFirestore } from '../../api/firestoreServices';
import EventFilters from '../../components/events/EventFilters';
import EventListItemPlaceholder from '../../components/events/EventListItemPlaceholder';
// import useFirestoreCollection from '../../api/hooks/useFirestoreCollection';
import { clearEvents, fetchEvents } from '../../redux/actions/eventActions';
import EventsFeed from '../../components/events/EventsFeed';

const Events = () => {
  const limit = 3;
  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all']
  ]));
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [stateLoading, setStateLoading] = useState(false);
  const { items: events, moreEvents } = useSelector(state => state.events);
  const { loading } = useSelector(state => state.async);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(predicate),
  //   data: events => dispatch(listenForEvents(events)),
  //   deps: [dispatch, predicate]
  // });

  useEffect(() => {
    setStateLoading(true);
    dispatch(fetchEvents(predicate, null, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setStateLoading(false);
    });

    return () => {
      dispatch(clearEvents());
    }
  }, [dispatch, predicate])


  const handleFetchNextEvents = () => {
    dispatch(fetchEvents(predicate, lastDocSnapshot, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
    });
  }

  const handleSetPredicate = (key, value) => {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {
          (stateLoading) && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )
        }
        <EventList events={events} />
        <Button
          loading={loading} 
          disabled={loading || !moreEvents}
          fluid 
          color="green" 
          content="Load more..." 
          onClick={handleFetchNextEvents} />
      </Grid.Column>

      <Grid.Column width={6}>
        {(isAuthenticated) && <EventsFeed />}
        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
      </Grid.Column>
    </Grid>
  )
};

export default Events;
