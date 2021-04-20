import React from "react";
import { Grid } from "semantic-ui-react";

// UI Components
import EventDetailChat from "./../../components/events/EventDetailChat";
import EventDetailInfo from "./../../components/events/EventDetailInfo";
import EventDetailSidebar from "./../../components/events/EventDetailSidebar";
import EventDetailHeader from "./../../components/events/EventDetailHeader";
import useFirestoreDoc from "../../api/hooks/useFirestoreDoc";
import { useSelector } from "react-redux";
import { listenToEventFromFirestore } from "../../api/firestoreServices";
import { useDispatch } from "react-redux";
import { listenForEvents } from '../../redux/actions/eventActions';
import AppLoader from './../../components/AppLoader';
import { Redirect } from "react-router";

const EventDetail = ({ match }) => {
  const { currentUser } = useSelector(state => state.auth);
  const event = useSelector(state => {
    return state.events.items.find(item => item.id === match.params.id);
  });
  const isHost = currentUser.uid === event?.hostUid;
  const isGoing = event?.attendees?.some(a => a.id === currentUser.uid);

  const { loading, error } = useSelector(state => state.async);

  const dispatch = useDispatch();
  
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenForEvents([event])),
    deps: [match.params.id, dispatch]
  });

  if((!event && !error) || loading) return <AppLoader content="Loading event..." />

  if(error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} isGoing={isGoing} isHost={isHost}/>
        <EventDetailInfo event={event} />
        <EventDetailChat eventId={event.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        {/** Pass the "hostUid" to check if current user, so as to be able to show or hide components based on 
          on whether the 
        */}
        <EventDetailSidebar hostUid={event.hostUid} attendees={event?.attendees} /> {/* Specify '?' to indicate that event may not exist */}
      </Grid.Column>
    </Grid>
  );
};

export default EventDetail
