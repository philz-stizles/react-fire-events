import { useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import EventsPage from './pages/events/Events';
import CreateEventPage from './pages/events/CreateEvent';
import PeoplePage from './pages/People';
import EventDetailPage from './pages/events/EventDetail';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <Navbar openForm={setIsFormOpen} />
        <Container className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/events" render={(props) => <EventsPage {...props} isFormOpen={isFormOpen} closeForm={setIsFormOpen} />} />
            <Route exact path="/events/create" component={CreateEventPage} />
            <Route exact path="/events/:id" component={EventDetailPage} />
            <Route exact path="/events" component={PeoplePage} />
          </Switch>
        </Container>

      <Footer />
    </>
  );
}

export default App;
