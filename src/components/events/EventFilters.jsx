import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const EventFilters = ({ predicate, setPredicate, loading }) => {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item 
          active={predicate.get('filter') === 'all'} 
          onClick={() => setPredicate('filter', 'all')}
          content="All Events" 
          disabled={loading} />

        <Menu.Item 
          active={predicate.get('filter') === 'isGoing'} 
          onClick={() => setPredicate('filter', 'isGoing')}
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
