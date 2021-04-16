import EventListItem from "./EventListItem";

const EventList = ({events}) => {
  return events.map((event, i) => <EventListItem key={i} event={event} />)
};

export default EventList;
