window.onload = () => {
  const time = new Time();
  const date = new DateDisplay();
  const weather = new Weather();
  time.showTime();
  date.showDate();
  setTimeout(() => weather.setWeatherInfo(), 500);
  const timeInterval = setInterval(() => time.showTime(), 1000);
  const dateInterval = setInterval(() => date.showDate(), 1000 * 60);
};
