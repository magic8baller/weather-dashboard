import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import './index.css';
import {store} from './store';
import Welcome from './components/Welcome/'
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Route path='/' exact component={Welcome}/>
			</App>
		</Router>
	</Provider>
	, document.getElementById('root'));
