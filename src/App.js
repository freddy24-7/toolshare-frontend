import {Switch, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {

      return (
        <Layout>
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={RegisterPage} />
              <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        </Layout>
      );
    }

export default App;

