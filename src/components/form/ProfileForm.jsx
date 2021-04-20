import { Formik, Form} from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import CustomTextInput from './CustomTextInput';
import CustomTextArea from './CustomTextArea';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../api/firestoreServices';

const ProfileForm = ({profile}) => {

  return (
    <Formik 
      initialValues={{ 
        displayName: profile.displayName, 
        description: profile.description || '' 
      }} 
      validationSchema={Yup.object({
        displayName: Yup.string().required()
      })} 
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}>
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className="ui form">
          <CustomTextInput name="displayName" placeholder="Display Name" />
          <CustomTextArea name="description" placeholder="Description" />

          <Button 
            type="submit"
            loading={isSubmitting} 
            disabled={!isValid || !dirty || isSubmitting}
            floated="right"
            size="large" 
            positive 
            content="Update profile" />
        </Form>
      )}
    </Formik>
  )
}

export default ProfileForm
