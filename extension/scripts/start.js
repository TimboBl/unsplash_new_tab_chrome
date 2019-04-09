window.onload = () => {
  const time = new Time();
  const date = new DateDisplay();
  time.showTime();
  date.showDate();
  const timeInterval = setInterval(() => time.showTime(), 1000);
  const dateInterval = setInterval(() => date.showDate(), 1000 * 60);
};
