<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
    </div>

    <div class="search-bar">
      <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>

    <main v-if="weatherData" class="weather-display">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div class="weather-info">
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span class="weather-desc">{{ weatherData.weather[0].description }}</span>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
const apikey = '92b08480208f43109579d38e966f1a22'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
      if (!this.city) return
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
      await this.fetchWeatherData(url)
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
  },
}
</script>

<style scoped>
body,
html,
#app {
  height: 100%;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #74b9ff, #ffffff);
  text-align: center;
  color: #fff;
}

.header h1 {
  margin-bottom: 15px;
  font-size: 2em;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px; /* 从 40px 改为 15px */
}

.search-input {
  padding: 8px;
  width: 200px;
  border-radius: 4px;
  border: none;
  outline: none;
}

.search-button {
  padding: 8px 16px;
  background-color: #0984e3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #74b9ff;
}

.weather-display {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(5px);
}

.weather-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.weather-info img {
  width: 70px;
  height: 70px;
}

.weather-desc {
  display: block;
  margin-top: 8px;
  font-style: italic;
}
</style>
