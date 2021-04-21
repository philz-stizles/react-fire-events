import { format } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { getUserEvents } from '../../../api/firestoreServices';
import useFirestoreCollection from '../../../api/hooks/useFirestoreCollection';
import { listenToUserEvents } from '../../../redux/actions/profileActions';

const EventsTab = ({profile}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { profileEvents } = useSelector(state => state.profile );
  const { loading } = useSelector(state => state.async );
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => getUserEvents(profile.id, activeTab),
    data: events => dispatch(listenToUserEvents(events)),
    deps: [profile.id, activeTab, dispatch]
  });

  const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
  ];

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Events" />
        </Grid.Column>

        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {
              profileEvents.map(({id, title, category, date}) => (
                <Card as={Link} to={`/events/${id}`} key={id}>
                  <Image src={`/assets/categoryImages/${category}.jpg`} style={{ minHeight: 100, objectFit: 'cover' }} />
                  <Card.Content>
                    <Card.Header content={title} textAlign="center" />
                    <Card.Meta textAlign="center">
                      <div>{format(date, 'dd MMM yyyy')}</div>
                      <div>{format(date, 'hh:mm a')}</div>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              ))
            }
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default EventsTab;
