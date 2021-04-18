import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../../components/events/EventList';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEventsFromFirestore } from '../../api/firestoreServices';
import EventFilters from '../../components/events/EventFilters';
import EventListItemPlaceholder from '../../components/events/EventListItemPlaceholder';
import useFirestoreCollection from '../../api/hooks/useFirestoreCollection';
import { listenForEvents } from '../../redux/actions/eventActions';

const Events = () => {
  const { items: events } = useSelector(state => state.events);
  console.log(events);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: events => dispatch(listenForEvents(events)),
    deps: [dispatch]
  });

  // METHOD 2
  // useEffect(() => {
  //   // Set loading to true in redux 
  //   dispatch(asyncActionStart());

  //   // Start listening to data from firebase
  //   const unSubscribe = listenToEventsFromFirestore({
  //     next: snapshot => {
  //       console.log(snapshot)
  //       dispatch(listenForEvents(snapshot.docs.map(docSnapshot => transformSnapshot(docSnapshot))));

  //       // Set loading to false in redux 
  //       dispatch(asyncActionFinish());
  //     },
  //     error: error => {
  //       console.log(error)
  //       dispatch(asyncActionError());
  //     },
  //     complete: () => console.log('You will never see this message')
  //   });

  //   return unSubscribe; // Dispose of the subscription when component unmounts

  // }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
      {
        (loading) && (
          <>
            <EventListItemPlaceholder />
          </>
        )
      }
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
};

export default Events;
