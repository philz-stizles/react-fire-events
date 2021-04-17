import { Formik, Form} from 'formik';
import React from 'react';
import { Button, Divider, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import CustomTextInput from './CustomTextInput';
import ModalWrapper from '../modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { fireRegister } from '../../api/firebaseServices';
import SocialLogin from '../auth/SocialLogin';

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = { displayName: '', email: '', password: '' };

  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    email: Yup.string().required('You must provide an email').email(),
    password: Yup.string().required()
  });

  return (
    <ModalWrapper size="mini" header="Register to Re-vents">
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await fireRegister(values);
            setSubmitting(false);
            dispatch(closeModal());

          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
            console.log(error);
          }
        }}>
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <CustomTextInput name="displayName" placeholder="Display Name" />
            <CustomTextInput name="email" placeholder="Email Address" />
            <CustomTextInput type="password" name="password" placeholder="Password" />
            
            {(errors.auth && <Label basic color="red" style={{ marginBottom: 10 }} content={errors.auth} />)}

            <Button 
              type="submit"
              loading={isSubmitting} 
              disabled={!isValid || !dirty || isSubmitting}
              fluid size="medium" color="teal" content="Register" />
              
            <Divider horizontal>Or</Divider>

            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
