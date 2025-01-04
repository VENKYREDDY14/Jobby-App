import './App.css'

import {Route, Switch} from 'react-router-dom'

import Login from './components/LogIn'

import Home from './components/Home'

import Jobs from './components/Jobs'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import Job from './components/Job'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path='/login' component={Login} />
      <ProtectedRoute exact path='/jobs/:id' component={Job} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/jobs' component={Jobs} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
