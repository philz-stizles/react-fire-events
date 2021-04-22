import React, { useState } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import UnAuthenticatedModal from '../modals/UnAuthenticatedModal';

const EventFilters = ({ predicate, setPredicate, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <>
    {(isModalOpen) && <UnAuthenticatedModal setIsModalOpen={setIsModalOpen} />}
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item 
          active={predicate.get('filter') === 'all'} 
          onClick={() => setPredicate('filter', 'all')}
          content="All Events" 
          disabled={loading} />

        <Menu.Item 
          active={predicate.get('filter') === 'isGoing'} 
          onClick={() => (isAuthenticated) ? setPredicate('filter', 'all') : setIsModalOpen(true)}
          content="I'm going" 
          disabled={loading} />

        <Menu.Item 
          active={predicate.get('filter') === 'isHosting'} 
          onClick={() => setPredicate('filter', 'isHosting')}
          content="I'm hosting" 
          disabled={loading}/>
      </Menu>

      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar 
        onChange={(date) => setPredicate('startDate', date)} 
        value={predicate.get('startDate') || new Date()} 
        tileDisabled={() => loading}/>
    </>
  )
}

export default EventFilters
