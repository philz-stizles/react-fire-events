import React from 'react'
import { Feed, Header, Segment } from 'semantic-ui-react'

const EventsFeed = () => {
  return (
    <>
      <Header attached color="teal" icon="newspaper" content="New feed" />
      <Segment attached="bottom">
        <Feed>
          <Feed.Event image={image} />
        </Feed>
      </Segment>
    </>
  )
}

export default EventsFeed
