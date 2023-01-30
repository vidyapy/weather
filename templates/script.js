new Vue({
	el: "#app",

	data: {
		infos: {
			city: "",
			country: "",
			temp: null,
			humidity: null,
			state: null
		}
	},

	computed: {
		celsius() {
			return Math.round(this.infos.temp - 273.15);
		},
		fahrenheit() {
			return Math.round((this.infos.temp * 9) / 5 - 459.67);
		},
		today() {
			return moment().format("dddd, MMMM Do YYYY");
		},
		weatherIcon() {
			switch (this.infos.state) {
				case "Sunny":
					return "wb_sunny";
					break;
				case "Clear":
					return "wb_sunny";
					break;
				case "Rain":
					return "umbrella";
					break;
				case "Fog":
					return "stacked_line_chart";
					break;
				case "Clouds":
					return "filter_drama";
					break;
				default:
					return "error";
					break;
			}
		},
		weatherImg() {
			let url = null;
			switch (this.infos.state) {
				case "Clear":
					url =
						"https://media-cdn.tripadvisor.com/media/photo-s/04/b5/0f/ff/alinn-sarigerme-boutique.jpg";
					break;
					case "Sunny":
					url =
						"https://media-cdn.tripadvisor.com/media/photo-s/04/b5/0f/ff/alinn-sarigerme-boutique.jpg";
					break;
				case "Rain":
					url = "umbrella";
					break;
				case "Fog":
					url = "stacked_line_chart";
					break;
				case "Clouds":
					url = "https://i.pinimg.com/736x/44/67/33/4467338524df8802784fbaef4d5c0bb5.jpg";
					break;
				default:
					console.error('cannot find image: state is undefined');
			}
			return "url(" + url + ")";
		}
	},

	created() {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?id=4164138&appid=b6fbf9ea453ed19b776405d908e0eab0"
		)
			.then((response) => response.json())
			.then((data) => {
				this.infos.city = data.name;
				this.infos.country = data.sys.country;
				this.infos.temp = data.main.temp;
				this.infos.humidity = data.main.humidity;
				this.infos.pressure = data.main.pressure;
				this.infos.state = data.weather[0].main;
			});
	}
});
