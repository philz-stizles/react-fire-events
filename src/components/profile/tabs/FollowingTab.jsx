import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { getFollowersCollection, getFollowingsCollection } from '../../../api/firestoreServices';
import useFirestoreCollection from '../../../api/hooks/useFirestoreCollection';
import { listenToFollowers, listenToFollowings } from '../../../redux/actions/profileActions';
import ProfileCard from '../../cards/ProfileCard';

const FollowingTab = ({profile, activeTab}) => {
  const { followers,  followings } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: (activeTab === 3)
    ? () => getFollowersCollection(profile.id)
    : () => getFollowingsCollection(profile.id),
    data: data => (activeTab === 3)
    ? () => dispatch(listenToFollowers(data))
    : () => dispatch(listenToFollowings(data)),
    deps: [dispatch, activeTab]
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={(activeTab === 3) ? 'Followers' : 'Following'} />
        </Grid.Column>

        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {(activeTab === 3) && followers.map(profile => <ProfileCard key={profile.id} profile={profile} />)}
            {(activeTab === 4) && followings.map(profile => <ProfileCard key={profile.id} profile={profile} />)}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default FollowingTab;