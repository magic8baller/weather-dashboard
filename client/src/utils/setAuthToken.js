import axios from 'axios';

export const setAuthToken = token => {
	if (token) {
		// Apply to every request
		localStorage.token = token
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete localStorage.token
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

// export default setAuthToken;