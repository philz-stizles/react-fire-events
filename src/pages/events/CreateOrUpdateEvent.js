import React from 'react'
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Button, Header, Confirm } from 'semantic-ui-react';
import * as Yup from 'yup';
import { addEventToFirestore, cancelEventToggleInFirestore, listenToEventFromFirestore, updateEventInFirestore } from '../../api/firestoreServices';
import useFirestoreDoc from '../../api/hooks/useFirestoreDoc';
import { listenForEvents } from '../../redux/actions/eventActions';
import CustomTextArea from '../../components/form/CustomTextArea';
import CustomTextInput from '../../components/form/CustomTextInput';
import AppLoader from '../../components/AppLoader';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import { useState } from 'react';
import CustomSelectInput from '../../components/form/CustomSelectInput';
import CustomDateInput from '../../components/form/CustomDateInput';

const categoryOptions = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

const CreateEvent = ({ match, history }) => {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => {
    return state.events.items.find(item => item.id === match.params.id);
  });

  const { loading, error } = useSelector(state => state.async);

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required('City is required'),
    venue: Yup.string().required('Venue is required'),
    date: Yup.string().required()
  });

  const handleCancelToggle = async (event) => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggleInFirestore(event);
      setLoadingCancel(false);
      toast.success('Event status updated');
    } catch (error) {
      setLoadingCancel(false);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenForEvents([event])),
    deps: [match.params.id, dispatch]
  });

  if(loading) return <AppLoader content="Loading event..." />

  if(error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            (selectedEvent)
            ? await updateEventInFirestore(values)
            : await addEventToFirestore(values)

            history.push('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}>
            {({ isSubmitting, dirty, isValid }) => (
              <Form className="ui form">
                <Header sub color="teal" content="Event Details" />
                <CustomTextInput name="title" placeholder="Event title" />
                <CustomSelectInput name="category" placeholder="Category" options={categoryOptions} />
                <CustomTextArea rows={3} name="description" placeholder="Description" />

                <Header sub color="teal" content="Location Details" />
                <CustomTextInput name="city" placeholder="City" />
                <CustomTextInput name="venue" placeholder="Venue" />
                <CustomDateInput  
                  name="date" 
                  placeholderText="Date"
                  timeFormat="HH:mm"
                  showTimeSelect
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm a"/>

                {
                  (selectedEvent) && (
                    <Button
                      loading={loadingCancel} 
                      color={selectedEvent.isCancelled ? 'green' : 'red'} 
                      type="button" 
                      floated="left" 
                      content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel event'} 
                      onClick={() => setConfirmOpen(true)}/>
                  )
                }
                
                <Button 
                  loading={isSubmitting} 
                  disabled={!isValid || !dirty || isSubmitting }
                  type="submit" floated="right" positive content="Submit" />

                <Button type="button" floated="right" content="Cancel" onClick={() => history.push('/events')}/>
              </Form>
            )}
      </Formik>
      <Confirm 
        open={confirmOpen}
        content={
          selectedEvent?.isCancelled 
          ? 'This will reactivate the event, are you sure?' 
          : 'This will cancel the event, are you sure?'
        }
        onConfirm={() => handleCancelToggle(selectedEvent)} 
        onCancel={() => setConfirmOpen(false)}
      />
    </Segment>
  )
}

export default CreateEvent
