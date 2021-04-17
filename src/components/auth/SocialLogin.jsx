import React from 'react'
import { Button } from 'semantic-ui-react'

const SocialLogin = () => {
  return (
    <>
      <Button fluid color="facebook" icon="facebook" style={{ marginBottom: 10 }} content="Login with Facebook" />
      <Button fluid color="google plus" icon="google" style={{ marginBottom: 10 }} content="Login with Google" />
    </>
  )
}

export default SocialLogin
