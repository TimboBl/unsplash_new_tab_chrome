class Time {
  constructor() {
    this.time = moment();
    this.hourDiv = document.getElementById("hours");
    this.minuteDiv = document.getElementById("minutes");
    this.secondDiv = document.getElementById("seconds");
  }

  getHours() {
    return this.time.format("HH");
  }

  getMinutes() {
    return this.time.format("mm");
  }

  getSeconds() {
    return this.time.format("ss");
  }

  showTime() {
    this.hourDiv.innerText = this.getHours();
    this.minuteDiv.innerText = this.getMinutes();
    this.secondDiv.innerText = this.getSeconds();

    this.time = this.time.clone().add(1, "seconds");
  }

}
