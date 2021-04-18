import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { fireSocialLogin } from '../../api/firebaseServices';
import { closeModal } from '../../redux/actions/modalActions'

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleSocialLogin = (provider) => {
    dispatch(closeModal());
    fireSocialLogin(provider);
  }

  return (
    <>
      <Button 
        onClick={() => handleSocialLogin('facebook')} 
        fluid color="facebook" icon="facebook" 
        style={{ marginBottom: 10 }} 
        content="Login with Facebook" />

      <Button 
        onClick={() => handleSocialLogin('google')} 
        fluid color="google plus" icon="google" 
        style={{ marginBottom: 10 }} 
        content="Login with Google" />
    </>
  )
}

export default SocialLogin
