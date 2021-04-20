import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import EventsPage from './pages/events/Events';
import CreateEventPage from './pages/events/CreateOrUpdateEvent';
import PeoplePage from './pages/People';
import EventDetailPage from './pages/events/EventDetail';
import ModalManager from './components/modals/ModalManager';
import ProfilePage from './pages/user/Profile';
import AccountPage from './pages/user/Account';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppLoader from './components/AppLoader';
import ErrorPage from './pages/errors/Error';

const App = () => {
  const { initialized } = useSelector(state => state.async);

  if(!initialized) return <AppLoader content="Loading app ..." />

  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={Home} />
      <Route path={'/(.+)'} render={() => (
        <>
          <Navbar />
          <Container className="main">
            <Switch>
              <Route exact path="/events" component={EventsPage} />
              <Route exact path="/events/create" component={CreateEventPage} />
              <Route exact path="/events/create/:id" component={CreateEventPage} />
              <Route exact path="/events/:id" component={EventDetailPage} />
              <Route exact path="/events" component={PeoplePage} />
              <Route exact path="/account" component={AccountPage} />
              <Route exact path="/profile/:id" component={ProfilePage} />
              <Route exact path="/error" component={ErrorPage} />
            </Switch>
          </Container>
          <Footer />
        </>
      )} />
    </>
  );
}

export default App;
