import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import { addEventChatComment } from '../../api/firebaseServices';
import * as Yup from 'yup';
// import CustomTextArea from '../form/CustomTextArea'

const EventChatForm = ({eventId, parentId, closeForm}) => {
  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={Yup.object({
        comment: Yup.string().required()
      })} 
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm({ isOpen: false, target: null });
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className="ui form">
          <Field name="comment">
            {({field}) => (
              <div style={{ position: 'relative' }}>
                <Loader active={isSubmitting} />
                <textarea 
                  {...field}  
                  placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)" 
                  rows="2"
                  onKeyPress={(e) => {
                    if(e.key === 'Enter' && e.shiftKey) {
                      return;
                    }
                    
                    if(e.key === 'Enter' && !e.shiftKey) {
                      // Prevent the Default behaviour of submit event to enable validation check
                      e.preventDefault();

                      // If form is valid, then handle submit
                      isValid && handleSubmit();
                    }

                  }}></textarea>
              </div>
            )}
          </Field>
          {/*<CustomTextArea name="comment" placeholder="Please enter your comment here" rows={2} />
            <Button 
            type="submit"
            loading={isSubmitting} 
            content="Add Reply" 
            labelPosition="left" 
            icon="edit" 
          primary/>*/}
        </Form>
      )}
    </Formik>
  )
}

export default EventChatForm
