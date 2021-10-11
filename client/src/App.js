import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/layout';
import { RegisterForm } from "./domains/auth/components/register-form"
import { UserProfile } from "./pages/user-profile";



function App() {
  return (
    <Layout >
      <Switch>
        <Route path='/' exact>
          <UserProfile />
        </Route>
        {/* <Route path='/collections'>
          <CollectionsPage />
        </Route>
        <Route path='/movie/:id'>
          <MoviesDetail />
        </Route> */}
        <Route path='/register'>
          <RegisterForm />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
