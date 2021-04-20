import React from 'react'
import { Grid } from 'semantic-ui-react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileContent from '../../components/profile/ProfileContent';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../api/hooks/useFirestoreDoc';
import { listenToUserFromFirestore } from "../../api/firestoreServices";
import AppLoader from '../../components/AppLoader';
import { listenToSelectedUserProfile } from '../../redux/actions/profileActions';

const Profile = ({ match }) => {
  const { selectedUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFirestoreDoc({
    query: () => listenToUserFromFirestore(match.params.id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [match.params.id, dispatch]
  });

  if((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) {
    return <AppLoader content="Loading event..." />;
  }

  // if(error) return <Redirect to="/error" />;
console.log(selectedUserProfile)

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader 
          isCurrentUser={currentUser.uid === selectedUserProfile.id} 
          profile={selectedUserProfile} />
        <ProfileContent 
          isCurrentUser={currentUser.uid === selectedUserProfile.id} 
          profile={selectedUserProfile} />
      </Grid.Column>
    </Grid>
  )
}

export default Profile;
