import { Formik, Form } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Button, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import { updateEvent } from '../../redux/actions/eventActions';
import CustomTextArea from './CustomTextArea';
import CustomTextInput from './CustomTextInput';

const EventForm = ({ closeForm, createEvent }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => {
    return state.events.items.find(item => item.id === matchMedia.params.id);
  });

  const initialValues = {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('A category is required'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required()
  });

  return (
    <Segment clearing>
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          (selectedEvent)
          ? dispatch(updateEvent({ ...selectedEvent, ...values }))
          : dispatch(createEvent({ ...values, ...values }))
        }}>
            {({ isSubmitting, dirty, isValid }) => (
              <Form className="ui form">
                <Header sub color="teal" content="Event Details" />
                <CustomTextInput name="title" placeholder="Event title" />
                <CustomTextInput name="category" placeholder="Category" />
                <CustomTextArea rows={3} name="description" placeholder="Description" />

                <Header sub color="teal" content="Location Details" />
                <CustomTextInput name="city" placeholder="City" />
                <CustomTextInput name="venue" placeholder="Venue" />
                <CustomTextInput type="date" name="date" placeholder="Date" />

                <Button 
                  loading={isSubmitting} 
                  disabled={!isValid || !dirty || isSubmitting }
                  type="submit" floated="right" positive content="Submit" />
                <Button type="button" floated="right" content="Cancel" onClick={() => closeForm(false)}/>
              </Form>
            )}
      </Formik>
    </Segment>
  )
}

export default EventForm
