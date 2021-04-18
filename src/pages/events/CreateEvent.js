import React from 'react'
import EventForm from '../../components/form/EventForm'

const CreateEvent = ({match}) => {
  return (
    <>
      <EventForm match={match} />
    </>
  )
}

export default CreateEvent
