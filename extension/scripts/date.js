class DateDisplay {
	constructor() {
		this.today = moment();
		this.dateDiv = document.getElementById("date");
	}

	getDate() {
		return this.today.format("DD.MM.YYYY");
	}

	showDate() {
		this.dateDiv.innerHTML = this.getDate();
	}
}
