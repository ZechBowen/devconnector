import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';



if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    if(localStorage.token)  store.dispatch(loadUser());
  },[]);

  return (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
      </Routes>
      <section className='container'>
      <Alert />
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profiles' element={<Profiles />} />
          <Route exact path='/profile/:id' element={<Profile />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/create-profile" element={<PrivateRoute component={CreateProfile} />} />
          <Route path="/edit-profile" element={<PrivateRoute component={EditProfile} />} />
          <Route path="/add-experience" element={<PrivateRoute component={AddExperience} />} />
          <Route path="/add-education" element={<PrivateRoute component={AddEducation} />} />
          <Route path="/posts" element={<PrivateRoute component={Posts} />} />
        </Routes>
      </section>
    </Fragment>
  </Router>
  </Provider>

)};

export default App;
