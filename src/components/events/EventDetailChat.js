import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Segment, Comment } from "semantic-ui-react";
import { formatDistance } from 'date-fns';
import { getEventChatRef, firebaseObjectToArray } from "../../api/firebaseServices";
import { listenToEventChats } from "../../redux/actions/eventActions";
import EventChatForm from "../form/EventChatForm";
import { CLEAR_EVENT_CHAT } from "../../redux/types";
import { createDataTree } from "../../utils";

const EventDetailChat = ({ eventId }) => {
  const [showReplyForm, setShowReplyForm] = useState({ isOpen: false, target: null });
  const { comments }= useSelector(state => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    getEventChatRef(eventId).on('value', snapshot => {
      if(!snapshot.exists()) return ;
      console.log(snapshot.val());
      // dispatch(listenToEventChats(firebaseObjectToArray(snapshot.val())));
      dispatch(listenToEventChats(firebaseObjectToArray(snapshot.val()).reverse()));
    });

    return () => {
      dispatch({ type: CLEAR_EVENT_CHAT });
      getEventChatRef().off();
    }

  }, [eventId, dispatch])

  const handleCloseReplyForm = () => {
    setShowReplyForm({ isOpen: false, target: null })
  }

  return (
    <>
      <Segment textAlign="center" attached="top" inverted color="teal" style={{ border: "none" }}>
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventChatForm eventId={eventId} parentId={0} closeForm={setShowReplyForm} />
        <Comment.Group>
          {
            createDataTree(comments).map(({ id, uid, photoURL, displayName, text, date, childNodes }) => (
              <Comment key={id}>
                <Comment.Avatar src={photoURL || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${uid}`}>{displayName}</Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(date, new Date())}</div>
                  </Comment.Metadata>
                  <Comment.Text>{text.split('\n').map((text, i) => <span key={i}>{text}<br /></span>)}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action 
                      onClick={() => setShowReplyForm({ isOpen: true, target: id })}>Reply</Comment.Action>
                    {
                      (showReplyForm.isOpen && showReplyForm.target === id) 
                      && <EventChatForm eventId={eventId} parentId={id} closeForm={handleCloseReplyForm} />
                    }
                  </Comment.Actions>
                </Comment.Content>
                {
                  (childNodes.length > 0) && (
                    <Comment.Group>
                      {
                        childNodes.reverse().map(child => (
                          <Comment key={child.id}>
                            <Comment.Avatar src={child.photoURL || '/assets/user.png'} />
                            <Comment.Content>
                              <Comment.Author as={Link} to={`/profile/${child.uid}`}>{child.displayName}</Comment.Author>
                              <Comment.Metadata>
                                <div>{formatDistance(child.date, new Date())}</div>
                              </Comment.Metadata>
                              <Comment.Text>{child.text.split('\n').map((text, i) => <span key={i}>{text}<br /></span>)}</Comment.Text>
                              <Comment.Actions>
                                <Comment.Action 
                                  onClick={() => setShowReplyForm({ isOpen: true, target: child.id })}>Reply</Comment.Action>
                                {
                                  (showReplyForm.isOpen && showReplyForm.target === child.id) 
                                  && <EventChatForm eventId={eventId} parentId={child.parentId} closeForm={handleCloseReplyForm} />
                                }
                              </Comment.Actions>
                            </Comment.Content>
                          </Comment>
                        ))
                      }
                    </Comment.Group>
                  )
                }
              </Comment>
            ))
          }
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailChat;
