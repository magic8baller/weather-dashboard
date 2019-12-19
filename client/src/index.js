import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import './index.css';
import {store} from './store';
import Welcome from './components/Welcome/'
import Register from './components/Auth/Register.js'
import Login from './components/Auth/Login.js'
// import Logout from './components/Auth/Logout.js'
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Route path='/' exact component={Welcome}/>
				<Route path='/register' component={Register}/>
				<Route path='/login' component={Login}/>
				{/* <Route path='/logout' component={Logout}/> */}
			</App>
		</Router>
	</Provider>
	, document.getElementById('root'));
