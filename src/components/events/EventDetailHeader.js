// import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Segment, Image, Header, Item, Button } from "semantic-ui-react";
import { addUserAttendance, cancelUserAttendance } from "../../api/firestoreServices";


const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailHeader = ({ event, isGoing, isHost }) => {
  const { id, hostedBy, date, hostUid } = event;
  const [loading, setLoading] = useState(false);

  const handleUserJoinEvent = async (eventId)=> {
    setLoading(true);
    try {
      await addUserAttendance(eventId);
      toast.success('You are now an attendee');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleUserLeaveEvent = async (eventId)=> {
    setLoading(true);
    try {
      await cancelUserAttendance(eventId);
      toast.success('You have left the event');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image style={eventImageStyle} src={`./../../assets/categoryImages/drinks.jpg`} fluid />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content="Event Title"
                  style={{ color: "white" }}
                />
                <p>{date}</p>
                {/*<p>{format(date, 'MMM d, yyyy h:mm a')}</p>*/}
                <p>Hosted by <strong><Link to={`/profile/${hostUid}`}>{hostedBy}</Link></strong></p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {
          (!isHost) && (
            <>
              {
                (isGoing) 
                ? <Button loading={loading} onClick={() => handleUserLeaveEvent(id)}>Cancel My Place</Button> 
                : <Button loading={loading} onClick={() => handleUserJoinEvent(id)} color="teal">JOIN THIS EVENT</Button>
              }
            </>
          )
        }

        {
          (isHost) && <Button as={Link} to={`/events/create/${id}`} color="orange" floated="right">Manage Event</Button>
        }
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailHeader;
