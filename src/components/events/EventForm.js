import React, {useState} from 'react';
import { Segment, Form, Input, Button, Header } from 'semantic-ui-react';

const EventForm = ({ closeForm, createEvent }) => {
  const initialValues = {
    title: '',
    category: '',
    description: '',
    venue: '',
    date: ''
  }

  const [formState, setFormState] = useState(initialValues);

  const { title, description, category, venue, date } = formState;

  const handleFormSubmit = () => {
    createEvent(formState)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content="Create a new event" />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <Input onChange={(e) => handleInputChange(e)} name="title" value={title} type="text" placeholder="Event title" />
        </Form.Field>

        <Form.Field>
          <Input onChange={(e) => handleInputChange(e)} name="category" value={category} type="text" placeholder="Category" />
        </Form.Field>

        <Form.Field>
          <Input onChange={(e) => handleInputChange(e)} name="description" value={description} type="text" placeholder="Description" />
        </Form.Field>

        <Form.Field>
          <Input onChange={(e) => handleInputChange(e)} name="venue" value={venue} type="text" placeholder="Venue" />
        </Form.Field>

        <Form.Field>
          <Input onChange={(e) => handleInputChange(e)} name="date" value={date} type="date" placeholder="Date" />
        </Form.Field>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button type="button" floated="right" content="Cancel" onClick={() => closeForm(false)}/>
      </Form>
    </Segment>
  )
}

export default EventForm
