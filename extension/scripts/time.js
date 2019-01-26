class Time {
  constructor() {
    this.time = moment();
    this.hourDiv = document.getElementById("hours");
    this.minuteDiv = document.getElementById("minutes");
    this.secondDiv = document.getElementById("seconds");
  }

  getHours() {
    let hours = this.time.hours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    return hours;
  }

  getMinutes() {
    let minutes = this.time.minutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes;
  }

  getSeconds() {
    let seconds = this.time.seconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return seconds;
  }

  showTime() {
    this.hourDiv.innerText = this.getHours();
    this.minuteDiv.innerText = this.getMinutes();
    this.secondDiv.innerText = this.getSeconds();

    this.time = this.time.clone().add(1, "seconds");
  }

}
