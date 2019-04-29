const saveSettings = (city, country) => {
	console.log(city, country);
	port.postMessage({
		message: "save", settings: {
			city: city,
			country: country,
		}
	});
};

const toggleModal = () => {
	const modal = document.getElementById("settings");
	const display = modal.style.display;
	modal.style.display = display === "none" ? "block" : "none";
	port.postMessage({message: "settings"});
};
let port;
window.onload = () => {
	const city = document.getElementById("city");
	const country = document.getElementById("country");
	document.getElementById("settings-icon").addEventListener("click", toggleModal);
	document.getElementById("save").addEventListener("click", () => saveSettings(city.value, country.value));
	const time = new Time();
	const date = new DateDisplay();
	const weather = new Weather();
	time.showTime();
	date.showDate();
	setTimeout(() => weather.setWeatherInfo(), 500);
	const timeInterval = setInterval(() => time.showTime(), 1000);
	const dateInterval = setInterval(() => date.showDate(), 1000 * 60);
	port = chrome.runtime.connect(constants.EXTENSION_ID, {name: "settings"});
	port.onMessage.addListener((response) => {
		if (response.message === "settings") {
			city.value = response.data.city;
			country.value = response.data.country;
		} else {
			console.log("Saving successful");
		}
	});
};
