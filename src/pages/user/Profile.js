import React from 'react'
import { Grid } from 'semantic-ui-react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileContent from '../../components/profile/ProfileContent';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const { currentUserProfile } = useSelector(state => state.profile);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  )
}

export default Profile
