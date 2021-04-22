import React from 'react';
import { Feed, Header, Segment } from 'semantic-ui-react';
import defaultAvatar from './../../assets/img/user.png';

const EventsFeed = () => {
  return (
    <>
      <Header attached color="teal" icon="newspaper" content="New feed" />
      <Segment attached="bottom">
        <Feed>
          <Feed.Event image={defaultAvatar} date={`date`} summary={`summary`}/>
        </Feed>
      </Segment>
    </>
  )
}

export default EventsFeed
