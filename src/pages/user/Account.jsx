import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { fireUpdateUserPassword } from '../../api/firebaseServices';
import CustomTextInput from '../../components/form/CustomTextInput';

const Account = () => {
  const { currentUser } = useSelector(state => state.auth);

  return (
    <Segment>
      <Header div size="large" content="Account" />
      {(currentUser && currentUser.providerId === 'password') && (
        <>
          <Header color="teal" sub content="Account" />
          <p>Use this form to change your password</p>
          <Formik 
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              newPassword: Yup.string().required('Password is required'),
              confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await fireUpdateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}>
            {({ errors, isSubmitting, dirty, isValid }) => (
              <Form className="ui form">
                <CustomTextInput type="password" name="newPassword" placeholder="New Password" />
                <CustomTextInput type="password" name="confirmPassword" placeholder="Confirm Password" />

                {(errors.auth && <Label basic color="red" style={{ marginBottom: 10 }} content={errors.auth} />)}

                <Button 
                  style={{ display: 'block' }}
                  type="submit"
                  loading={isSubmitting} 
                  disabled={!isValid || !dirty || isSubmitting}
                  size="large" 
                  positive 
                  content="Update password" />
              </Form>
            )}
          </Formik>
        </>
      )}

      {(currentUser && currentUser.providerId === 'facebook.com') && (
        <>
          <Header color="teal" sub content="Facebook account" />
          <p>Please visit Facebook to update your account</p>
          <Button icon="facebook" color="facebook" as={Link} to="https://facebook.com" content="Go to Facebook" />
        </>
      )}
      
      {(currentUser && currentUser.providerId === 'google.com') && (
        <>
          <Header color="teal" sub content="Google account" />
          <p>Please visit Google to update your account</p>
          <Button icon="google" color="google plus" as={Link} to="https://google.com" content="Go to Google" />
        </>
      )}
    </Segment>
  )
}

export default Account
