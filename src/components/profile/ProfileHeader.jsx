import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react'
import { followUser, getFollowingDoc, unFollowUser } from '../../api/firestoreServices';
import { setIsFollowingUser, setIsNotFollowingUser } from '../../redux/actions/profileActions';
import { CLEAR_FOLLOWINGS } from '../../redux/types';

import defaultAvatar from './../../assets/img/user.png';

const ProfileHeader = ({ isCurrentUser, profile}) => {
  const [loading, setLoading] = useState(false);
  const { isFollowingUser } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  console.log('isFollowingUser', isFollowingUser );

  useEffect(() => {
    if(isCurrentUser) return;

    setLoading(true);
    const fetchFollowingDoc = async () => {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if(followingDoc && followingDoc.exists) {
          dispatch(setIsFollowingUser());
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }

    fetchFollowingDoc().then(() => setLoading(false));

    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS }) // Clear following data when unmounting the component
    }
    
  }, [dispatch, profile.id, isCurrentUser])

  const handleFollowUser = async (profile) => {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setIsFollowingUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleUnfollowUser = async (profile) => {
    setLoading(true);
    try {
      await unFollowUser(profile);
      dispatch(setIsNotFollowingUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={(profile && profile.photoURL) || defaultAvatar} />
              <Item.Content verticalAlign="middle">
                <Header as="h1" style={{ display: 'block', marginBottom: 10 }} content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={profile.followerCount || 0} />
            <Statistic label="Following" value={profile.followingCount || 0} />
          </Statistic.Group>

          {
            (!isCurrentUser) && (
              <>
                <Divider />

                <Reveal animated="move">
                  <Reveal.Content visible style={{width: '100%'}}>
                    <Button fluid color="teal" content={(isFollowingUser) ? 'Following' : 'Not following'} />
                  </Reveal.Content>

                  <Reveal.Content hidden style={{width: '100%'}}>
                    <Button 
                      loading={loading}
                      onClick={(isFollowingUser) ? () => handleUnfollowUser(profile) : () => handleFollowUser(profile)} 
                      basic 
                      fluid 
                      color={(isFollowingUser) ? 'red' : 'green'} 
                      content={(isFollowingUser) ? 'Unfollow' : 'Follow'} />
                  </Reveal.Content>
                </Reveal>
              </>
            )
          }
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default ProfileHeader;
