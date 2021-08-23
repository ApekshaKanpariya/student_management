import { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Table from './components/Table/Table';
import StudentFromPage from './pages/StudentFromPage';
import HomePage from './pages/HomePage';
import Context from './store/context';

function App() {
  const ctx = useContext(Context);

  return (
    <Layout>
      <Switch>
        {!ctx.isLoggedIn && (
          <Route path='/' exact>
            <HomePage />
          </Route>
        )}
        <Route path='/form'>
          {ctx.isLoggedIn && (
          <StudentFromPage />
          )}
          {!ctx.isLoggedIn && (
            <Redirect to='/' />
          )}
        </Route>
        <Route path='/table'>
          {ctx.isLoggedIn && (
            <Table />
          )}
          {!ctx.isLoggedIn &&(
            <Redirect to='/' />
          )}
        </Route>
        <Route path='*'>
            <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
