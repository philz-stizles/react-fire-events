import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
// import LoadingComponent from "../../../app/layout/LoadingComponent";

// UI Components
import EventDetailChat from "./../../components/events/EventDetailChat";
import EventDetailInfo from "./../../components/events/EventDetailInfo";
import EventDetailSidebar from "./../../components/events/EventDetailSidebar";
import EventDetailHeader from "./../../components/events/EventDetailHeader";

const EventDetail = () => {
  const [event, setEvent] = useState(null)

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat eventId={event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar event={event} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetail
