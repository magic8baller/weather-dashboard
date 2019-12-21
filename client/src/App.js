import React from 'react';

import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/Main'
import './index.css';
import {store} from './store';
import Welcome from './components/Welcome/'
import Dashboard from './components/Dashboard'
import jwt_decode from 'jwt-decode';
import {setAuthToken} from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './store/actions/auth.actions';
import Register from './components/Auth/Register.js'
import Login from './components/Auth/Login.js'
import PrivateRoute from './components/common/PrivateRoute';
// import Logout from './components/Auth/Logout.js'

if (localStorage.token) {
	// Set auth token header auth
	setAuthToken(localStorage.token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = '/login';
	}
}

const App = () => (

	<Provider store={store}>
		<Router>
			<Main>
				<div className="container">

					<Route path='/' exact component={Welcome} />
					<Route path='/register' component={Register} />
					<Route path='/login' component={Login} />
					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						{/* <PrivateRoute path="/addTodo" exact component={AddTodo} />
						<PrivateRoute path="/editTodo/:id" exact component={EditTodo} /> */}
					</Switch>
					{/* <Route path='/logout' component={Logout}/> */}
				</div>
			</Main>
		</Router>
	</Provider>
	)
export default App