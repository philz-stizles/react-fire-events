import { Formik, Form} from 'formik';
import React from 'react';
import { Button, Divider, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import CustomTextInput from './CustomTextInput';
import ModalWrapper from '../modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { signInWithEmail } from '../../api/firebaseServices';
import SocialLogin from '../auth/SocialLogin';

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().required('You must provide an email').email(),
    password: Yup.string().required('You must provide a password')
  });

  return (
    <ModalWrapper size="mini" header="Sign in to Re-vents">
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());

          } catch (error) {
            setSubmitting(false);
            setErrors({ auth: 'Invalid email/password' }); // setErrors({ auth: error.message });
            console.log(error);
          }
        }}>
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <CustomTextInput name="email" placeholder="Email Address" />
            <CustomTextInput type="password" name="password" placeholder="Password" />

            {(errors.auth && <Label basic color="red" style={{ marginBottom: 10 }} content={errors.auth} />)}

            <Button 
              type="submit"
              loading={isSubmitting} 
              disabled={!isValid || !dirty || isSubmitting}
              fluid size="medium" color="teal" content="Login" />

            <Divider horizontal>Or</Divider>

            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
