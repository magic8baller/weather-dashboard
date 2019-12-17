export const getGreeting = () => {
	const currentHour = (new Date()).getHours();
	switch (true) {
		case (currentHour >= 0 && currentHour < 12):
			return 'Good morning';
		case (currentHour >= 12 && currentHour < 18):
			return 'Good afternoon';
		case (currentHour >= 18 && currentHour <= 23):
			return 'Good evening';
		default:
			return 'Hello';
	}

}